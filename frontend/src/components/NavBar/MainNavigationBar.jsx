import './MainNavigationBar.css';

const MainNavigationBar = () => {
    return(
    <nav className='main-navbar'>
        <div className='main-navbar-left'>
            <a href='/' className='title'>
                Jacked
            </a>
        </div>
        <div className='main-navbar-right'>
            <a href='/account' className='profile-icon'>
                <i className=''></i>
            </a>
            <a href='/settings' className='num-icon'>
                <i className=''></i>
            </a>
            <a href='/' className='exit-icon'>
                <i className=''></i>
            </a>
        </div>
    </nav>
    );
};