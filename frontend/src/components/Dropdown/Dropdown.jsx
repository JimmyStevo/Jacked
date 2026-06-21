import { useEffect, useRef, useState } from "react"
import './Dropdown.css'


const Dropdown = ({options}) => {
    const[dropdownToggled, setDropdownToggled] = useState(false);
    const[dropdownSelected, setDropdownSelected] = useState(null)

    return(
        <div className="dropdown">
            <button className="toggle" onClick={()=>{
                setDropdownToggled(!dropdownToggled)
            }}>{dropdownSelected ? dropdownSelected : "Select a Unit"}</button>
            
            <div className={`options ${dropdownToggled ? "visible" : ""}`}>
                {options.map((option, index) => (
                    <div key={index} value={option} onClick={()=>{setDropdownSelected(option)}}>{option}</div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown