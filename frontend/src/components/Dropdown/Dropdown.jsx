import { useEffect, useRef, useState } from "react"
import './Dropdown.css'

// DROPDOWN COMPONENT 
const Dropdown = ({options, onChange, value}) => {
    const[dropdownToggled, setDropdownToggled] = useState(false);
    const[dropdownSelected, setDropdownSelected] = useState(value || null)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target))
                setDropdownToggled(false)
        }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
    },[])

    useEffect(() => {
        if (value) setDropdownSelected(value)
    }, [value])


// SETS THE SELECT ITEM AS VISIBLE TEXT IN PLACE OF PLACEHOLDER AND CLOSES THE DROPDOWN SELECTION WHEN USER CLICKS OUTSIDE
    return(
        <div className="dropdown" ref={dropdownRef}>
            <button className="toggle" onClick={()=>{
                setDropdownToggled(!dropdownToggled) // OPENS DROPDOWN 
            }}>{dropdownSelected ? dropdownSelected : "Select a Unit"}</button>
            
            <div className={`options ${dropdownToggled ? "visible" : ""}`}>
                {options.map((option, index) => (
                    <div key={index} value={option} onClick={()=>{
                        setDropdownSelected(option)
                        setDropdownToggled(false)
                        onChange(option)
                    }}>{option}</div> 
                ))}
            </div>
        </div>
    )
}

export default Dropdown