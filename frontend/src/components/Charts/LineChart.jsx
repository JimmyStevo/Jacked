import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import './LineChart.css'
import { getWeightLogging } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
 
 
const LineGraph = () => {
    const { token } = useAuth()
    const [ chartData, setChartData ] = useState([])
 
    useEffect(() => {
        getWeightLogging(token).then(data => {
            const dataArray = Array.isArray(data) ? data : [];
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            const week = days.map((day, i) => {
                const entry = dataArray.find(d => {
                    const day = new Date(d.date).getDay()
                    return day === (i === 6 ? 0 : i + 1)
                })
                return{
                    day: day,
                    weight : entry ? entry.weight : null
                }
            })
            setChartData(week)
        })
    }, [token])
 
    return (
        <div className="linegraph-body">
            <LineChart style={{ width: '100%', aspectRatio: 3, maxWidth: 1800, margin: 'auto' }} responsive data={chartData} >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)"/>
                <XAxis dataKey="day" stroke="white"/>
                <YAxis stroke="white"/>
                <Tooltip />
                <Line
        type="monotone"
        dataKey="weight"
        stroke="red"
        dot={{
          fill: 'red',
        }}
        activeDot={{
          stroke: 'red',
        }}
      />
            </LineChart>
        </div>
    )
}
 
export default LineGraph