import './SecondNavigationBar.css';
import MainButton from '../button/MainButton'
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import TitleCards from '../Cards/TitleCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracked, faChartLine, faUtensils, faWeightScale, faDumbbell, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

const SecondNavigationBar = () => {
    return(
        <nav className='second-navbar'>
            <div className='second-navbar-center'>
                <ul className='nav-links'>
                    <li>
                    <Link to='/overview'> <TitleCards Title={"Overview"} icon={faChartLine}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/nutrition'> <TitleCards Title={"Nutritition"} icon={faUtensils}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/foodLogging'> <TitleCards Title={"FoodLogging"} icon={faScaleBalanced}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/workout'> <TitleCards Title={"Workout"} icon={faDumbbell}/>
                    </Link>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default SecondNavigationBar