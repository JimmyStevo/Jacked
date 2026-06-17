import React from "react";
import './ProgressBar.css';

const ProgressBar = ({progress}) => {
    
    return(
            <div className="progressbar">
                <div className="progress" style={{width: `${progress}%`}}/>
            </div>
    )


}

export default  ProgressBar