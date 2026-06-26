import './HomeNav.css';
import MainButton from '../button/MainButton';
import { Link } from 'react-router-dom';

const HomeNavBar = () => {
    return (
        <nav className='home-navbar'>
            <div className='home-navbar-left'>
                <Link to='/' className='title'>
                    JACKED                
                </Link>
            </div>
            <div className='home-navbar-right'>
                <Link to='/login'>
                    <MainButton label='LOGIN' />
                </Link>
            </div>
        </nav>
    );
};

export default HomeNavBar;