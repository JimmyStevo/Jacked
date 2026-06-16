import './SecondButton.css'

function SecondButton({label, onClick=null}){
    
    return(
        <button className='secondary-button' onClick={onClick}>
            {label}
        </button>
    )
}

export default SecondButton