import './Nutrition.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNavigationBar from '../../components/NavBar/SecondNavigationBar';
import DateBar from '../../components/NavBar/DateBar';
import AddButton from '../../components/button/AddButton';
import { useState, useEffect } from 'react';
import { nutritionAPI } from '../../services/api';

const Nutrition = () => {
    // State for nutrition entries
    const [nutritionEntries, setNutritionEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load nutrition entries from MongoDB
    useEffect(() => {
        loadNutrition();
    }, []);

    const loadNutrition = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await nutritionAPI.getAll();
            setNutritionEntries(data);
        } catch (error) {
            console.error('Failed to load nutrition:', error);
            setError('Failed to load nutrition data');
        } finally {
            setLoading(false);
        }
    };

    // Calculate totals
    const totalCalories = nutritionEntries.reduce((sum, entry) => sum + (entry.calories || 0), 0);
    const totalProtein = nutritionEntries.reduce((sum, entry) => sum + (entry.protein || 0), 0);
    const totalEntries = nutritionEntries.length;

    // Handle add button click
    const handleAddNutrition = async () => {
        const newEntry = {
            meal: 'New Meal',
            calories: 0,
            protein: 0,
            date: new Date().toISOString().split('T')[0]
        };
        try {
            await nutritionAPI.add(newEntry);
            loadNutrition();
        } catch (error) {
            console.error('Failed to add nutrition:', error);
            setError('Failed to add nutrition entry');
        }
    };

    if (loading) {
        return (
            <>
                <MainNavigationBar />
                <SecondNavigationBar />
                <div className='nutrition-container'>
                    <DateBar />
                    <div className='loading-state'>
                        <p>Loading nutrition data...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <MainNavigationBar />
                <SecondNavigationBar />
                <div className='nutrition-container'>
                    <DateBar />
                    <div className='error-state'>
                        <p>{error}</p>
                        <button onClick={loadNutrition}>Retry</button>
                    </div>
                </div>
            </>
        );
    }

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
                                    <div key={entry.meal} className='entry-item'>
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