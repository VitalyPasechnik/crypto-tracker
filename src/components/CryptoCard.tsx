import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { ICoin } from './../utils/types';
import { Context } from '../../src/app/context/context';

type Props = {
  coin: ICoin;
}

const CryptoCard: React.FC<Props> = ({ coin }) => {
  const { favList, toggleFav } = useContext(Context);
  const [cheched, setChecked] = useState(favList.some((fav: ICoin) => fav.id === coin.id));

  const addFavorites = (coin: ICoin) => {
    if (cheched) {
      setChecked(!cheched)
      toggleFav(coin)
    } else {
      setChecked(!cheched)
      toggleFav(coin)
    }
  }

  return (
    <div className="flex flex-col flex-wrap gap-5 items-center border-2 border-gray-100 rounded-xl shadow-2xl w-60 p-6">
      <Link to={`/crypto/${coin.id}`}>
        <div className="flex flex-col flex-wrap gap-5 items-center">
          <h1 className="w-30 text-center">{coin.name}</h1>
          <img src={coin.image} className="w-10 h-10" alt="coin" />
          <p className="">{coin.current_price} $</p>
          <p className="">{(coin.price_change_percentage_24h)} %</p>
        </div>
      </Link>
      <div>
        {cheched ?
          (
            <button
              className="w-20 h-10 bg-gray-500 rounded text-s border-solid text-white"
              onClick={() => {
                addFavorites(coin)
              }}
            >
              follow
            </button>
          ) : (
            <button 
              className="w-20 h-10 bg-blue-500 rounded border-solid text-white"
              onClick={() => {
                setChecked(!cheched)
                addFavorites(coin)
              }}
            >
            follow
          </button>
          )
        }
        </div>
    </div>
  )
}

export default CryptoCard