import './Home.css'
import HomeNavBar from '../../components/NavBar/HomeNav';
import MainButton from '../../components/button/MainButton';
import Cards from '../../components/Cards/Cards';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUtensils,
    faDumbbell,
    faWeightScale,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';

/* Feature data */
const features = [
    {
        icon: faUtensils,
        title: 'Nutrition Tracking',
        description:
            'Log every meal and see your macros in real time. Search thousands of foods from the Open Food Facts database.',
    },
    {
        icon: faDumbbell,
        title: 'Workout Logging',
        description:
            'Record sets, reps and weights for every session. Build custom routines and track your progress over time.',
    },
    {
        icon: faWeightScale,
        title: 'Weight Tracking',
        description:
            'Log your weight daily and visualise your trend week by week. Stay consistent and watch the results.',
    },
    {
        icon: faChartLine,
        title: 'Progress Overview',
        description:
            'All your data in one place. See calories, macros, workouts and weight in a single dashboard.',
    },
];

const Home = () => {
    return (
        <>
            <HomeNavBar />
            <div className="home-page-wrapper">
 
                {/* ── HERO ── */}
                <header className="home-header">
                    <h1>Get ready to get JACKED</h1>
                </header>
 
                <section className="home-hero-card">
                    <div className="home-hero-body">
                        <h2>Your fitness journey starts here</h2>
                        <p>
                            AI-powered nutrition and workout tracking built to help you
                            transform your body. Log food, track workouts, monitor weight
                            — all in one place.
                        </p>
                        <Link to="/signup">
                            <MainButton label="START YOUR JOURNEY" />
                        </Link>
                    </div>
                </section>
 
                {/* ── FEATURES ── */}
                <section className="features-section">
                    <h1>FEATURES</h1>
                    <div className="feature-card-grid">
                        {features.map((f, i) => (
                            <div className="feature-card" key={i}>
                                <div className="feature-card-header">
                                    <div className="feature-card-icon">
                                        <FontAwesomeIcon icon={f.icon} />
                                    </div>
                                    <h3 className="feature-card-title">{f.title}</h3>
                                </div>
                                <p className="feature-card-description">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
 
                {/* ── CTA ── */}
                <section className="ready-section">
                    <h2>READY TO GET JACKED?</h2>
                    <p>
                        Start your transformation with AI-powered workout and nutrition
                        tracking.
                    </p>
                    <Link to="/signup">
                        <MainButton label="SIGN UP NOW" />
                    </Link>
                </section>
 
            </div>
        </>
    );
};
 
export default Home;