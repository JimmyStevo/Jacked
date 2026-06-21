import './Overview.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import MainButton from '../../components/button/MainButton';
import SecondButton from '../../components/button/SecondButton';
import Cards from '../../components/Cards/Cards';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import LineGraph from '../../components/Charts/LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracked, faChartLine, faUtensils, faWeightScale, faDumbbell, faIdCard, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Overview = () => {

const [Complete, setCompleted] = useState(75);


const cardData = [
    {Title: "WORKOUTS", icon: faIdCard, Description: "THIS WEEK", cardType: "card-med"},
    {Title: "CALORIES TODAY", icon: faIdCard, Description: "This is the description #2", cardType: "card-med"},
    {Title: "PROTEIN", icon: faIdCard, Description: "This is the description #3", cardType: "card-med"},
    {Title: "POINTS", icon: faIdCard, Description: "This is the description #4", cardType: "card-med"}
    ]
    return (
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>
        {/* // DB information passed through array to be displayed on overview page */}
        <div className='card-container-overview-column'>
            <div className='card-container-overview'>
                {cardData.map((card, index) => (
                <Cards key={index}
                Title={card.Title}
                Description={card.Description}
                cardType={card.cardType}
                icon={card.icon}
                />))
            }
            </div>
            <div className='card-container-overview'>
                <Cards Title={'Todays Macros'} icon={faIdCard} Description={'This is the place for bar metrics'} cardType={'card-med-large-long'}>
                    <h3>CALORIES</h3>
                    <ProgressBar progress={Complete}/>
                    <h3>PROTIEN</h3>
                    <ProgressBar progress={Complete}/>
                    <h3>CARBS</h3>
                    <ProgressBar progress={Complete}/>
                    <h3>FAT</h3>
                    <ProgressBar progress={Complete}/>
                </Cards>
            </div>
            <div className='card-container-overview'>
                <Cards Title={'Weight Progress'} icon={faGamepad} Description={'This is the place for bar metrics'} cardType={'card-large'}>
                    <LineGraph/>
                </Cards>
            </div>
            <div className='card-container-overview-largergap'>
                <Cards Title={'Log Weight'} icon={faGamepad} Description={'This is the place for bar metrics'} cardType={'card-med-large'}>
                    <input className='overview-form' type='text'/>
                    <MainButton  label={'Log (+5 points'}/>
                </Cards>
                <Cards Title={'Weekly Check-in'} icon={faGamepad} Description={'This is the place for bar metrics'} cardType={'card-med-large'}>
                    <SecondButton label={'Start Checkin (+25 points)'}/>
                </Cards>
                
            </div>
        </div>
        </>
    );
}

export default Overview;