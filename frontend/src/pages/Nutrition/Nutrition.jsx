import './Nutrition.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNavigationBar from '../../components/NavBar/SecondNavigationBar';
import AddButton from '../../components/button/AddButton';
import MainButton from '../../components/button/MainButton';
import SecondButton from '../../components/button/SecondButton';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useState, useEffect } from 'react';
import { nutritionAPI } from '../../services/api';

// Preset food items with estimated nutrition values
const PRESET_FOODS = [
    { name: 'Banana', calories: 105, protein: 1.3, servingSize: '1 medium' },
    { name: 'Apple', calories: 95, protein: 0.5, servingSize: '1 medium' },
    { name: 'Milk (Whole)', calories: 149, protein: 8, servingSize: '1 cup' },
    { name: 'Milk (Skim)', calories: 83, protein: 8, servingSize: '1 cup' },
    { name: 'Protein Shake', calories: 120, protein: 25, servingSize: '1 scoop' },
    { name: 'Eggs (2)', calories: 156, protein: 12, servingSize: '2 large' },
    { name: 'Oatmeal', calories: 158, protein: 6, servingSize: '1 cup cooked' },
    { name: 'Chicken Breast', calories: 165, protein: 31, servingSize: '100g' },
    { name: 'Rice', calories: 206, protein: 4.3, servingSize: '1 cup cooked' },
    { name: 'Broccoli', calories: 55, protein: 3.7, servingSize: '1 cup' },
    { name: 'Greek Yogurt', calories: 100, protein: 17, servingSize: '170g' },
    { name: 'Peanut Butter', calories: 188, protein: 8, servingSize: '2 tbsp' },
];

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const Nutrition = () => {
    // State for nutrition entries
    const [nutritionEntries, setNutritionEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    
    // Date navigation (separate from DateBar)
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Form state
    const [formData, setFormData] = useState({
        meal: '',
        calories: '',
        protein: '',
        quantity: 1,
        mealType: 'Snack',
        date: new Date().toISOString().split('T')[0]
    });

    // Load nutrition entries from MongoDB
    useEffect(() => {
        loadNutrition();
    }, []);

    const loadNutrition = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await nutritionAPI.getAll();
            setNutritionEntries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load nutrition:', error);
            setError('Failed to load nutrition data. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    // Filter entries by selected date
    const filteredEntries = nutritionEntries.filter(entry => {
        const entryDate = new Date(entry.date).toISOString().split('T')[0];
        const selectedDateStr = selectedDate.toISOString().split('T')[0];
        return entryDate === selectedDateStr;
    });

    // Calculate totals for filtered entries
    const totalCalories = filteredEntries.reduce((sum, entry) => sum + (entry.calories || 0), 0);
    const totalProtein = filteredEntries.reduce((sum, entry) => sum + (entry.protein || 0), 0);
    const totalEntries = filteredEntries.length;

    // Date navigation functions
    const handlePrevDay = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setSelectedDate(prevDate);
    };

    const handleNextDay = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setSelectedDate(nextDate);
    };

    // Jump to today
    const goToToday = () => {
        setSelectedDate(new Date());
    };

    // Check if viewing today
    const isToday = () => {
        const today = new Date();
        return selectedDate.toISOString().split('T')[0] === today.toISOString().split('T')[0];
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

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Apply preset food
    const applyPreset = (preset) => {
        setFormData(prev => ({
            ...prev,
            meal: preset.name,
            calories: preset.calories.toString(),
            protein: preset.protein.toString(),
            quantity: 1
        }));
    };

    // Open modal for adding new entry
    const handleOpenModal = () => {
        setFormData({
            meal: '',
            calories: '',
            protein: '',
            quantity: 1,
            mealType: 'Snack',
            date: new Date().toISOString().split('T')[0]
        });
        setEditingEntry(null);
        setShowModal(true);
    };

    // Open modal for editing
    const handleEditEntry = (entry) => {
        setFormData({
            meal: entry.meal || '',
            calories: entry.calories?.toString() || '',
            protein: entry.protein?.toString() || '',
            quantity: entry.quantity || 1,
            mealType: entry.mealType || 'Snack',
            date: entry.date || new Date().toISOString().split('T')[0]
        });
        setEditingEntry(entry);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setEditingEntry(null);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const entry = {
            meal: formData.meal,
            calories: parseFloat(formData.calories) || 0,
            protein: parseFloat(formData.protein) || 0,
            quantity: parseInt(formData.quantity) || 1,
            mealType: formData.mealType,
            date: selectedDate.toISOString().split('T')[0]
        };

        try {
            await nutritionAPI.add(entry);
            handleCloseModal();
            loadNutrition();
        } catch (error) {
            console.error('Failed to save nutrition:', error);
            setError('Failed to save nutrition entry');
        }
    };

    // Handle delete
    const handleDelete = async (meal) => {
        try {
            await nutritionAPI.delete(meal);
            loadNutrition();
        } catch (error) {
            console.error('Failed to delete nutrition:', error);
        }
    };

    if (loading) {
        return (
            <>
                <MainNavigationBar />
                <SecondNavigationBar />
                <div className='nutrition-container'>
                    <div className='nutrition-date-bar'>
                        <div className='nutrition-date-navigator'>
                            <button className='nutrition-nav-arrow' onClick={handlePrevDay}>←</button>
                            <span className='nutrition-date-display'>{formatDate(selectedDate)}</span>
                            <button className='nutrition-nav-arrow' onClick={handleNextDay}>→</button>
                        </div>
                    </div>
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
                    <div className='nutrition-date-bar'>
                        <div className='nutrition-date-navigator'>
                            <button className='nutrition-nav-arrow' onClick={handlePrevDay}>←</button>
                            <span className='nutrition-date-display'>{formatDate(selectedDate)}</span>
                            <button className='nutrition-nav-arrow' onClick={handleNextDay}>→</button>
                        </div>
                    </div>
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
                <div className='nutrition-date-bar'>
                    <div className='nutrition-date-navigator'>
                        <button className='nutrition-nav-arrow' onClick={handlePrevDay}>←</button>
                        <span className='nutrition-date-display'>{formatDate(selectedDate)}</span>
                        <button className='nutrition-nav-arrow' onClick={handleNextDay}>→</button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className='nutrition-content'>
                    {/* Left Side - Nutrition Log */}
                    <div className='nutrition-log'>
                        <div className='log-header'>
                            <h2>Nutrition Log</h2>
                            {!isToday() && (
                                <button className='today-btn' onClick={goToToday}>
                                    Go to Today
                                </button>
                            )}
                            <button className='nutrition-add-trigger' onClick={handleOpenModal} aria-label='Add nutrition entry'>
                                <AddButton />
                            </button>
                        </div>

                        <div className='entries-list'>
                            {filteredEntries.length > 0 ? (
                                filteredEntries.map((entry, index) => (
                                    <div key={entry._id || index} className='entry-item' onClick={() => handleEditEntry(entry)}>
                                        <div className='entry-meal'>
                                            <h3>{entry.meal}</h3>
                                            <span className='meal-type-badge'>{entry.mealType}</span>
                                        </div>
                                        <div className='entry-details'>
                                            <span className='calories'>{entry.calories} cal</span>
                                            <span className='protein'>{entry.protein}g protein</span>
                                            <span className='quantity'>x{entry.quantity}</span>
                                        </div>
                                        <button 
                                            className='entry-delete-btn' 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(entry.meal);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className='empty-state'>
                                    <p>No entries for this date. Click + to add one!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Center Panel */}
                    <div className='nutrition-center'>
                        <div className='center-panel'>
                            <div className='center-panel-header'>
                                <h2>Daily Overview</h2>
                            </div>

                            <div className='center-panel-body'>
                                {/* Daily Goal - Top Card */}
                                <div className='overview-metric overview-metric-full'>
                                    <div className='metric-label'>Daily Goal</div>
                                    <div className='metric-value'>2000 kcal</div>
                                </div>

                                {/* 3 Cards Below */}
                                <div className='overview-metrics-row'>
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
                    </div>
                </div>
            </div>

            {/* Add/Edit */}
            {showModal && (
                <div className='modal-overlay' onClick={handleCloseModal}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <h2>{editingEntry ? 'Edit Meal' : 'Add Meal'}</h2>
                            <button className='modal-close' onClick={handleCloseModal}>×</button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Meal Name</label>
                                <input
                                    type='text'
                                    name='meal'
                                    value={formData.meal}
                                    onChange={handleInputChange}
                                    placeholder='e.g., Grilled Chicken Salad'
                                    required
                                />
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Calories</label>
                                    <input
                                        type='number'
                                        name='calories'
                                        value={formData.calories}
                                        onChange={handleInputChange}
                                        placeholder='0'
                                        min='0'
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Protein (g)</label>
                                    <input
                                        type='number'
                                        name='protein'
                                        value={formData.protein}
                                        onChange={handleInputChange}
                                        placeholder='0'
                                        min='0'
                                        step='0.1'
                                    />
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Quantity</label>
                                    <input
                                        type='number'
                                        name='quantity'
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        min='1'
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Meal Type</label>
                                    <Dropdown 
                                        options={MEAL_TYPES}
                                        onSelect={(type) => setFormData(prev => ({ ...prev, mealType: type }))}
                                        selected={formData.mealType}
                                    />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>Date</label>
                                <input
                                    type='date'
                                    name='date'
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className='preset-foods'>
                                <label>Quick Add Presets:</label>
                                <div className='preset-grid'>
                                    {PRESET_FOODS.map((preset) => (
                                        <button
                                            key={preset.name}
                                            type='button'
                                            className='preset-btn'
                                            onClick={() => applyPreset(preset)}
                                        >
                                            <span className='preset-name'>{preset.name}</span>
                                            <span className='preset-info'>{preset.calories} cal</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='form-actions'>
                                <SecondButton 
                                    label='Cancel' 
                                    onClick={handleCloseModal} 
                                />
                                <MainButton 
                                    label={editingEntry ? 'Update' : 'Add Meal'} 
                                    onClick={handleSubmit}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Nutrition;