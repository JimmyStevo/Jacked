import './Workout.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import TertiaryNavigationBar from '../../components/NavBar/TertiaryNavigationBar';
import { useState } from 'react';
import WorkoutLegs from './WorkoutLegs';
import WorkoutUpperBody from './WorkoutUpperBody';
import WorkoutLowerBody from './WorkoutLowerBody';
import WorkoutPull from './WorkoutPull';
import WorkoutPush from './WorkoutPush';
import WorkoutRest from './WorkoutRest';
import DateBar from '../../components/NavBar/DateBar';

const Workout = () => {


    const [activeTab, setActiveTab] = useState(null)



    return (
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>

        <DateBar/>

        <TertiaryNavigationBar activeTab={activeTab} setActiveTab={setActiveTab}/>

        {activeTab === 'upperbody' && <WorkoutUpperBody/>}
        {activeTab === 'lowerbody' && <WorkoutLowerBody/>}
        {activeTab === 'legs' && <WorkoutLegs/>}
        {activeTab === 'push' && <WorkoutPush/>}
        {activeTab === 'pull' && <WorkoutPull/>}
        {activeTab === 'rest' && <WorkoutRest/>}
        </>
    );
}

export default Workout;