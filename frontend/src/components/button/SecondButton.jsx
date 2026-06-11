import './SecondButton.css'

function Button({label}){
    
    return(
        <button className='secondary-button'>
            {label}
        </button>
    )
}

export default Button