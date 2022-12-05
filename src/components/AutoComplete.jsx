import { useState, useEffect, useContext } from "react";
import { WatchListContext } from "../context/watchListContext";
import finnHub from "../apis/finnHub";
export const AutoComplete = () => {
  const {addStock} = useContext(WatchListContext)
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: search
          }
        }) 
        if (isMounted) {
          setResult(response.data.result)

        }
      } catch (error) {
        console.log(error.response)
      }
      
    }

    if (search.length > 0) {
      fetchData()
    } else if (search.length === 0) {
      setResult([])
    }
    return () => (isMounted = false);
  }, [search])
  return <div className="mx-auto p-5 w-50 rounded">
    <div className="form-floating dropdown">
      <input type="text" placeholder="Search" value={search} onChange={(e)=> setSearch(e.target.value)} style={{backgroundColor: 'rgba(145,158,171,0.04)'}} className="form-control" id='text' autoComplete="off"/>
      <label htmlFor="text">Search</label>
      <ul className={result.length > 0 ? "dropdown-menu show": "dropdown-menu"} style={{height: '500px', cursor:'pointer', overflowX: 'hidden', overflowY: 'scroll'}}>
        {result && result.map((r, i) => {
          return <li className="dropdown-item" key={i} onClick={() => {
            addStock(r.symbol)
            setSearch('')
          } }>{r.description} ({r.symbol})</li>
        })}
      </ul>
    </div>
  </div>
}