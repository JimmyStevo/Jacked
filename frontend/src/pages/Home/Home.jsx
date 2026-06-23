import './Home.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondButton from '../../components/button/SecondButton';
import Cards from '../../components/Cards/Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracked, faChartLine, faUtensils, faWeightScale, faDumbbell, faIdCard, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



const Home = () => {

    return (
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>

        <div className='card-container-home-column'>
            <div className='card-container-home'>
                <Cards Title={'GET JACKED'} icon={null} Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'} cardType={'card-med-large'}>
                </Cards>
            </div>
            <div className='card-container-home'>
                <MainButton label={'START YOUR JOURNEY'}/>
            </div>
            <label>
                <h1>FEATURES</h1>
            </label>
            <div className='card-container-home'>
                <Cards Title={'GET JACKED'} icon={null} Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'} cardType={'card-med-large'}>
                </Cards>
                <Cards Title={'GET JACKED'} icon={null} Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'} cardType={'card-med-large'}>
                </Cards>
            </div>
            <div className='card-container-home'>
                <Cards Title={'GET JACKED'} icon={null} Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'} cardType={'card-med-large'}>
                </Cards>
                <Cards Title={'GET JACKED'} icon={null} Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'} cardType={'card-med-large'}>
                </Cards>
            </div>
            <label>
                <h1>READY TO GET JACKED?</h1>
            </label>
            <Link to='/signup'>
                <MainButton label={'SIGN UP NOW'}/>
            </Link>

        </div>
        </>
    );
}

export default Home;