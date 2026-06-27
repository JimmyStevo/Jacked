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
import { insertWeightLogging, nutritionAPI, getSettings, getOverview } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getNiceTickValues } from 'recharts';



const Overview = () => {
const { token } = useAuth() 
const [Complete, setCompleted] = useState(75);
const [nutritionData, setNutritionData] = useState([])
const [totalCalories, setTotalCalories] = useState(0)
const [totalProtein, setTotalProtein] = useState(0)
const [totalFat, setTotalFat] = useState(0)
const [workouts, setWorkouts] = useState()
const [totalCarbs, setTotalCarbs] = useState(0) 
const [weight, setWeight] = useState('')
const [userGoal, setUserGoal] = useState('')
const [userGender, setUserGender] = useState('')
const [totalWorkouts, setTotalWorkouts] = useState(0)

const handleSubmit = async () => {
    try {
        await insertWeightLogging({ weight }, token)
        setWeight('')
    } catch(error){
        console.log('error', error)
    }
}



const Goals ={
    male: {
        maintain: { calories: 2500, protein: 150, carbs: 300, fat: 80 },
        gain: { calories: 3000, protein: 180, carbs: 350, fat: 90 },
        lose: { calories: 2000, protein: 160, carbs: 200, fat: 60 },
    },
    female: {
        maintain: { calories: 2000, protein: 120, carbs: 250, fat: 65 },
        gain: { calories: 2500, protein: 140, carbs: 300, fat: 75 },
        lose: { calories: 1500, protein: 130, carbs: 150, fat: 50 },
    }

}

useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    nutritionAPI.getAll(today, today).then(data => {
        console.log("nutrition data", data)
        const dataArray = Array.isArray(data) ? data : []
        setNutritionData(dataArray)
        setTotalCalories(dataArray.reduce((sum, d) => sum + (d.calories || 0), 0))
        setTotalProtein(dataArray.reduce((sum, d) => sum + (d.protein || 0), 0))
        setTotalFat(dataArray.reduce((sum, d) => sum + (d.fat || 0), 0))
        setTotalCarbs(dataArray.reduce((sum, d) => sum + (d.carbs || 0), 0))
    })
}, [])

useEffect(()=>{
    getSettings(token).then(data => {
        const preference = Array.isArray(data) ? data[0] : data
        if (preference?.goal) setUserGoal(preference.goal)
        if (preference?.gender) setUserGender(preference.gender)
    })
}, [token])

const target = Goals[userGender]?.[userGoal] || Goals.male.maintain

useEffect(()=>{
    getOverview(token).then(data => {
        setWorkouts(data.count)
    })
},[])

const cardData = [
    {Title: "WORKOUTS", icon: faIdCard, Description: `${totalWorkouts}`, cardType: "card-med"},
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
                    <ProgressBar progress={(totalCalories / target.calories) * 100} barType={'progressbar-progress1'} current={totalCalories} goal={target.calories}/>
                    <h1>PROTIEN</h1>
                    <ProgressBar progress={(totalProtein / target.protein) * 100} barType={'progressbar-progress2'} current={totalProtein} goal={target.protein}/>
                    <h1>CARBS</h1>
                    <ProgressBar progress={(totalCarbs / target.carbs) * 100} barType={'progressbar-progress3'} current={totalCarbs} goal={target.carbs}/>
                    <h1>FAT</h1>
                    <ProgressBar progress={(totalFat / target.fat) * 100} barType={'progressbar-progress4'} current={totalFat} goal={target.fat}/>
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