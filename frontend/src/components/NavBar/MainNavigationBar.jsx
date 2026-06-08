import './MainNavigationBar.css';
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
            <Link to='/account' className='profile-icon'>
                Things
                <i className=''></i>
            </Link>
            <Link to='/settings' className='num-icon'>
                Stuff
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