import './Settings.css'
import Dropdown from '../../components/Dropdown/Dropdown';
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondButton from '../../components/button/SecondButton'
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import Cards from '../../components/Cards/Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faChartLine, faUtensils, faWeightScale, faDumbbell, faIdCard, faGamepad, faInfoCircle, faCog, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { insertSettings, getSettings } from '../../services/api';
import { useAuth } from '../../context/AuthContext';


const Settings = (props) => {
    const { token } = useAuth()

    const [weightGoal, setWeightGoal] = useState('')
    const [stepsGoal, setSteps] = useState('')
    const [unit, setUnit] = useState('')
    const [darkmode, setDarkmode] = useState('')

    const handleSettingsSubmit = async () => {
        try{
            const response = await insertSettings({weightGoal, stepsGoal, unit, darkmode}, token)
            props.insertSettings(response)
        }
        catch(error){
            console.log('error', error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSettingsSubmit();
        setWeightGoal('');
        setSteps('');
        setUnit('')
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
                        Stuff
                    </h1>
                    
                </Cards>
            </div>

            {/* Preferences */}
            <div className='card-container-settings'>
                <Cards Title={'Preferences'} icon={faCog} Description={'Set Your Preferences'} cardType={'card-large'}>
                    <h1>
                        Unit of Measurement: 
                        <Dropdown options={['Kg', 'Lb']} onChange={(val)=> setUnit(val)}/>
                    </h1>
                    <h1>
                        Dark Mode:
                    </h1>
                </Cards>
            </div>

            {/* Privacy */}
            <div className='card-container-settings'>
                <Cards Title={'Privacy'} icon={faUserSecret} Description={'Set Privacy settings'} cardType={'card-large'}/>
            </div>
            <div className='card-container-settings'>
                <SecondButton label='Save Changes' type='submit'/> 
                <Link to='/overview'>
                    <MainButton label='Exit without Saving'/>
                </Link>
            </div>
        </div>
        </form>
        </>
    );
}

export default Settings;