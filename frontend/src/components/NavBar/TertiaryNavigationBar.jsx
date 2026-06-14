import './TertiaryNavigationBar.css';
import MainButton from '../button/MainButton'
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import TitleCards from '../Cards/TitleCards';
import SelectCards from '../Cards/SelectCards';

const TertiaryNavigationBar = () => {
    return(
        <nav className='tertiary-navbar'>
            <div className='tertiary-navbar-center'>
                <ul className='nav-links'>
                    <li>
                    <Link to='/upperbody'> <SelectCards Title={"UPPER BODY"}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/upperbody'> <SelectCards Title={"LOWER BODY"}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/upperbody'> <SelectCards Title={"REST"}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/upperbody'> <SelectCards Title={"PUSH"}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/nutrition'> <SelectCards Title={"PULL"}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/weightlogging'> <SelectCards Title={"LEGS"}/>
                    </Link>
                    </li>
                    <li>
                    <Link to='/workout'> <SelectCards Title={"REST"}/>
                    </Link>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default TertiaryNavigationBar