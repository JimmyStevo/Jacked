import './Startup.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondButton from '../../components/button/SecondButton';
import Cards from '../../components/Cards/Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracked, faChartLine, faUtensils, faWeightScale, faDumbbell, faIdCard, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useState } from 'react';
import APIService from '../../components/APIService'


const Startup = (props) => {
    const[currentWeight, setCurrentWeight] = useState('')
    const[currentHeight, setcurrentHeight] = useState('')
    const[unit, setUnit] = useState('')
    const[gender, setGender] = useState('')
    const[goal, setGoal] = useState('')
    const[workFreq, setWorkFreq] = useState('')
    
        const insertStartup = () => {
            APIService.insertStartup({currentWeight, currentHeight, unit, gender, goal, workFreq}).then((response) => props.insertStartup(response)).catch(error => console.log('error',error))
        }
    
        const handleSubmit = (event) => {
            event.preventDefault()
            insertStartup()
            setCurrentWeight('')
            setcurrentHeight('')
            setUnit('')
            setGender('')
            setGoal('')
            setWorkFreq('')
        }
    return(
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>
        <form onSubmit={handleSubmit}>
            <div className='Startup-row'>
                <div className='Startup-column'>
                    <h2>Pick your preferred unit of Measurement</h2>
                    <Dropdown options={['Kg', 'Lb']} onChange={(val)=> setUnit(val)}/>
                    <h2>How much do you weigh currently?</h2>
                    <input className='Startup-input' type='text' value={currentWeight} onChange={(e)=> setCurrentWeight(e.target.value)}/>
                    <h2>How tall are you?</h2>
                    <input className='Startup-input' type='text' value={currentHeight} onChange={(e)=> setcurrentHeight(e.target.value)}/>
                    <h2>What is your gender</h2>
                    <Dropdown options={['Male', 'Female', 'Prefer not to say']} onChange={(val)=> setGender(val)}/>
                    
                    <h2>What is your goal?</h2>
                        <div className='Startup-row'>
                            <input type='radio' name='goalSelect' value='Gain Weight' checked={goal === 'Gain Weight'} onChange={(e)=> setGoal(e.target.value)}/>
                            <p> Gain Weight </p>
                        </div>
                        <div className='Startup-row'>
                            <input type='radio' name='goalSelect' value='Lose Weight' checked={goal === 'Lose Weight'} onChange={(e)=> setGoal(e.target.value)}/>
                            <p> Lose Weight </p>
                        </div>
                        <div className='Startup-row'>
                            <input type='radio' name='goalSelect' value='Maintain Weight' checked={goal === 'Maintain Weight'} onChange={(e)=> setGoal(e.target.value)}/>
                            <p>Maintain Weight </p>
                        </div>

                    <h2>How often do you want to work out</h2>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='1 Day a week' checked={workFreq === '1 Day a week'} onChange={(e)=> setWorkFreq(e.target.value)}/>
                        <p> 1 Day a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='2 Days a week' checked={workFreq === '2 Days a week'} onChange={(e)=> setWorkFreq(e.target.value)}/>
                        <p> 2 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='3 Days a week' checked={workFreq === '3 Days a week'} onChange={(e)=> setWorkFreq(e.target.value)}/>
                        <p> 3 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='4 Days a week' checked={workFreq === '4 Days a week'} onChange={(e)=> setWorkFreq(e.target.value)}/>
                        <p> 4 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='5 Days a week' checked={workFreq === '5 Days a week'} onChange={(e)=> setWorkFreq(e.target.value)}/>
                        <p> 5 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='6 Days a week' checked={workFreq === '6 Days a week'} onChange={(e)=> setWorkFreq(e.target.value)}/>
                        <p> 6 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='7 Days a week' checked={workFreq === '7 Days a week'} onChange={(e)=> setWorkFreq(e.target.value)}/>
                        <p> 7 Days a week </p>
                    </div>
                </div>
            </div>
        </form>
        

        </>
    )
}



export default Startup;