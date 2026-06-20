import './MainButton.css'

function MainButton({label, onClick=null, type=null}){
    
    return(
        <button className='main-button' onClick={onClick} type={type}>
            {label}
        </button>
    )
}

export default MainButton