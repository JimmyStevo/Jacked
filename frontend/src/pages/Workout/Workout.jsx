import './Workout.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import TertiaryNavigationBar from '../../components/NavBar/TertiaryNavigationBar';
import { useState, useEffect } from 'react';
import WorkoutLegs from './WorkoutLegs';
import WorkoutUpperBody from './WorkoutUpperBody';
import WorkoutLowerBody from './WorkoutLowerBody';
import WorkoutPull from './WorkoutPull';
import WorkoutPush from './WorkoutPush';
import WorkoutRest from './WorkoutRest';
import DateBar from '../../components/NavBar/DateBar';
import { useAuth } from '../../context/AuthContext';
import { getStartup } from '../../services/api';
import Weekbar from '../../components/NavBar/WeekBar';

const Workout = () => {

    const { token } = useAuth()
    const [activeTab, setActiveTab] = useState(null)
    const [workdays, setWorkDays] = useState([])

    useEffect(() => {
        getStartup(token).then(data => {
            setWorkDays(data[0]?.workdays || [])
        })
    }, [token])

    return (
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>

        <Weekbar/>

        <TertiaryNavigationBar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            workdays={workdays}/>

        {/* Shows workout page if day  is marked for workout other wise shows rest  */}
        {activeTab && workdays.includes(activeTab) && <WorkoutUpperBody/>}
        {/* {activeTab === 'lowerbody' && <WorkoutLowerBody/>}
        {activeTab === 'legs' && <WorkoutLegs/>}
        {activeTab === 'push' && <WorkoutPush/>}
        {activeTab === 'pull' && <WorkoutPull/>} */}
        {activeTab && !workdays.includes(activeTab) && <WorkoutRest/>}
        </>
    );
}

export default Workout;