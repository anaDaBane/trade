import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = ({children}) => {
  const [watchList, setWatchList] = useState([]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock)=== -1) {
      setWatchList([...watchList,String(stock)])
    } 
  }

  const deleteStock = (stock) => {
    setWatchList(watchList.filter(el => el !== String(stock)))

  }
  return (
    <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
      {children}
    </WatchListContext.Provider>
  )
}