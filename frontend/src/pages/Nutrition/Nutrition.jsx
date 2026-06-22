import './Nutrition.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNavigationBar from '../../components/NavBar/SecondNavigationBar';
import DateBar from '../../components/NavBar/DateBar';
import AddButton from '../../components/button/AddButton';
import { useState } from 'react';

const Nutrition = () => {
    // State for nutrition entries
    const [nutritionEntries] = useState([
        { id: 1, meal: 'Breakfast', calories: 450, protein: 25 },
        { id: 2, meal: 'Lunch', calories: 620, protein: 35 },
        { id: 3, meal: 'Snack', calories: 200, protein: 10 },
        { id: 4, meal: 'Dinner', calories: 780, protein: 42 },
    ]);

    // Calculate totals
    const totalCalories = nutritionEntries.reduce((sum, entry) => sum + entry.calories, 0);
    const totalProtein = nutritionEntries.reduce((sum, entry) => sum + entry.protein, 0);
    const totalEntries = nutritionEntries.length;

    // Handle add button click
    const handleAddNutrition = () => {
        alert('Add new nutrition entry feature coming soon!');
    };

    return (
        <>
            <MainNavigationBar />
            <SecondNavigationBar />

            <div className='nutrition-container'>
                <DateBar />

                {/* Main Content Area */}
                <div className='nutrition-content'>
                    {/* Left Side - Nutrition Log */}
                    <div className='nutrition-log'>
                        <div className='log-header'>
                            <h2>Nutrition Log</h2>
                            <button className='nutrition-add-trigger' onClick={handleAddNutrition} aria-label='Add nutrition entry'>
                                <AddButton />
                            </button>
                        </div>

                        <div className='entries-list'>
                            {nutritionEntries.length > 0 ? (
                                nutritionEntries.map((entry) => (
                                    <div key={entry.id} className='entry-item'>
                                        <div className='entry-meal'>
                                            <h3>{entry.meal}</h3>
                                        </div>
                                        <div className='entry-details'>
                                            <span className='calories'>{entry.calories} cal</span>
                                            <span className='protein'>{entry.protein}g protein</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='empty-state'>
                                    <p>No nutrition entries yet. Click + to add one!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Center Panel */}
                    <div className='nutrition-center'>
                        <div className='center-panel'>
                            <div className='center-panel-header'>
                                <h2>Daily Overview</h2>
                                <span>Track meals, calories, and macros for the selected date.</span>
                            </div>

                            <div className='center-panel-body'>
                                <div className='overview-metric'>
                                    <div className='metric-label'>Calories</div>
                                    <div className='metric-value'>{totalCalories}</div>
                                </div>
                                <div className='overview-metric'>
                                    <div className='metric-label'>Protein</div>
                                    <div className='metric-value'>{totalProtein}g</div>
                                </div>
                                <div className='overview-metric'>
                                    <div className='metric-label'>Meals</div>
                                    <div className='metric-value'>{totalEntries}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Summary Cards */}
                    <div className='nutrition-summary'>
                        <div className='summary-card summary-feature'>
                            <div className='card-label'>Daily Goal</div>
                            <div className='card-value'>2000</div>
                            <div className='card-unit'>kcal target</div>
                        </div>

                        <div className='summary-card summary-list'>
                            <div className='summary-list-title'>Meal Breakdown</div>
                            {nutritionEntries.map((entry) => (
                                <div key={entry.id} className='summary-list-item'>
                                    <span>{entry.meal}</span>
                                    <span>{entry.calories} cal</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nutrition;