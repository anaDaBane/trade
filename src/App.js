import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StockDetailPage } from './pages/StockDetailPage';
import { StockOverviewPage } from './pages/StockOverviewPage';
import { WatchListContextProvider } from './context/watchListContext';
function App() {
  return (
    <main className="App container">
      <WatchListContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<StockOverviewPage/>}></Route>
          <Route path='/detail/:symbol' element={<StockDetailPage/>}></Route>
        </Routes>
      </Router>
      </WatchListContextProvider>

    </main>
  );
}

export default App;
