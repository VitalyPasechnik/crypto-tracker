import React, { useContext } from 'react'
import CryptoCard from './CryptoCard'

import { ICoin } from '../../src/utils/types'
import { Context } from '../../src/app/context/context';

const FavoriteList: React.FC = () => {

  const { favList } = useContext(Context);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-4 h-500 bg-white-500 p-5">
        <ul className="flex flex-wrap justify-center gap-4 w-[80%]">
         {favList.length > 0 && (
          favList.map((coin: ICoin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))
        )}
        </ul>
      </div>
    </>
  )
}


export default FavoriteList