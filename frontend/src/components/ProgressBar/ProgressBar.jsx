import React from "react";
import './ProgressBar.css';

const ProgressBar = ({progress, barType}) => {
    
    return(
            <div className={"progressbar"}>
                <div className={`progress  ${barType}`} style={{width: `${progress}%`}}/>
            </div>
    )

}

export default  ProgressBar