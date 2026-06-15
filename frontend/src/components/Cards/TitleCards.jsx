import './Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TitleCards({Title, icon, children}){
    return (
        <div className='card-icon-title'>
            <FontAwesomeIcon icon={icon} />
            <span>{Title}</span>
            {children}
        </div>
    )    
}

export default TitleCards