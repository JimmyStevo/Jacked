import './TertiaryNavigationBar.css';
import MainButton from '../button/MainButton'
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import TitleCards from '../Cards/TitleCards';
import SelectCards from '../Cards/SelectCards';

// for use in specific pages to allow multiple selection within a page

const TertiaryNavigationBar = ({ activeTab, setActiveTab, workdays }) => {
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    return(
        <nav className='tertiary-navbar'>
            <div className='tertiary-navbar-center'>
                <ul className='nav-links'>
                    {days.map(day => (
                        <li key={day} onClick={() => setActiveTab(day)}>
                            <SelectCards
                                Title={day}
                                isActive={activeTab === day}
                                isRest={!workdays.includes(day)}/>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    )
}



export default TertiaryNavigationBar