import './Cards.css'

function TitleCards({Title, Description, cardType}){
    return (
        <div className={cardType}>
        <div className='card-icon'>
            <div className='card-icon-image-container'>
                {/* Putting an image for icon here */}
            </div>
            <div className='card-icon-content'>
                <h3 className='card-icon-title'>
                    {Title}
                </h3>
            </div>
        </div>
        </div>
    )    
}

export default TitleCards