import React, { useState } from "react";
import Plot from "react-plotly.js"
import './LineChart.css'


const LineGraph = (dataArray) => {

dataArray = [10, 20, 30, 10];

    const [currentDate] = useState(new Date());

    const findWeek = () => {
        const currentWeek = [];

        for (let i = 0; i < 7; i++){
            const day = new Date(currentDate)
            day.setDate(currentDate.getDate() + i);
            currentWeek.push(day);
        }
        return currentWeek
    };
    
    const Chartdata = [
        {
            x: findWeek(),
            y: dataArray,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red'}

    }];

    const layout = {
        title: {
            text: '',
            font: { size: 24, color: '#333'}
        },
        autosize: true,
        margin: {t: 40, r: 20, l: 40, b: 40},
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };



return(
    <div className="linegraph-body">
        <Plot data={Chartdata}/>
    </div>
);
};

export default LineGraph