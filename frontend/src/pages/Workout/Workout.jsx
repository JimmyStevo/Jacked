import './Workout.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import TertiaryNavigationBar from '../../components/NavBar/TertiaryNavigationBar';
import { useState } from 'react';

const Workout = () => {

    const [activeTab, setActiveTab] = useState(null)

    return (
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>
        <div className='tertiaryNavigationBar'>

        </div>
        </>
    );
}

export default Workout;