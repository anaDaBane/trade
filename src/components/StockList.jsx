import { useState, useEffect } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";
import finnHub from "../apis/finnHub";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export const StockList = () => {
  const {watchList, deleteStock} = useContext(WatchListContext)
  
  const [stock, setStock] = useState();
  
  const renderIcon = (data) => {
    return (data > 0 ? <BsChevronUp/>: <BsChevronDown/>)
  }

  const changeColor = (data) => {
    return (data > 0 ? 'text-success' : 'text-danger')
  }
  useEffect(() => {
    let isMounted = true; // important step
    const fetchData = async () => {
      let responses = []
      try {
        responses = await Promise.all(watchList.map(stock => {
          return (
            finnHub.get('/quote', {
              params: {
                symbol: stock
              }
            })
          )
        })
        )
        
        const datas = responses.map(el => {
          return {
            data: el.data,
            symbol: el.config.params.symbol
          }
        })
        
        if (isMounted) { // important step
          setStock(datas)
        }
      } catch (error) {
        console.log(error.response) 
      }

    } 
    fetchData();
    return () => (isMounted = false); // Important step
  }, [watchList])

  const navigate = useNavigate()
  const handleSelectRow = (symbol)=> {
    navigate(`detail/${symbol}`)
  }
  return <div>
    <table className="table table-hover mt-5">
      <thead style={{color: 'rgb(79,89,102)'}}>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chg</th>
          <th scope="col">Chg%</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">Pclose</th>
        </tr>
      </thead>
      <tbody>
        {stock && stock.map(stockData => {
          return (
            <tr className="table-row" key={stockData.symbol} style={{cursor: 'pointer'}}>
              <th onClick={()=> handleSelectRow(stockData.symbol)} scope="row" onClick={()=> handleSelectRow(stockData.symbol)}>{stockData.symbol}</th>
              <td onClick={()=> handleSelectRow(stockData.symbol)}>{stockData.data.c}</td>
              <td onClick={()=> handleSelectRow(stockData.symbol)} className={changeColor(stockData.data.d)}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
              <td onClick={()=> handleSelectRow(stockData.symbol)} className={changeColor(stockData.data.dp)}>{stockData.data.dp} {renderIcon(stockData.data.dp)}</td>
              <td onClick={()=> handleSelectRow(stockData.symbol)}>{stockData.data.h}</td>
              <td onClick={()=> handleSelectRow(stockData.symbol)}>{stockData.data.l}</td>
              <td onClick={()=> handleSelectRow(stockData.symbol)}>{stockData.data.o}</td>
              <td>{stockData.data.pc} <button className="btn btn-danger btn-sm ms-5" onClick={() => deleteStock(stockData.symbol)}>Remove</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
}