import './SecondButton.css'

function SecondButton({label, onClick=null, type=null}){
    
    return(
        <button className='secondary-button' onClick={onClick} type={type}>
            {label}
        </button>
    )
}

export default SecondButton