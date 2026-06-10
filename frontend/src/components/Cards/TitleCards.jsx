import './Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TitleCards({Title, icon}){
    return (
        <div className='card-icon-title'>
            <FontAwesomeIcon icon={icon} />
            <span>{Title}</span>
        </div>
    )    
}

export default TitleCards