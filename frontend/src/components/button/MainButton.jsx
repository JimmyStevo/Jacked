import './MainButton.css'

function MainButton({label, onClick=null}){
    
    return(
        <button className='main-button' onClick={onClick}>
            {label}
        </button>
    )
}

export default MainButton