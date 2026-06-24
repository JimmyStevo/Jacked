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
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            const week = days.map((day, i) => {
                const entry = data.find(d => new Date(d.date).getDay() === i + 1)
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
            <LineChart width={500} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day"/>
                <YAxis />
                <Tooltip />
                <Line type={"monotone"} dataKey="weight" stroke="red" connectNulls={false}/>
            </LineChart>
        </div>
    )
}

export default LineGraph