import './TertiaryNavigationBar.css';
import MainButton from '../button/MainButton'
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import TitleCards from '../Cards/TitleCards';
import SelectCards from '../Cards/SelectCards';

const TertiaryNavigationBar = ({ activeTab, setActiveTab }) => {
    return(
        <nav className='tertiary-navbar'>
            <div className='tertiary-navbar-center'>
                <ul className='nav-links'>
                    <li onClick={()=> setActiveTab('upperbody')}>
                        <SelectCards Title={"UPPER BODY"} isActive={activeTab === 'upperbody'}/>
                    </li>
                    <li onClick={()=> setActiveTab('lowerbody')}>
                        <SelectCards Title={"LOWER BODY"} isActive={activeTab === 'lowerbody'}/>
                    </li>
                    <li onClick={()=> setActiveTab('rest')}>
                        <SelectCards Title={"REST"} isActive={activeTab === 'rest'}/>
                    </li>
                    <li onClick={()=> setActiveTab('push')}>
                        <SelectCards Title={"PUSH"} isActive={activeTab === 'push'}/>
                    </li>
                    <li onClick={()=> setActiveTab('pull')}>
                        <SelectCards Title={"PULL"} isActive={activeTab === 'pull'}/>                    
                    </li>
                    <li onClick={()=> setActiveTab('legs')}>
                        <SelectCards Title={"LEGS"} isActive={activeTab === 'legs'}/>                    
                    </li>
                    <li onClick={()=> setActiveTab('rest')}>
                        <SelectCards Title={"REST"} isActive={activeTab === 'rest'}/>
                    </li>
                </ul>

            </div>
        </nav>
    )
}



export default TertiaryNavigationBar