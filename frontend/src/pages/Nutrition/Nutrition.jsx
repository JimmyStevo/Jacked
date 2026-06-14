import './Nutrition.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNavigationBar from '../../components/NavBar/SecondNavigationBar';
import AddButton from '../../components/button/AddButton';
import { useState } from 'react';

const Nutrition = () => {
    // State for date navigation
    const [currentDate, setCurrentDate] = useState(new Date());

    // State for nutrition entries
    const [nutritionEntries, setNutritionEntries] = useState([
        { id: 1, meal: 'Breakfast', calories: 450, protein: 25 },
        { id: 2, meal: 'Lunch', calories: 620, protein: 35 },
        { id: 3, meal: 'Snack', calories: 200, protein: 10 },
    ]);

    // Handle date navigation
    const handlePrevDay = () => {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setCurrentDate(prevDate);
    };

    const handleNextDay = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCurrentDate(nextDate);
    };

    // Format date for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

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
                {/* Date Navigator */}
                <div className='date-navigator'>
                    <button className='nav-arrow' onClick={handlePrevDay}>←</button>
                    <span className='date-display'>{formatDate(currentDate)}</span>
                    <button className='nav-arrow' onClick={handleNextDay}>→</button>
                </div>

                {/* Main Content Area */}
                <div className='nutrition-content'>
                    {/* Left Side - Nutrition Log */}
                    <div className='nutrition-log'>
                        <div className='log-header'>
                            <h2>Nutrition Log</h2>
                            <AddButton onClick={handleAddNutrition} />
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

                    {/* Right Side - Summary Cards */}
                    <div className='nutrition-summary'>
                        {/* Total Calories Card */}
                        <div className='summary-card'>
                            <div className='card-label'>Total Calories</div>
                            <div className='card-value'>{totalCalories}</div>
                            <div className='card-unit'>kcal</div>
                        </div>

                        {/* Total Protein Card */}
                        <div className='summary-card'>
                            <div className='card-label'>Total Protein</div>
                            <div className='card-value'>{totalProtein}</div>
                            <div className='card-unit'>grams</div>
                        </div>

                        {/* Meals Logged Card */}
                        <div className='summary-card'>
                            <div className='card-label'>Meals Logged</div>
                            <div className='card-value'>{totalEntries}</div>
                            <div className='card-unit'>meals</div>
                        </div>

                        {/* Daily Goal Card */}
                        <div className='summary-card'>
                            <div className='card-label'>Daily Goal</div>
                            <div className='card-value'>2000</div>
                            <div className='card-unit'>kcal</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nutrition;