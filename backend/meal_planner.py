"""
Core meal planner logic using OpenFoodFacts API.
Provides food search, nutrition lookup, and ML-based meal suggestions.
"""

import requests
from typing import List, Dict, Optional, Any
import random
import math
import time


OPENFOODFACTS_API = "https://world.openfoodfacts.org/cgi/search.pl"
OPENFOODFACTS_PRODUCT = "https://world.openfoodfacts.org/api/v0/product/{barcode}.json"

# Sample fallback data for when API is unavailable
SAMPLE_FOODS = [
    {"name": "Chicken Breast", "brand": "Generic", "calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "category": "protein"},
    {"name": "Brown Rice", "brand": "Generic", "calories": 112, "protein": 2.6, "carbs": 24, "fat": 0.9, "category": "grain"},
    {"name": "Broccoli", "brand": "Generic", "calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4, "category": "vegetable"},
    {"name": "Salmon", "brand": "Generic", "calories": 208, "protein": 20, "carbs": 0, "fat": 13, "category": "protein"},
    {"name": "Eggs", "brand": "Generic", "calories": 155, "protein": 13, "carbs": 1.1, "fat": 11, "category": "protein"},
    {"name": "Oatmeal", "brand": "Generic", "calories": 68, "protein": 2.4, "carbs": 12, "fat": 1.4, "category": "grain"},
    {"name": "Greek Yogurt", "brand": "Generic", "calories": 100, "protein": 17, "carbs": 6, "fat": 0.7, "category": "dairy"},
    {"name": "Sweet Potato", "brand": "Generic", "calories": 86, "protein": 1.6, "carbs": 20, "fat": 0.1, "category": "vegetable"},
    {"name": "Almonds", "brand": "Generic", "calories": 164, "protein": 6, "carbs": 6, "fat": 14, "category": "snack"},
    {"name": "Banana", "brand": "Generic", "calories": 89, "protein": 1.1, "carbs": 23, "fat": 0.3, "category": "fruit"},
    {"name": "Avocado", "brand": "Generic", "calories": 160, "protein": 2, "carbs": 9, "fat": 15, "category": "fruit"},
    {"name": "Tuna", "brand": "Generic", "calories": 132, "protein": 28, "carbs": 0, "fat": 1, "category": "protein"},
    {"name": "Quinoa", "brand": "Generic", "calories": 120, "protein": 4.4, "carbs": 21, "fat": 1.9, "category": "grain"},
    {"name": "Spinach", "brand": "Generic", "calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4, "category": "vegetable"},
    {"name": "Cottage Cheese", "brand": "Generic", "calories": 98, "protein": 11, "carbs": 3.4, "fat": 4.3, "category": "dairy"},
    {"name": "Turkey Breast", "brand": "Generic", "calories": 135, "protein": 30, "carbs": 0, "fat": 1, "category": "protein"},
    {"name": "Whole Wheat Bread", "brand": "Generic", "calories": 247, "protein": 13, "carbs": 41, "fat": 4.2, "category": "grain"},
    {"name": "Peanut Butter", "brand": "Generic", "calories": 188, "protein": 8, "carbs": 6, "fat": 16, "category": "snack"},
    {"name": "Milk (2%)", "brand": "Generic", "calories": 50, "protein": 3.4, "carbs": 5, "fat": 2, "category": "dairy"},
    {"name": "Apple", "brand": "Generic", "calories": 52, "protein": 0.3, "carbs": 14, "fat": 0.2, "category": "fruit"},
]


class MealPlanner:
    """Handles meal planning operations with OpenFoodFacts API."""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "JackedApp/1.0 (Fitness Nutrition App; https://jacked.app)"
        })
        self._api_available = True
        self._last_api_check = 0
        self._api_check_interval = 60  # Check API availability every 60 seconds
    
    def _check_api_availability(self) -> bool:
        """Check if OpenFoodFacts API is available."""
        current_time = time.time()
        if current_time - self._last_api_check < self._api_check_interval:
            return self._api_available
        self._last_api_check = current_time
        
        try:
            test_response = self.session.get(
                OPENFOODFACTS_API,
                params={"search_terms": "test", "search_simple": 1, "action": "process", "json": 1, "page_size": 1},
                timeout=5
            )
            self._api_available = test_response.status_code == 200
        except:
            self._api_available = False
        
        return self._api_available
    
    def _search_with_retry(self, params: Dict, max_retries: int = 2) -> Optional[Dict]:
        """Try to search with retries on failure."""
        for attempt in range(max_retries):
            try:
                response = self.session.get(OPENFOODFACTS_API, params=params, timeout=15)
                if response.status_code == 200:
                    return response.json()
                elif response.status_code == 503:
                    # API temporarily unavailable, wait and retry
                    time.sleep(1 * (attempt + 1))
                    continue
            except requests.RequestException:
                if attempt < max_retries - 1:
                    time.sleep(0.5 * (attempt + 1))
                    continue
        return None
    
    def _get_fallback_foods(self, query: str, page_size: int = 20) -> List[Dict[str, Any]]:
        """Get fallback sample foods when API is unavailable."""
        query_lower = query.lower()
        
        # Filter sample foods that match the query
        matching_foods = [
            f for f in SAMPLE_FOODS
            if query_lower in f["name"].lower() or query_lower in f["category"].lower()
        ]
        
        # If no matches, return random selection
        if not matching_foods:
            matching_foods = random.sample(SAMPLE_FOODS, min(page_size, len(SAMPLE_FOODS)))
        
        # Convert to normalized format
        return [
            {
                "barcode": f"sample_{i}",
                "name": f["name"],
                "brand": f["brand"],
                "nutrition_grade": "A",
                "image_url": "",
                "serving_size": "100g",
                "categories": [f["category"]],
                "nutrition": {
                    "calories": f["calories"],
                    "protein": f["protein"],
                    "carbs": f["carbs"],
                    "fat": f["fat"],
                    "fiber": 2.0,
                    "sugar": 3.0,
                    "sodium": 50.0,
                },
                "_is_fallback": True
            }
            for i, f in enumerate(matching_foods[:page_size])
        ]
    
    def search_foods(self, query: str, page_size: int = 20, page: int = 1) -> List[Dict[str, Any]]:
        """
        Search for foods in OpenFoodFacts database.
        
        Args:
            query: Search term (e.g., "chicken breast", "rice")
            page_size: Number of results per page (max 200)
            page: Page number for pagination
            
        Returns:
            List of food products with nutrition info
        """
        params = {
            "search_terms": query,
            "search_simple": 1,
            "action": "process",
            "json": 1,
            "page_size": min(page_size, 200),
            "page": page,
            "fields": "code,product_name,brands,nutriments,nutrition_grades,image_url,serving_size,categories_tags"
        }
        
        try:
            # Try API with retry logic
            data = self._search_with_retry(params)
            
            if data is not None:
                products = data.get("products", [])
                results = [self._normalize_product(p) for p in products if p.get("product_name")]
                if results:
                    return results
            
            # Fallback to sample data if API fails or returns no results
            return self._get_fallback_foods(query, page_size)
            
        except requests.RequestException as e:
            # Return fallback data on any request exception
            return self._get_fallback_foods(query, page_size)
    
    def get_product_by_barcode(self, barcode: str) -> Optional[Dict[str, Any]]:
        """
        Get detailed product info by barcode.
        
        Args:
            barcode: Product barcode (EAN code)
            
        Returns:
            Product details or None if not found
        """
        url = OPENFOODFACTS_PRODUCT.format(barcode=barcode)
        
        try:
            response = self.session.get(url, timeout=10)
            if response.status_code == 404:
                return None
            if response.status_code != 200:
                return None
            data = response.json()
            
            if data.get("status") == 1:
                return self._normalize_product(data.get("product", {}))
            return None
            
        except requests.RequestException:
            return None
    
    def _normalize_product(self, product: Dict) -> Dict[str, Any]:
        """Normalize product data to consistent format."""
        nutriments = product.get("nutriments", {})
        
        return {
            "barcode": product.get("code", ""),
            "name": product.get("product_name", "Unknown Product"),
            "brand": product.get("brands", ""),
            "nutrition_grade": product.get("nutrition_grades", "unknown").upper(),
            "image_url": product.get("image_url", ""),
            "serving_size": product.get("serving_size", "100g"),
            "categories": product.get("categories_tags", []),
            "nutrition": {
                "calories": self._safe_float(nutriments.get("energy-kcal_100g", nutriments.get("energy-kcal"))),
                "protein": self._safe_float(nutriments.get("proteins_100g", nutriments.get("proteins"))),
                "carbs": self._safe_float(nutriments.get("carbohydrates_100g", nutriments.get("carbohydrates"))),
                "fat": self._safe_float(nutriments.get("fat_100g", nutriments.get("fat"))),
                "fiber": self._safe_float(nutriments.get("fiber_100g", nutriments.get("fiber"))),
                "sugar": self._safe_float(nutriments.get("sugars_100g", nutriments.get("sugars"))),
                "sodium": self._safe_float(nutriments.get("sodium_100g", nutriments.get("sodium"))),
            }
        }
    
    def _safe_float(self, value: Any) -> float:
        """Safely convert value to float."""
        if value is None:
            return 0.0
        try:
            return float(value)
        except (ValueError, TypeError):
            return 0.0
    
    def generate_meal_plan(
        self,
        daily_calories: int,
        protein_goal: int,
        carbs_goal: int,
        fat_goal: int,
        num_meals: int = 4,
        dietary_preferences: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Generate a daily meal plan based on nutritional goals.
        Uses ML-like heuristics to balance macros across meals.
        
        Args:
            daily_calories: Target daily calories
            protein_goal: Target protein in grams
            carbs_goal: Target carbs in grams
            fat_goal: Target fat in grams
            num_meals: Number of meals (default 4)
            dietary_preferences: List of preferences (e.g., ["high-protein", "low-carb"])
            
        Returns:
            Complete meal plan with foods and nutrition breakdown
        """
        preferences = dietary_preferences or []
        
        # Calculate calories per meal
        calories_per_meal = daily_calories // num_meals
        
        # Adjust macro distribution based on preferences
        if "high-protein" in preferences:
            protein_ratio = 0.40
            carbs_ratio = 0.35
            fat_ratio = 0.25
        elif "low-carb" in preferences:
            protein_ratio = 0.35
            carbs_ratio = 0.20
            fat_ratio = 0.45
        elif "keto" in preferences:
            protein_ratio = 0.30
            carbs_ratio = 0.05
            fat_ratio = 0.65
        else:
            protein_ratio = 0.30
            carbs_ratio = 0.40
            fat_ratio = 0.30
        
        meals = []
        total_protein = 0
        total_carbs = 0
        total_fat = 0
        total_calories = 0
        
        # Meal templates with typical food categories
        meal_templates = [
            {"name": "Breakfast", "keywords": ["cereal", "oatmeal", "bread", "egg", "yogurt", "milk"]},
            {"name": "Morning Snack", "keywords": ["fruit", "nut", "yogurt", "cheese"]},
            {"name": "Lunch", "keywords": ["chicken", "rice", "pasta", "salad", "sandwich", "beef", "fish"]},
            {"name": "Afternoon Snack", "keywords": ["protein bar", "nut", "fruit", "yogurt"]},
            {"name": "Dinner", "keywords": ["chicken", "fish", "beef", "vegetable", "rice", "potato"]},
            {"name": "Post-Workout", "keywords": ["protein", "banana", "rice", "whey"]},
        ]
        
        for i in range(num_meals):
            template = meal_templates[i] if i < len(meal_templates) else meal_templates[-1]
            
            # Search for foods matching meal type
            search_term = random.choice(template["keywords"])
            foods = self.search_foods(search_term, page_size=10)
            
            if not foods:
                # Fallback to generic search
                foods = self.search_foods("protein food", page_size=10)
            
            # Select foods that best match macro goals
            selected_foods = self._select_foods_for_meal(
                foods,
                calories_per_meal,
                protein_goal / num_meals,
                carbs_goal / num_meals,
                fat_goal / num_meals
            )
            
            meal_protein = sum(f["nutrition"]["protein"] for f in selected_foods)
            meal_carbs = sum(f["nutrition"]["carbs"] for f in selected_foods)
            meal_fat = sum(f["nutrition"]["fat"] for f in selected_foods)
            meal_calories = sum(f["nutrition"]["calories"] for f in selected_foods)
            
            meals.append({
                "meal_number": i + 1,
                "meal_name": template["name"],
                "foods": selected_foods,
                "nutrition": {
                    "calories": round(meal_calories, 1),
                    "protein": round(meal_protein, 1),
                    "carbs": round(meal_carbs, 1),
                    "fat": round(meal_fat, 1)
                }
            })
            
            total_protein += meal_protein
            total_carbs += meal_carbs
            total_fat += meal_fat
            total_calories += meal_calories
        
        return {
            "meals": meals,
            "total_nutrition": {
                "calories": round(total_calories, 1),
                "protein": round(total_protein, 1),
                "carbs": round(total_carbs, 1),
                "fat": round(total_fat, 1)
            },
            "goals": {
                "calories": daily_calories,
                "protein": protein_goal,
                "carbs": carbs_goal,
                "fat": fat_goal
            },
            "preferences": preferences
        }
    
    def _select_foods_for_meal(
        self,
        foods: List[Dict],
        target_calories: float,
        target_protein: float,
        target_carbs: float,
        target_fat: float
    ) -> List[Dict]:
        """Select and combine foods to match macro targets."""
        if not foods:
            return []
        
        selected = []
        current_calories = 0
        current_protein = 0
        current_carbs = 0
        current_fat = 0
        
        # Sort by protein density for better muscle-building potential
        sorted_foods = sorted(foods, key=lambda x: x["nutrition"]["protein"], reverse=True)
        
        for food in sorted_foods[:5]:  # Consider top 5 protein sources
            food_cal = food["nutrition"]["calories"]
            
            # Don't exceed calorie target by more than 50%
            if current_calories + food_cal <= target_calories * 1.5:
                selected.append(food)
                current_calories += food_cal
                current_protein += food["nutrition"]["protein"]
                current_carbs += food["nutrition"]["carbs"]
                current_fat += food["nutrition"]["fat"]
        
        # If no foods selected, take the first one
        if not selected and foods:
            selected.append(foods[0])
        
        return selected
    
    def calculate_daily_needs(
        self,
        weight_kg: float,
        height_cm: float,
        age: int,
        gender: str,
        activity_level: str,
        goal: str = "maintain"
    ) -> Dict[str, int]:
        """
        Calculate daily nutritional needs using Mifflin-St Jeor equation.
        
        Args:
            weight_kg: Body weight in kg
            height_cm: Height in cm
            age: Age in years
            gender: "male" or "female"
            activity_level: "sedentary", "light", "moderate", "active", "very_active"
            goal: "lose", "maintain", or "gain"
            
        Returns:
            Dictionary with daily calories and macros
        """
        # Calculate BMR using Mifflin-St Jeor
        if gender.lower() == "male":
            bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5
        else:
            bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161
        
        # Activity multipliers
        activity_multipliers = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725,
            "very_active": 1.9
        }
        
        tdee = bmr * activity_multipliers.get(activity_level.lower(), 1.55)
        
        # Adjust for goal
        if goal == "lose":
            tdee *= 0.8  # 20% deficit
        elif goal == "gain":
            tdee *= 1.15  # 15% surplus
        
        # Calculate macros
        protein = int(weight_kg * 2.2)  # 2.2g per kg bodyweight
        fat = int((tdee * 0.25) / 9)  # 25% of calories from fat
        protein_calories = protein * 4
        fat_calories = fat * 9
        carbs = int((tdee - protein_calories - fat_calories) / 4)
        
        return {
            "calories": int(tdee),
            "protein": protein,
            "carbs": carbs,
            "fat": fat
        }


# Singleton instance
meal_planner = MealPlanner()