import './DateBar.css';
import { useState } from 'react';

const Weekbar = () => {
    
    // workout the date at teh start and end of the week
    const getStart = (date) => {
        const d = new Date(date)
        const dif = d.getDay() === 0 ? 6 : d.getDay() -1
        d.setDate(d.getDate() - dif)
        return d
    }

    // State for week navigation
    const [currentWeek, setCurrentWeek] = useState(getStart(new Date()));

    // Handle week navigation
    const handlePrevweek = () => {
        const prev = new Date(currentWeek);
        prev.setDate(prev.getDate() - 7);
        setCurrentWeek(prev);
    };

    const handleNextWeek = () => {
        const next = new Date(currentWeek);
        next.setDate(next.getDate() + 7);
        setCurrentWeek(next);
    };

    // Format date for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const weekEnd = new Date(currentWeek)
    weekEnd.setDate(currentWeek.getDate() + 6)

    return( 
        <div className='date-bar'>
            <div className='date-navigator'>
                    <button className='nav-arrow' onClick={handlePrevweek}>←</button>
                    <span className='date-display'>{formatDate(currentWeek)} - {formatDate(weekEnd)}</span>
                    <button className='nav-arrow' onClick={handleNextWeek}>→</button>
                </div>
        </div>
    );
};
export default Weekbar