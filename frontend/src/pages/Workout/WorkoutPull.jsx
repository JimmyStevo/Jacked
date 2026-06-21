import './Workout.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import TertiaryNavigationBar from '../../components/NavBar/TertiaryNavigationBar';
import Cards from '../../components/Cards/Cards';
import Dropdown from '../../components/Dropdown/Dropdown';
import SecondButton from '../../components/button/SecondButton';

const WorkoutPull = () => {
    return (
    <div className='card-container-workout'>
        <div className='card-container-workout-row'>
        <Cards Title={'LOG WORKOUT'} icon={null} Description={null} cardType={'card-med-large-long'}>
            <div className='card-container-workout-row'>
                <div className='card-container-workout-column'>
                    <label>EXERCISE</label>
                    <Dropdown options={['Shoulder Press', 'Chest Press', 'Bicep Curl', 'Terry Crews special']}/>
                </div>
            </div>
            <div className='card-container-workout-row'>
                <div className='card-container-workout-column'>
                    <label>Sets</label>
                    <input type='number' placeholder='Number of Sets'/>
                </div>
                <div className='card-container-workout-column'>
                    <label>Reps</label>
                    <input type='number' placeholder='Number of Reps'/>
                </div>
                <div className='card-container-workout-column'>
                    <label>Weight</label>
                    <input type="number" placeholder='Weight'/>
                </div>
            </div>
            <div className='card-container-workout-row'>
                <SecondButton label={'LOG'}/>
                <MainButton label={'EXIT'}/>
            </div>
        </Cards>
        <Cards Title={'GOAL PROGRESS'} icon={null} Description={null} cardType={'card-med-large-long'}>        </Cards>
        </div>
        <div className='card-container-workout-row'>
        <Cards Title={'WORKOUT HISTORY'} icon={null} Description={null} cardType={'card-med-large-long'}>
            <label>Sets</label>
            <input type='number' placeholder='Number of Sets'/>
        </Cards>
        </div>
        <div className='card-container-workout-row'>
        <Cards Title={'AI WORKOUT PLAN'} icon={null} Description={null} cardType={'card-med-large-long'}>
            <div className='card-container-workout-column'>
                <label>Sets</label>
                <input type='text' placeholder='Describe what you would like help with (e.g. build muscle, lose fat etc'/>
                <MainButton label={'GENERATE'}/>
            </div>
        </Cards>
        </div>
    </div>
    )
}

export default WorkoutPull