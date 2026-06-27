import React, { useState, useEffect } from 'react';
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNavigationBar from '../../components/NavBar/SecondNavigationBar';
import { searchFoods, generateMealPlan, calculateDailyNeeds, getSavedPlans } from '../../services/api';
import './MealPlanner.css';

const MealPlanner = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // Form state for meal plan generation
  const [formData, setFormData] = useState({
    daily_calories: 2000,
    protein_goal: 150,
    carbs_goal: 200,
    fat_goal: 65,
    num_meals: 4,
    dietary_preferences: []
  });
  
  // User profile for needs calculation
  const [userProfile, setUserProfile] = useState({
    weight_kg: 70,
    height_cm: 175,
    age: 25,
    gender: 'male',
    activity_level: 'moderate',
    goal: 'maintain'
  });
  
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSavedPlans();
  }, []);

  const loadSavedPlans = async () => {
    try {
      const plans = await getSavedPlans(token);
      setSavedPlans(plans.plans || []);
    } catch (err) {
      console.error('Failed to load saved plans:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError('');
    try {
      const results = await searchFoods(searchQuery, 20, 1, token);
      setSearchResults(results.results || []);
    } catch (err) {
      setError('Failed to search foods. Please try again.');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setSuccess('');
    
    try {
      const plan = await generateMealPlan({
        ...formData,
        save: false
      }, token);
      setGeneratedPlan(plan);
      setSuccess('Meal plan generated successfully!');
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePlan = async () => {
    if (!generatedPlan) return;
    
    try {
      await generateMealPlan({
        ...formData,
        save: true
      }, token);
      setSuccess('Meal plan saved successfully!');
      loadSavedPlans();
    } catch (err) {
      setError('Failed to save plan. Please try again.');
      console.error(err);
    }
  };

  const handleCalculateNeeds = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const needs = await calculateDailyNeeds(userProfile, token);
      setFormData(prev => ({
        ...prev,
        daily_calories: needs.calories,
        protein_goal: needs.protein,
        carbs_goal: needs.carbs,
        fat_goal: needs.fat
      }));
      setSuccess('Daily needs calculated! Review your goals below.');
    } catch (err) {
      setError('Failed to calculate needs. Please check your inputs.');
      console.error(err);
    }
  };

  const handlePreferenceToggle = (pref) => {
    setFormData(prev => ({
      ...prev,
      dietary_preferences: prev.dietary_preferences.includes(pref)
        ? prev.dietary_preferences.filter(p => p !== pref)
        : [...prev.dietary_preferences, pref]
    }));
  };

  const renderNutritionBadge = (grade) => {
    const colors = {
      'A': '#00B041',
      'B': '#85BB2F',
      'C': '#F4D03F',
      'D': '#EE9B00',
      'E': '#EE4D2A'
    };
    return (
      <span 
        className="nutrition-badge" 
        style={{ backgroundColor: colors[grade] || '#ccc' }}
      >
        {grade}
      </span>
    );
  };

  return (
    <>
      <MainNavigationBar />
      <SecondNavigationBar />
      <div className="meal-planner">
        <h1>Meal Planner</h1>
      
      {/* Tab Navigation */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Plan
        </button>
        <button 
          className={`tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Foods
        </button>
        <button 
          className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Plans
        </button>
      </div>

      {/* Messages */}
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {/* Generate Plan Tab */}
      {activeTab === 'generate' && (
        <div className="tab-content">
          {/* Calculator Section */}
          <div className="calculator-section">
            <h2>Calculate Your Daily Needs</h2>
            <form onSubmit={handleCalculateNeeds} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    value={userProfile.weight_kg}
                    onChange={e => setUserProfile({...userProfile, weight_kg: parseFloat(e.target.value)})}
                    min="30"
                    max="300"
                  />
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    value={userProfile.height_cm}
                    onChange={e => setUserProfile({...userProfile, height_cm: parseFloat(e.target.value)})}
                    min="100"
                    max="250"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={e => setUserProfile({...userProfile, age: parseInt(e.target.value)})}
                    min="13"
                    max="100"
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={userProfile.gender}
                    onChange={e => setUserProfile({...userProfile, gender: e.target.value})}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Activity Level</label>
                  <select
                    value={userProfile.activity_level}
                    onChange={e => setUserProfile({...userProfile, activity_level: e.target.value})}
                  >
                    <option value="sedentary">Sedentary (little exercise)</option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="very_active">Very Active (intense daily)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Goal</label>
                  <select
                    value={userProfile.goal}
                    onChange={e => setUserProfile({...userProfile, goal: e.target.value})}
                  >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Muscle</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-secondary">Calculate Needs</button>
            </form>
          </div>

          {/* Goals Section */}
          <div className="goals-section">
            <h2>Your Nutrition Goals</h2>
            <form onSubmit={handleGeneratePlan}>
              <div className="goals-grid">
                <div className="goal-item">
                  <label>Daily Calories</label>
                  <input
                    type="number"
                    value={formData.daily_calories}
                    onChange={e => setFormData({...formData, daily_calories: parseInt(e.target.value)})}
                    min="1000"
                    max="10000"
                  />
                </div>
                <div className="goal-item">
                  <label>Protein (g)</label>
                  <input
                    type="number"
                    value={formData.protein_goal}
                    onChange={e => setFormData({...formData, protein_goal: parseInt(e.target.value)})}
                    min="20"
                    max="500"
                  />
                </div>
                <div className="goal-item">
                  <label>Carbs (g)</label>
                  <input
                    type="number"
                    value={formData.carbs_goal}
                    onChange={e => setFormData({...formData, carbs_goal: parseInt(e.target.value)})}
                    min="20"
                    max="1000"
                  />
                </div>
                <div className="goal-item">
                  <label>Fat (g)</label>
                  <input
                    type="number"
                    value={formData.fat_goal}
                    onChange={e => setFormData({...formData, fat_goal: parseInt(e.target.value)})}
                    min="10"
                    max="300"
                  />
                </div>
              </div>

              <div className="preferences-section">
                <h3>Dietary Preferences</h3>
                <div className="preference-chips">
                  {['high-protein', 'low-carb', 'keto'].map(pref => (
                    <button
                      key={pref}
                      type="button"
                      className={`chip ${formData.dietary_preferences.includes(pref) ? 'active' : ''}`}
                      onClick={() => handlePreferenceToggle(pref)}
                    >
                      {pref.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="meals-count">
                <label>Number of Meals</label>
                <div className="meals-buttons">
                  {[3, 4, 5, 6].map(num => (
                    <button
                      key={num}
                      type="button"
                      className={`meal-btn ${formData.num_meals === num ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, num_meals: num})}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Meal Plan'}
              </button>
            </form>
          </div>

          {/* Generated Plan Display */}
          {generatedPlan && (
            <div className="generated-plan">
              <div className="plan-header">
                <h2>Your Meal Plan</h2>
                <button onClick={handleSavePlan} className="btn-save">
                  Save Plan
                </button>
              </div>
              
              <div className="plan-summary">
                <div className="summary-item">
                  <span className="label">Total Calories</span>
                  <span className="value">{generatedPlan.total_nutrition.calories} kcal</span>
                </div>
                <div className="summary-item">
                  <span className="label">Protein</span>
                  <span className="value">{generatedPlan.total_nutrition.protein}g</span>
                </div>
                <div className="summary-item">
                  <span className="label">Carbs</span>
                  <span className="value">{generatedPlan.total_nutrition.carbs}g</span>
                </div>
                <div className="summary-item">
                  <span className="label">Fat</span>
                  <span className="value">{generatedPlan.total_nutrition.fat}g</span>
                </div>
              </div>

              <div className="meals-list">
                {generatedPlan.meals.map(meal => (
                  <div key={meal.meal_number} className="meal-card">
                    <div className="meal-header">
                      <h3>{meal.meal_name}</h3>
                      <span className="meal-calories">{meal.nutrition.calories} kcal</span>
                    </div>
                    <div className="meal-macros">
                      <span>P: {meal.nutrition.protein}g</span>
                      <span>C: {meal.nutrition.carbs}g</span>
                      <span>F: {meal.nutrition.fat}g</span>
                    </div>
                    <ul className="food-list">
                      {meal.foods.map((food, idx) => (
                        <li key={idx} className="food-item">
                          <div className="food-info">
                            <span className="food-name">{food.name}</span>
                            {food.brand && <span className="food-brand">{food.brand}</span>}
                          </div>
                          {food.nutrition_grade && renderNutritionBadge(food.nutrition_grade)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Foods Tab */}
      {activeTab === 'search' && (
        <div className="tab-content">
          <h2>Search OpenFoodFacts Database</h2>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search for foods (e.g., chicken breast, rice, apples)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button type="submit" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {searchResults.length > 0 && (
            <div className="search-results">
              <p className="results-count">{searchResults.length} results found</p>
              <div className="results-grid">
                {searchResults.map((food, idx) => (
                  <div key={idx} className="food-card">
                    <div className="food-header">
                      <h4>{food.name}</h4>
                      {food.nutrition_grade && renderNutritionBadge(food.nutrition_grade)}
                    </div>
                    {food.brand && <p className="food-brand">{food.brand}</p>}
                    <div className="food-nutrition">
                      <div className="nutrition-row">
                        <span>Calories:</span>
                        <strong>{food.nutrition.calories} kcal</strong>
                      </div>
                      <div className="nutrition-row">
                        <span>Protein:</span>
                        <strong>{food.nutrition.protein}g</strong>
                      </div>
                      <div className="nutrition-row">
                        <span>Carbs:</span>
                        <strong>{food.nutrition.carbs}g</strong>
                      </div>
                      <div className="nutrition-row">
                        <span>Fat:</span>
                        <strong>{food.nutrition.fat}g</strong>
                      </div>
                    </div>
                    {food.image_url && (
                      <img 
                        src={food.image_url} 
                        alt={food.name}
                        className="food-image"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.length === 0 && searchQuery && !isSearching && (
            <p className="no-results">No foods found. Try a different search term.</p>
          )}
        </div>
      )}

      {/* Saved Plans Tab */}
      {activeTab === 'saved' && (
        <div className="tab-content">
          <h2>Saved Meal Plans</h2>
          {savedPlans.length > 0 ? (
            <div className="saved-plans-list">
              {savedPlans.map((plan, idx) => (
                <div key={idx} className="saved-plan-card">
                  <div className="plan-date">
                    {new Date(plan.created_at).toLocaleDateString()}
                  </div>
                  <div className="plan-goals">
                    <span>{plan.goals.calories} kcal</span>
                    <span>P: {plan.goals.protein}g</span>
                    <span>C: {plan.goals.carbs}g</span>
                    <span>F: {plan.goals.fat}g</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-plans">No saved plans yet. Generate and save a plan to see it here.</p>
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default MealPlanner;