import './MainNavigationBar.css';
import MainButton from '../button/MainButton'
import { Link } from 'react-router-dom';

const MainNavigationBar = () => {
    return(
    <nav className='main-navbar'>
        <div className='main-navbar-left'>
            <Link to='/' className='title'>
                Jacked
            </Link>
        </div>
        <div className='main-navbar-right'>
            <Link to='/settings' className='num-icon'>
                Stuff
                <i className=''></i>
            </Link>
            <Link to='/overview' className='settings-icon'>
                <MainButton label="Points"/>
                <i className=''></i>
            </Link>
            <Link to='/account' className='profile-icon'>
                Account
                <i className=''></i>
            </Link>
            <Link to='/' className='exit-icon'>
                Exit
                <i className=''></i>
            </Link>
        </div>
    </nav>
    );
};

export default MainNavigationBar