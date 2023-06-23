import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import { ICoin } from './utils/types';
import { Context } from '../src/app/context/context';

import { HomePage, FavoriteList, CryptoDetails, Navbar } from './components';
import './App.css';

const App: React.FC = () => {
  const [coins, setCoins] = useState<ICoin[]>([])
  const [favList, setFavList] = useState<ICoin[]>([]);

  const loadingCoins = async () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&locale=en';
        axios.get(url).then(res => {
      setCoins(res.data);
    })
  }
  
  const loadingLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    
    if (favorites !== null) {
      setFavList(JSON.parse(favorites));
    }
  };
  
  const toggleFav = (coin: ICoin) => {
    if (favList.some((fav: ICoin) => fav.id === coin.id)) {
      setFavList(favList.filter((fav: ICoin) => fav.id !== coin.id));
    } else {
      favList.push(coin);
    }

    localStorage.setItem('favorites', JSON.stringify(favList));
  };

  useEffect(() => {
    loadingCoins();
    loadingLocalStorage();
  }, []);
 
  return (
    <Context.Provider value={{
      coins,
      setCoins,
      favList,
      setFavList,
      toggleFav,
    }}
    >
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
      <div className="main">

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route path="/favoriteList" element={<FavoriteList />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>

    </div>
  </div>

  </Context.Provider>

  )
}

export default App;