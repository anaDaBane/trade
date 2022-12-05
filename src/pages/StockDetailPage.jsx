import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import finnHub from '../apis/finnHub'
import StockChart from "../components/StockChart"
const formatData = data => {
  return data.t.map((d,i) => {
    return {
      x: (d * 1000),
      y: (data.c[i]).toFixed(2)
    } 
  })
}



export const StockDetailPage = () => {
  const [chartData, setChartData] = useState();
  const {symbol} = useParams()
  const date = new Date()
  const currentTime = Math.floor(date.getTime()/1000)
  let oneDay = currentTime - 24*60*60
  if (date.getDay() === 6) {
    oneDay = currentTime - 2*24*60*60
  } else if (date.getDay() === 0) {
    oneDay = currentTime - 3*24*60*60
  } else if (date.getDay() === 1){
    oneDay = currentTime - 4*24*60*60
  }
  const oneWeek = currentTime - 7*24*60*60
  const oneYear = currentTime - 365*24*60*60
  
  useEffect(()=> {
    const fetchData = async () => {
      
      try {
        const responses = await Promise.all([finnHub.get('/stock/candle', {
          params: {
            symbol,
            from: oneDay,
            to: currentTime,
            resolution: 30
          }
        }), finnHub.get('/stock/candle', {
          params: {
            symbol,
            from: oneWeek,
            to: currentTime,
            resolution: 60
          }
        }), finnHub.get('/stock/candle', {
          params: {
            symbol,
            from: oneYear,
            to: currentTime,
            resolution: 'W'
          }
        })])
        const[responseDay,responseWeek,responseYear] = responses
        setChartData({
          day: formatData(responseDay.data),
          week: formatData(responseWeek.data),
          year: formatData(responseYear.data)
        })
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [symbol])
  return <h1>{
    chartData && <StockChart chartData={chartData} symbol={symbol}/>
  }
  </h1>
  
}