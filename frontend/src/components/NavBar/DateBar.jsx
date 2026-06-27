import './DateBar.css';
import { useState, useEffect } from 'react';

const DateBar = ({ currentDate: propDate, setCurrentDate: setPropDate }) => {
    // Only use internal state as fallback when NOT controlled
    const [internalDate, setInternalDate] = useState(new Date());
    
    // Determine if controlled (has both prop and setter)
    const isControlled = setPropDate !== undefined && propDate !== undefined;
    const currentDate = isControlled ? propDate : internalDate;
    const setCurrentDate = isControlled ? setPropDate : setInternalDate;
    
    // Sync internal state when prop changes (for uncontrolled mode)
    useEffect(() => {
        if (!isControlled && propDate) {
            setInternalDate(propDate);
        }
    }, [propDate, isControlled]);

    // Handle date navigation
    const handlePrevDay = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 1);
        setCurrentDate(d);
    };

    const handleNextDay = () => {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + 1);
        setCurrentDate(d);
    };

    // Format date for display
    const formatDate = (date) => 
        date.toLocaleDateString('en-US', {
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });

    return ( 
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