import './Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cards({Title, icon, Description, cardType}){
    return (
        <div className={cardType}>
            <div className='card-icon'>
                <div className='card-icon-content'>
                    <FontAwesomeIcon icon={icon} />
                    <span>{Title}</span>
                    <p className='card-icon-description'>
                        {Description}
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Cards