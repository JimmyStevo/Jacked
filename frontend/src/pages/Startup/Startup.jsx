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
import { insertStartup } from '../../services/api';
import { useAuth } from '../../context/AuthContext';


const Startup = (props) => {
    const { token } = useAuth()
    const[currentWeight, setCurrentWeight] = useState('')
    const[currentHeight, setcurrentHeight] = useState('')
    const[unit, setUnit] = useState('')
    const[gender, setGender] = useState('')
    const[goal, setGoal] = useState('')
    const[workFreq, setWorkFreq] = useState('')
    const[selectedDays, setSelectedDays] = useState('')
    

        const startupInsert = async () => {
            try{
                const response = await insertStartup({currentWeight, currentHeight, unit, gender, goal, workFreq, workdays: selectedDays}, token)
                props.insertStartup(response)
            } catch(error) {
                console.log('error', error)
            }

        }
    
        const handleSubmit = (event) => {
            event.preventDefault()
            startupInsert()
            setCurrentWeight('')
            setcurrentHeight('')
            setUnit('')
            setGender('')
            setGoal('')
            setWorkFreq('')
            
        }
        
        // FUNCTION TO ALLOW THE USER TO SELECT DAYS BASED ON THE PREVIOUS
        // SELECTION OF # OF DAYS A WEEK THEY WANT TO WORK OUT ON 
        const handDayToggle = (day) => {
            if (selectedDays.includes(day)) {
                setSelectedDays(selectedDays.filter(d => d !== day))
                }
            else if (selectedDays.length < parseInt(workFreq)) {
                const daysSelected = []
                for (let i = 0; i < selectedDays.length; i++) {
                    daysSelected.push(selectedDays[i])
                }
                daysSelected.push(day)
                setSelectedDays(daysSelected)
            }
        }

        // FUNCTION TO CHANGE THE AMOUNT OF DAYS SELECTABLE IN THE
        // CHOOSING OF WHICH DAYS THE USER WANTS TO WORK OUT ON 
        const handleFreqChange = (val) => {
            setWorkFreq(val)
            setSelectedDays(selectedDays.slice(0, parseInt(val)))
        }

    return(
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>
        <form onSubmit={handleSubmit}>
            <div className='Startup-column'>
                <div className='Startup-row'>
                <div className='Startup-Card'>
                    <h2>Pick your preferred unit of Measurement:</h2>
                    <Dropdown options={['Kg', 'Lb']} onChange={(val)=> setUnit(val)}/>
                    <h2>How much do you weigh (in your preferred unit of measurement)?:</h2>
                    <input className='Startup-input' type='number' value={currentWeight} onChange={(e)=> setCurrentWeight(e.target.value)}/>
                    <h2>How tall are you (in cm)?</h2>
                    <input className='Startup-input' type='number' value={currentHeight} onChange={(e)=> setcurrentHeight(e.target.value)}/>
                    <h2>What is your gender</h2>
                    <Dropdown options={['male', 'female', 'prefer not to say']} onChange={(val)=> setGender(val)}/>
                </div>
                </div>
                <div className='Startup-row'>
                <div className='Startup-Card'>
                    <h2>What is your goal?: </h2>
                        <div className='Startup-row'>
                            <input type='radio' name='goalSelect' value='gain' checked={goal === 'gain'} onChange={(e)=> setGoal(e.target.value)}/>
                            <p> Gain Weight </p>
                        </div>
                        <div className='Startup-row'>
                            <input type='radio' name='goalSelect' value='lose' checked={goal === 'lose'} onChange={(e)=> setGoal(e.target.value)}/>
                            <p> Lose Weight </p>
                        </div>
                        <div className='Startup-row'>
                            <input type='radio' name='goalSelect' value='maintain' checked={goal === 'maintain'} onChange={(e)=> setGoal(e.target.value)}/>
                            <p>Maintain Weight </p>
                        </div>
                    </div>
                    </div>
                <div className='Startup-row'>
                <div className='Startup-Card'>
                    <h2>How often do you want to work out?: </h2>
                    <div className='Startup-row'>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='1' checked={workFreq === '1'} onChange={(e)=> handleFreqChange(e.target.value)}/>
                        <p> 1 Day a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='2' checked={workFreq === '2'} onChange={(e)=> handleFreqChange(e.target.value)}/>
                        <p> 2 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='3' checked={workFreq === '3'} onChange={(e)=> handleFreqChange(e.target.value)}/>
                        <p> 3 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='4' checked={workFreq === '4'} onChange={(e)=> handleFreqChange(e.target.value)}/>
                        <p> 4 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='5' checked={workFreq === '5'} onChange={(e)=> handleFreqChange(e.target.value)}/>
                        <p> 5 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='6' checked={workFreq === '6'} onChange={(e)=> handleFreqChange(e.target.value)}/>
                        <p> 6 Days a week </p>
                    </div>
                    <div className='Startup-row'>
                        <input type='radio' name='WorkoutAmount' value='7' checked={workFreq === '7'} onChange={(e)=> handleFreqChange(e.target.value)}/>
                        <p> 7 Days a week </p>
                    </div>
                    </div>
                    <h2>Select which days you wish to workout on: </h2>
                    <div className='Startup-row'>
                        {workFreq &&(
                            <div>
                                {['Mon','Tue','Wed','Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <div key={day} className='Startup-row'>
                                        <input
                                            type='checkbox'
                                            checked={selectedDays.includes(day)}
                                            disabled={!selectedDays.includes(day) && selectedDays.length >= parseInt(workFreq)}
                                            onChange={() => handDayToggle(day)}/>
                                            <p>{day}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                </div>
                    <div className='Startup-row'>
                    <div className='card-container-settings'>
                        <SecondButton label='Save Changes' type='submit'/> 
                    </div>
                    </div>
            </div>
        </form>
        

        </>
    )
}



export default Startup;