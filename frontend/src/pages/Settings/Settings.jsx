import './Settings.css'
import Dropdown from '../../components/Dropdown/Dropdown';
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondButton from '../../components/button/SecondButton'
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import Cards from '../../components/Cards/Cards';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { insertSettings, getSettings } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { faUser, faGear, faRightFromBracked, faChartLine, faUtensils, faWeightScale, faDumbbell, faIdCard, faGamepad, faInfoCircle, faCog, faUserSecret } from '@fortawesome/free-solid-svg-icons';


const Settings = () => {
    const { token } = useAuth()
    const [savedSettings, setSavedSettings] = useState({})
    const [weightGoal, setWeightGoal] = useState('')
    const [stepsGoal, setSteps] = useState('')
    const [unit, setUnit] = useState('')
    const [darkmode, setDarkmode] = useState('')

    const handleSettingsSubmit = async () => {
        try{
            const response = await insertSettings({weightGoal, stepsGoal, unit, darkmode}, token)
        }
        catch(error){
            console.log('error', error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSettingsSubmit();
    }

    useEffect(() => {
        getSettings(token).then(data => {
            const settings = data[0] || {}
            setSavedSettings(settings)
            setWeightGoal(settings.weightGoal || "")
            setSteps(settings.stepsGoal || "")
            setUnit(settings.unit || "")
        })
    }, [token])

    const handleRevert = () =>{
        setWeightGoal(savedSettings.weightGoal || "")
        setSteps(savedSettings.stepsGoal || "")
        setUnit(savedSettings.unit || "")
    }

    return (
        <>
        {/* Nvaigation Bars */}
        <MainNavigationBar/>
        <SecondNaviationBar/>
        <form onSubmit={handleSubmit}>
        <div className='card-container-column'>

            {/*Fitness Goals */}
            
            <div className='card-container-settings'>
                <Cards Title={'Fitness Goals'} icon={faDumbbell} Description={'Set Your Fitness goals'} cardType={'card-large'}>
                        <h1>
                            Current Weight:  
                        </h1>   
                        <h1>
                            Target Weight:  
                        </h1>
                            <input className='settings-input' type='number' placeholder='Enter your target Weight' value={weightGoal}
                            onChange={(e)=> setWeightGoal(e.target.value)}/>
                        <h1>
                            Target Steps: 
                        </h1>
                        <input type='number' placeholder='Enter your target Steps' value={stepsGoal} onChange={(e)=> setSteps(e.target.value)}/>
                </Cards>
            </div>

            {/* Notifications */}
            <div className='card-container-settings'>
                <Cards Title={'Notifications'} icon={faInfoCircle} Description={'Set Your Notification Settings'} cardType={'card-large'}>
                    <h1>
                        Current Goal:
                    </h1>
                    <h1>
                        Workout Frequency:  
                    </h1>
                    <h1>
                        Days to Workout:  
                    </h1>
                </Cards>
            </div>

            {/* Preferences */}
            <div className='card-container-settings'>
                <Cards Title={'Preferences'} icon={faCog} Description={'Set Your Preferences'} cardType={'card-large'}>
                    <h1>
                        Unit of Measurement: 
                    </h1>
                    <h3><Dropdown options={['Kg', 'Lb']} onChange={(val)=> setUnit(val)}/></h3>
                    <h1>
                        Dark Mode: 
                    </h1>
                    <h3>-- coming soon(tm)</h3>
                </Cards>
            </div>

            {/* Privacy */}
            <div className='card-container-settings'>
                <Cards Title={'Privacy'} icon={faUserSecret} Description={'Set Privacy settings'} cardType={'card-large'}/>
            </div>
            <div className='card-container-settings'>
                <SecondButton label='Save Changes' type='submit'/> 
                <Link to='/overview'>
                    <MainButton label='Exit without Saving' onClick={handleRevert}/>
                </Link>
            </div>
        </div>
        </form>
        </>
    );
}

export default Settings;