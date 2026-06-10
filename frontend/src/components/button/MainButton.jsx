import './MainButton.css'

function Button({label}){
    
    return(
        <button className='main-button'>
            {label}
        </button>
    )
}

export default Button