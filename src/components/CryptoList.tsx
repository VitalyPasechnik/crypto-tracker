import React from 'react'

import { ICoin } from '../../src/utils/types'

import CryptoCard from './CryptoCard'

type Props = {
  cryptos: ICoin[];
}

const CryptoList: React.FC<Props> = ({ cryptos }) => {
  
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-4 h-500 bg-white-500 w-full p-5">
        <ul className="flex flex-row flex-wrap justify-center gap-4 max-w-[80%]">
         {cryptos.length > 0 && (
            cryptos.map((coin: ICoin) => (
              <CryptoCard key={coin.id} coin={coin} />
            ))
          )}
        </ul>
      </div>
    </>
  )
}

export default CryptoList
