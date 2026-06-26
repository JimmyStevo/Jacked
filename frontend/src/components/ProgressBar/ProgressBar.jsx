import React from "react";
import './ProgressBar.css';

const ProgressBar = ({progress, barType, current, goal}) => {
    
    return(
        <div className="progressbar-wrap">
            <div className="progressbar-wrap span">
            <span>{current} / {goal}</span>
            <div className={"progressbar"}>
                <div className={`progress  ${barType}`} style={{width: `${progress}%`}}/>
            </div>
        </div>
        </div>
    )

}

export default  ProgressBar