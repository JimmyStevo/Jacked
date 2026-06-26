import React, { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import './PieChart.css'
import { getWeightLogging } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const RadialChart = () => {
    const { token } = useAuth()
    const [ radialchartData, setRadialchartData]

useEffect(() => {

}, [token])

const style ={
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px', 
};

return(
    <div className="radialchart-body">
        <RadialBarChart style={{width: '100%', height='100%', aspectRatio: 1}} resposinve>

        </RadialBarChart>
    </div>
)


}

export default RadialChart