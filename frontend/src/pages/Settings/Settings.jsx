import './Settings.css'
import Dropdown from '../../components/Dropdown/Dropdown';
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondButton from '../../components/button/SecondButton'
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import Cards from '../../components/Cards/Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracked, faChartLine, faUtensils, faWeightScale, faDumbbell, faIdCard, faGamepad, faInfoCircle, faCog, faUserSecret } from '@fortawesome/free-solid-svg-icons';


const Settings = () => {
    return (
        <>
        {/* Nvaigation Bars */}
        <MainNavigationBar/>
        <SecondNaviationBar/>
        <div className='card-container-column'>

            {/*Fitness Goals */}
            <div className='card-container-settings'>
                <Cards Title={'Fitness Goals'} icon={faDumbbell} Description={'Set Your Fitness goals'} cardType={'card-large'}>
                    <form>                   
                        <p>
                            Target Weight:  
                        </p>
                        <input type='number' placeholder='Please enter your target Weight'/>
                    </form>
                    <form>
                        <p>
                            Target Steps: 
                        </p>
                        <input type='number' placeholder='Please enter your target Steps'/>
                    </form>
                </Cards>
            </div>

            {/* Notifications */}
            <div className='card-container-settings'>
                <Cards Title={'Notifications'} icon={faInfoCircle} Description={'Set Your Notification Settings'} cardType={'card-large'}>
                    <p>
                        Stuff
                    </p>
                    
                </Cards>
            </div>

            {/* Preferences */}
            <div className='card-container-settings'>
                <Cards Title={'Preferences'} icon={faCog} Description={'Set Your Preferences'} cardType={'card-large'}>
                    <p>
                        Unit of Measurement: 
                        <Dropdown options={['Kg', 'Lb']}/>
                    </p>
                    <p>
                        Dark Mode:
                    </p>
                </Cards>
            </div>

            {/* Privacy */}
            <div className='card-container-settings'>
                <Cards Title={'Privacy'} icon={faUserSecret} Description={'Set Privacy settings'} cardType={'card-large'}/>
            </div>
            <div className='card-container-settings'>
                <SecondButton label='Save Changes'/> 
                <MainButton label='Exit without Saving'/>
            </div>
        </div>
        </>
    );
}

export default Settings;