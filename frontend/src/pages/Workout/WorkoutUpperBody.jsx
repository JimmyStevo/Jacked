import './Workout.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import TertiaryNavigationBar from '../../components/NavBar/TertiaryNavigationBar';
import Cards from '../../components/Cards/Cards';
import Dropdown from '../../components/Dropdown/Dropdown';
import SecondButton from '../../components/button/SecondButton';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { useEffect, useState } from 'react';
import { getExercises, insertWorkoutLogging } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const WorkoutUpperBody = () => {
    const { token } = useAuth()
    const muscleGroup = ['adominals', 'back', 'biceps', 'chest', 'glutes', 'hamstrings', 'quadriceps', 'shoulders','triceps']
    const percentage = 85;
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [selectedExercise, setSelectedExercise] = useState('')
    const [muscle, setMuscle] = useState('')
    const [exercises, setExercises ] = useState([])
   

    useEffect(()=>{
        if(!muscle) return
        getExercises(token, {muscle}).then(data => {
            if(Array.isArray(data)) setExercises(data.map(e => e.name))
        })
    }, [muscle])


    const handleLog = async () => {
        await insertWorkoutLogging({
            exercises: selectedExercise,
            sets,
            reps,
            weight

        }, token)
    }

    return (
    <div className='card-container-workout'>
        <div className='card-container-workout-row'>
        <Cards Title={'LOG WORKOUT'} icon={null} Description={null} cardType={'card-log-workout-card'}>
            <div className='card-container-workout-row'>
                <div className='card-container-workout-column'>
                    <label>Muscle Group</label>
                    <Dropdown options={muscleGroup} onChange={(val) => setMuscle(val)}/>
                </div>
                <div className='card-container-workout-column'>
                    <label>Exercise</label>
                    <Dropdown options={exercises} onChange={(val) => setSelectedExercise(val)}/>
                </div>
            </div>
            <div className='card-container-workout-row'>
                <div className='card-container-workout-column'>
                    <label>Sets</label>
                    <input type='number' placeholder='Number of Sets' value={sets} onChange={e => setSets(e.target.value)}/>
                </div>
                <div className='card-container-workout-column'>
                    <label>Reps</label>
                    <input type='number' placeholder='Number of Reps'value={reps} onChange={e => setReps(e.target.value)}/>
                </div>
                <div className='card-container-workout-column'>
                    <label>Weight</label>
                    <input type="number" placeholder='Weight' value={weight} onChange={e => setWeight(e.target.value)}/>
                </div>
            </div>
            <div className='card-container-workout-row'>
                <SecondButton label={'LOG'} onClick={handleLog}/>
                <MainButton label={'EXIT'}/>
            </div>
        </Cards>
        <Cards Title={'GOAL PROGRESS'} icon={null} Description={null} cardType={'card-goal-progress-card'}>
            <div style={{width: 200, height: 200}}>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
        </Cards>
        </div>
        <div className='card-container-workout-row'>
        <Cards Title={'WORKOUT HISTORY'} icon={null} Description={null} cardType={'card-full'}>
            <input type='number' placeholder='Number of Sets'/>
        </Cards>
        </div>
        <div className='card-container-workout-row'>
        <Cards Title={'AI WORKOUT PLAN'} icon={null} Description={null} cardType={'card-full'}>
            <div className='card-container-workout-column'>
                <input type='text' placeholder='Describe what you would like help with (e.g. build muscle, lose fat etc'/>
                <MainButton label={'GENERATE'}/>
            </div>
        </Cards>
        </div>
    </div>
    )
}

export default WorkoutUpperBody