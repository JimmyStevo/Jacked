import './DateBar.css';
import { useState } from 'react';

const DateBar = () => {
    
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
    return( 
        <div className='date-bar'>
            <div className='date-navigator'>
                    <button className='nav-arrow' onClick={handlePrevDay}>←</button>
                    <span className='date-display'>{formatDate(currentDate)}</span>
                    <button className='nav-arrow' onClick={handleNextDay}>→</button>
                </div>
        </div>
    );
};
export default DateBar