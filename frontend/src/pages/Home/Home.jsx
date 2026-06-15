import './Home.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNaviationBar from '../../components/NavBar/SecondNavigationBar';
import MainButton from '../../components/button/MainButton';
import Cards from '../../components/Cards/Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracked, faChartLine, faUtensils, faWeightScale, faDumbbell, faIdCard, faGamepad } from '@fortawesome/free-solid-svg-icons';




const Home = () => {
    const cardData = [
    {Title: "Testing 1", icon: faIdCard, Description: "This is the description #1", cardType: "card-med"},
    {Title: "Testing 2", icon: faIdCard, Description: "This is the description #2", cardType: "card-med"},
    {Title: "Testing 3", icon: faIdCard, Description: "This is the description #3", cardType: "card-med"},
    {Title: "Testing 4", icon: faIdCard, Description: "This is the description #4", cardType: "card-med"}
    ]
    return (
        <>
        <MainNavigationBar/>
        <SecondNaviationBar/>

        <div className='card-container-home-column'>
            <div className='card-container-home'>
                {cardData.map((card, index) => (
                <Cards key={index}
                Title={card.Title}
                Description={card.Description}
                cardType={card.cardType}
                icon={card.icon}
                />))
            }
            </div>
            <div className='card-container-home'>
                <Cards Title={'Todays Macros'} icon={faIdCard} Description={'This is teh place for bar metrics'} cardType={'card-large'}/>
            </div>
            <div className='card-container-home'>
                <Cards Title={'Weight Progress'} icon={faGamepad} Description={'This is the place for bar metrics'} cardType={'card-large'}/>
            </div>
            <div className='card-container-home-largergap'>
                <Cards Title={'Log Weight'} icon={faGamepad} Description={'This is the place for bar metrics'} cardType={'card-med-large'}/>
                <Cards Title={'Weekly Check-in'} icon={faGamepad} Description={'This is the place for bar metrics'} cardType={'card-med-large'}/>
            </div>
        </div>

        </>
    );
}

export default Home;