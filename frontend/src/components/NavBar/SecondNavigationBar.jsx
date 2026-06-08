import './SecondNavigationBar.css';
import MainButton from '../button/MainButton'
import { Link } from 'react-router-dom';

const SecondNavigationBar = () => {
    return(
        <nav className='second-navbar'>
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
            <Link to='/account' className='profile-icon'>
                <MainButton label="Points"/>
                <i className=''></i>
            </Link>
            <Link to='/' className='exit-icon'>
                Exit
                <i className=''></i>
            </Link>
        </div>
        </nav>
    )
}

export default SecondNavigationBar