import './Workout.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import TertiaryNavigationBar from '../../components/NavBar/TertiaryNavigationBar';
import { useState } from 'react';
import Workoutlegs from './Workout';
import WorkoutUpperBody from './Workout';
import WorkoutLowerBody from './Workout';
import WorkoutPull from './Workout';
import WorkoutPush from './Workout';
import WorkoutRest from './Workout';

const Workout = () => {

    const [activeTab, setActiveTab] = useState(null)

    return (
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>
        <TertiaryNavigationBar activeTab={activeTab} setActiveTab={setActiveTab}>
            <div className={activeTab === 'upperbody' ? 'active' : ''}
            onClick={()=>setActiveTab('upperbody')}/>
        </TertiaryNavigationBar>
        {activeTab === 'upperbody' && <WorkoutUpperBody/>}
        </>
    );
}

export default Workout;