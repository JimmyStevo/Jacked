import React from "react";
import './ProgressBar.css';

const ProgressBar = ({progress, barType}) => {
    
    return(
            <div className={"progressbar" + barType}>
                <div className="progress" style={{width: `${progress}%`}}/>
            </div>
    )

}

export default  ProgressBar