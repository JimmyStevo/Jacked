import { Children } from 'react';
import './Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cards({Title, icon, Description, cardType, children}){
    return (
        <div className={'card-icon ' + cardType}>
                <div className='card-icon-content'>
                    <FontAwesomeIcon icon={icon} />
                    <span>{Title}</span>
                    <p className='card-icon-description'>
                        {Description}
                    </p>
                    {children}
                </div>
        </div>
    )
}


export default Cards