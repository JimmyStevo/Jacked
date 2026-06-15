import './Workout.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import TertiaryNavigationBar from '../../components/NavBar/TertiaryNavigationBar';

const WorkoutLowerBody = () => {
    return (
    <div className='card-container-workout'>
        <label>YOU SHOULD BE RESTING</label>
        <div className='card-container-workout-row'>
            <MainButton label={'REST'}/>
        </div>
    </div>
    )
}

export default WorkoutLowerBody