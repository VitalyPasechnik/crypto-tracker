import React, { useState } from 'react'
import { ethers } from "ethers";

import { ExternalProvider } from '@ethersproject/providers'

import { Link } from 'react-router-dom'

declare global {
  interface Window {
    ethereum: any
  }
}

function Navbar() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  const getBalance = (login: string) => {
    window.ethereum
      .request({ 
        method: 'eth_getBalance',
        params: [login, 'latest'],
       })
      .then((sum: any) => {
        setBalance(sum);
    })
  }

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((login: any) => {
          setAccount(login);
          getBalance(login[0])
        })
    } else {
      alert('setup Metamask')
    }
  }

  return (
    <div className="h-50 bg-gray-500 p-5 flex flex-row justify-between flex-wrap ">
      <Link className="p-2 text-white" to="/">
        <h1 className="text-white uppercase p-2">Crypto Tracker</h1>
      </Link>
      
      <div className="flex flex-row justify-between items-center">
        <Link className="p-2 text-white uppercase" to="/">Home</Link>
        <Link className="p-2 text-white uppercase" to="/favoriteList">Favorites list</Link>
      </div>
      
      <div className="p-2 flex flex-row gap-5 items-center">
        {account && (
          <div className="flex flex-col gap-1">
            <p  className="text-white">user: {account}</p>
            <p  className="text-white">balance: {balance} $</p>
          </div>
        )}

        <button onClick={() => connectWalletHandler()} className="text-white p-2 border-2 rounded-xl">
          {account ? 'LogOut' : 'Metamask Login'}
        </button>

        <img
          className="h-10 w-10 rounded-full"
          src='https://avatars.design/wp-content/uploads/2021/02/corporate-avatars-TN-1.jpg'
          alt="avatar"
        />
        {/* <CoinSearch /> */}
      </div>
    </div>
  )
}

export default Navbar
