import React from "react";
import './ProgressBar.css';

// progress bar to be used in instances user needs visual
// representation of progress to goals

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