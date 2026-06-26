import './Home.css'
import HomeNav from '../../components/NavBar/HomeNav';
import MainButton from '../../components/button/MainButton';
import Cards from '../../components/Cards/Cards';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <HomeNav />
            <div className='home-page-wrapper'>
                <header className='home-header'>
                    <h1>Get ready to get JACKED</h1>
                </header>
            <section className='hero-card-section'>
                <div className='card-container-home'>
                    <Cards
                        Title={'GET JACKED'}
                        icon={null}
                        Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'}
                        cardType={'card-med-large'}
                    />
                </div>
            </section>
            
            <section className='features-section'>
                <h1>FEATURES</h1>
                
                    <Cards
                        Title={'GET JACKED'}
                        icon={null}
                        Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'}
                        cardType={'null'}
                    />
                    <Cards
                        Title={'GET JACKED'}
                        icon={null}
                        Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'}
                        cardType={'card-med-large'}
                    />
                
                <div className='card-container-home'>
                    <Cards
                        Title={'GET JACKED'}
                        icon={null}
                        Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'}
                        cardType={'card-med-large'}
                    />
                    <Cards
                        Title={'GET JACKED'}
                        icon={null}
                        Description={'Track your fitness journey with AI-powered nutrition and workout plans. Transform your body.'}
                        cardType={'card-med-large'}
                    />
                </div>
            </section>

            <section className='ready-section'>
                <h2>READY TO GET JACKED?</h2>
                <p>Start your transformation with AI-powered workout and nutrition tracking.</p>
                <Link to='/signup'>
                    <MainButton label={'SIGN UP NOW'} />
                </Link>
            </section>
        </div>
        </>
    );
}

export default Home;