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
import { insertOverview, getOverview, insertWeightLogging } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getNiceTickValues } from 'recharts';
import { nutritionAPI } from '../../services/api';


const Overview = () => {
const { token } = useAuth() 
const [Complete, setCompleted] = useState(75);
const [nutritionData, setNutritionData] = useState([])
const [totalCalories, setTotalCalories] = useState(0)
const [totalProtein, setTotalProtein] = useState(0)
const [totalFat, setTotalFat] = useState(0)
const [workouts, setWorkouts] = useState()
const [totalCarbs, setTotalCarbs] = useState(0) 
const[weight, setWeight] = useState('')

const handleSubmit = async () => {
    try {
        await insertWeightLogging({ weight }, token)
        setWeight('')
    } catch(error){
        console.log('error', error)
    }
}

useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    nutritionAPI.getAll(today, today).then(data => {
        const totalCalories = nutritionData.reduce((sum, d) => sum + (d.calories || 0), 0)
        const totalProtein = nutritionData.reduce((sum, d) => sum + (d.protein || 0), 0)
        const totalFat = nutritionData.reduce((sum, d) => sum + (d.fat || 0), 0)
        const totalCarbs = nutritionData.reduce((sum, d) => sum + (d.fat || 0), 0)
        setTotalCalories(totalCalories)
        setTotalProtein(totalProtein)
        setTotalFat(totalFat)
        setTotalCarbs(totalCarbs)
    })
}, [])


const cardData = [
    {Title: "WORKOUTS", icon: faIdCard, Description: `${workouts}`, cardType: "card-med"},
    {Title: "CALORIES TODAY", icon: faIdCard, Description: `${totalCalories} kcal`, cardType: "card-med"},
    {Title: "PROTEIN", icon: faIdCard, Description: `${totalProtein} g`, cardType: "card-med"},
    {Title: "POINTS", icon: faIdCard, Description: "", cardType: "card-med"}
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
                <Cards Title={'Todays Macros'} icon={faIdCard} Description={''} cardType={'card-med-large-long'}>
                    <h1>CALORIES</h1>
                    <ProgressBar progress={totalCalories} barType={'progressbar-progress1'}/>
                    <h1>PROTIEN</h1>
                    <ProgressBar progress={totalProtein} barType={'progressbar-progress2'}/>
                    <h1>CARBS</h1>
                    <ProgressBar progress={totalCarbs} barType={'progressbar-progress3'}/>
                    <h1>FAT</h1>
                    <ProgressBar progress={totalFat} barType={'progressbar-progress4'}/>
                </Cards>
            </div>
            <div className='card-container-overview'>
                <div className='card-container-graph'>
                    <h1>WEIGHT PROGRESS</h1>
                    <LineGraph/>
                </div>
            </div>
            <div className='card-container-overview-largergap'>
                <Cards Title={'Log Weight'} icon={faGamepad} Description={''} cardType={'card-med-large'}>
                    <input className='overview-form' type='number' value={weight} onChange={(e) => setWeight(e.target.value)}/>
                    <MainButton onClick={handleSubmit} label={'Log (+5 points'}/>
                </Cards>
                <Cards Title={'Weekly Check-in'} icon={faGamepad} Description={''} cardType={'card-med-large'}>
                    <SecondButton label={'Start Check-in (+25 points)'}/>
                </Cards>
            </div>
        </div>
        </>
    );
}

export default Overview;