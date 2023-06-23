import React, { useContext, useEffect, useState } from 'react'

import { ICoin } from '../../src/utils/types'
import { Context } from '../../src/app/context/context';

import CryptoList from './CryptoList'


const HomePage: React.FC = () => {
  const { coins } = useContext(Context);
  
  const [query, setQuery] = useState('');

  const [cryptos, setCryptos] = useState<ICoin[]>(coins);

  useEffect(() => {
    setCryptos(coins)

    if (query.length > 0) {
      console.log('query exist');
      return setCryptos(coins.filter((coin: ICoin) => coin.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setCryptos(coins)
    }
  }, [coins, query]);
  
  return (
    <>
      <div className="flex justify-center">
        <input className="flex justify-center border-2 my-8 border-indigo-500/100 rounded-m p-2" type="text" placeholder="Search a coin" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        <img
          src="https://cdn-icons-png.flaticon.com/512/348/348601.png"
          alt="search"
          className="flex justify-center border-2 my-8 border-indigo-500/100 rounded-m p-1 h-11 w-11"
        />
      </div>
      

      {cryptos.length > 0 && (
        <CryptoList cryptos={cryptos} />
      )}
    </>
  )
}

export default HomePage
