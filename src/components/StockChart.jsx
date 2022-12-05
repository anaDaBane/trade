import { configure } from '@testing-library/react';
import React, {useState} from 'react' 
import Chart from "react-apexcharts";
export default function StockChart({chartData, symbol}) {
  const {day, week, year} = chartData;
  const [dateFormat, setDateFormat] = useState('24h')
  const determineColor = () => {
    if (dateFormat === '24h') {
      if (chartData.day[chartData.day.length-1].y - chartData.day[0].y > 0) {
        return '#FF0000'
      } else {
        return '#00FF00'
      }
    } else if (dateFormat === '1w') {
      if (chartData.week[chartData.week.length-1].y - chartData.week[0].y > 0) {
        return '#FF0000'
      } else {
        return '#00FF00'
      }
    } else {
      if (chartData.year[chartData.year.length-1].y - chartData.year[0].y > 0) {
        return '#00FF00'
      } else {
        return '#FF0000'
      }
    }
    
  }

  const option = {
    colors: [determineColor()],
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontS : '24px'  
      }
    },
    chart: {
      id: 'stock data',
      animation: {
        speed: 1300
      }
      
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }
  const configure = () => {
    switch (dateFormat) {
      case '24h':
        return day;
      case '1w':
        return week;
      case '1y':
        return year;
      default:
        return day;
    }
  }
  const series = [{
    name: symbol,
    data: configure()
  }]

  
  return (
    <div className='mt-5 p-4 shadow-sm bg-white'>
      <Chart options={option} series={series} type='area' width='100%'/>
      <div>
        <button onClick={()=>{
          setDateFormat('24h')
          }} className={dateFormat==='24h'? 'btn btn-primary': 'btn btn-outline-primary'}>24h</button>
        <button onClick={()=>setDateFormat('1w')} className={dateFormat==='1w'? 'btn btn-primary ms-2':'btn btn-outline-primary ms-2'}>1w</button>
        <button onClick={()=>setDateFormat('1y')} className={dateFormat==='1y'? 'btn btn-primary ms-2': 'btn btn-outline-primary ms-2'}>1y</button>
      </div>
    </div>
    
  )
}
