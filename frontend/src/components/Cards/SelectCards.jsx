import './Cards.css'

function SelectCards({Title, isActive}){
    return (
        <div className={'card-icon-select' + (isActive ? 'active' : '')}>
            <span>{Title}</span>
        </div>
    )    
}

export default SelectCards