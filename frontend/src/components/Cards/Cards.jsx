import './Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cards({Title, icon, Description, cardType, children}){
    return (
        <div className={'card-icon ' + cardType}>
            <div className='card-icon-row'>
                <FontAwesomeIcon icon={icon} />    
                <h2>{Title}</h2>
            </div>
                    <h1 className='card-icon-description'>
                        {Description}
                    </h1>
                    {children}

        </div>
    )
}


export default Cards