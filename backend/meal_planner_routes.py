"""
Flask routes for meal planning API endpoints.
"""

from flask import Blueprint, request, jsonify
from bson import ObjectId
from datetime import datetime
from meal_planner import meal_planner


meal_bp = Blueprint("meal", __name__, url_prefix="/api/meal")

# MongoDB collections (imported from app.py context)
# These will be set when the blueprint is registered
_meal_plans_collection = None
_user_collection = None


def init_meal_routes(meal_plans_collection, user_collection):
    """Initialize route dependencies after app setup."""
    global _meal_plans_collection, _user_collection
    _meal_plans_collection = meal_plans_collection
    _user_collection = user_collection


# ============================================
# Food Search Endpoints

@meal_bp.route("/search", methods=["GET"])
def search_foods():
    """
    Search for foods in OpenFoodFacts database.
    
    Query params:
        q: Search query (required)
        page_size: Results per page (default 20, max 200)
        page: Page number (default 1)
    """
    query = request.args.get("q", "").strip()
    if not query:
        return jsonify({"error": "Search query 'q' is required"}), 400
    
    try:
        page_size = min(int(request.args.get("page_size", 20)), 200)
        page = max(int(request.args.get("page", 1)), 1)
    except ValueError:
        return jsonify({"error": "Invalid pagination parameters"}), 400
    
    try:
        foods = meal_planner.search_foods(query, page_size=page_size, page=page)
        return jsonify({
            "results": foods,
            "count": len(foods),
            "query": query,
            "page": page,
            "page_size": page_size
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@meal_bp.route("/product/<barcode>", methods=["GET"])
def get_product(barcode: str):
    """Get detailed product info by barcode."""
    try:
        product = meal_planner.get_product_by_barcode(barcode)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        return jsonify(product)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================
# Meal Plan Generation

@meal_bp.route("/generate", methods=["POST"])
def generate_meal_plan():
    """
    Generate a personalized meal plan.
    
    Request body:
        daily_calories: Target daily calories (required)
        protein_goal: Protein in grams (required)
        carbs_goal: Carbs in grams (required)
        fat_goal: Fat in grams (required)
        num_meals: Number of meals (optional, default 4)
        dietary_preferences: List of preferences (optional)
        save: Boolean to save plan to database (optional, default false)
    """
    data = request.get_json() or {}
    
    # Validate required fields
    required = ["daily_calories", "protein_goal", "carbs_goal", "fat_goal"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    try:
        meal_plan = meal_planner.generate_meal_plan(
            daily_calories=int(data["daily_calories"]),
            protein_goal=int(data["protein_goal"]),
            carbs_goal=int(data["carbs_goal"]),
            fat_goal=int(data["fat_goal"]),
            num_meals=int(data.get("num_meals", 4)),
            dietary_preferences=data.get("dietary_preferences", [])
        )
        
        # Optionally save to database
        if data.get("save", False):
            user_id = _get_user_id_from_token()
            if user_id and _meal_plans_collection:
                _meal_plans_collection.insert_one({
                    "user_id": user_id,
                    "plan": meal_plan,
                    "created_at": datetime.utcnow(),
                    "goals": {
                        "calories": data["daily_calories"],
                        "protein": data["protein_goal"],
                        "carbs": data["carbs_goal"],
                        "fat": data["fat_goal"]
                    }
                })
                meal_plan["saved"] = True
        
        return jsonify(meal_plan)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@meal_bp.route("/calculate-needs", methods=["POST"])
def calculate_needs():
    """
    Calculate daily nutritional needs.
    
    Request body:
        weight_kg: Body weight in kg (required)
        height_cm: Height in cm (required)
        age: Age in years (required)
        gender: "male" or "female" (required)
        activity_level: Activity level (required)
        goal: "lose", "maintain", or "gain" (optional, default "maintain")
    """
    data = request.get_json() or {}
    
    required = ["weight_kg", "height_cm", "age", "gender", "activity_level"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    try:
        needs = meal_planner.calculate_daily_needs(
            weight_kg=float(data["weight_kg"]),
            height_cm=float(data["height_cm"]),
            age=int(data["age"]),
            gender=data["gender"],
            activity_level=data["activity_level"],
            goal=data.get("goal", "maintain")
        )
        return jsonify(needs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================
# Saved Meal Plans (User-specific)

@meal_bp.route("/plans", methods=["GET"])
def get_saved_plans():
    """Get all saved meal plans for the current user."""
    user_id = _get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401
    
    if not _meal_plans_collection:
        return jsonify({"error": "Database not available"}), 503
    
    try:
        plans = list(_meal_plans_collection.find(
            {"user_id": user_id},
            {"_id": 0, "user_id": 0}
        ).sort("created_at", -1).limit(10))
        
        # Convert datetime to string for JSON serialization
        for plan in plans:
            if "created_at" in plan:
                plan["created_at"] = plan["created_at"].isoformat()
        
        return jsonify({"plans": plans})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@meal_bp.route("/plans/<plan_id>", methods=["GET"])
def get_saved_plan(plan_id: str):
    """Get a specific saved meal plan."""
    user_id = _get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401
    
    if not _meal_plans_collection:
        return jsonify({"error": "Database not available"}), 503
    
    try:
        plan = _meal_plans_collection.find_one({
            "_id": ObjectId(plan_id),
            "user_id": user_id
        }, {"_id": 0, "user_id": 0})
        
        if not plan:
            return jsonify({"error": "Plan not found"}), 404
        
        if "created_at" in plan:
            plan["created_at"] = plan["created_at"].isoformat()
        
        return jsonify(plan)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@meal_bp.route("/plans/<plan_id>", methods=["DELETE"])
def delete_saved_plan(plan_id: str):
    """Delete a saved meal plan."""
    user_id = _get_user_id_from_token()
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401
    
    if not _meal_plans_collection:
        return jsonify({"error": "Database not available"}), 503
    
    try:
        result = _meal_plans_collection.delete_one({
            "_id": ObjectId(plan_id),
            "user_id": user_id
        })
        
        if result.deleted_count == 0:
            return jsonify({"error": "Plan not found"}), 404
        
        return jsonify({"message": "Plan deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================
# Helper Functions

def _get_user_id_from_token():
    """Extract user ID from JWT token in Authorization header."""
    from flask import request
    import jwt
    
    try:
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return None
        
        token = auth_header.split(" ")[1]
        from auth import JWT_SECRET, JWT_ALGORITHM
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get("sub")
    except Exception:
        return None