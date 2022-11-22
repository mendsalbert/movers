/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

import { FaHome } from 'react-icons/fa'

import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navigation = ({ account, setAccount }) => {
    const [nav, setNav] = useState(false)
    
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (

        <div className='w-screen h-[70px] z-10 bg-zinc-900 fixed drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
         <FaHome className=' text-green-500 lg:w-[35px] lg:h-[35px]' />
          <h1 className='text-3xl font-bold text-white mr-4 sm:text-4xl'>MOVERS.</h1>
          <ul className='hidden text-white md:flex'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/properties">Properties</Link></li>
          </ul>
        </div>
        <div className='hidden md:flex pr-4'>
         
         { account ? (
             <a
             className="text-center cursor-pointer items-center px-8 py-2 mx-2 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
             type="submit"
             >
             <span className="text-sm font-medium">
             {account.slice(0, 6) + '...' + account.slice(38, 42)}
             </span>
             </a>
         ) : (
            <a
            className="text-center cursor-pointer items-center px-8 py-2 mx-2 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
            type="submit"
            onClick={connectHandler}
            >
            <span className="text-sm font-medium">
            Connect
            </span>
            </a>
         )

         }
       
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5 text-white' /> : <XIcon className='w-5 text-white' />}
          
        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
        <li className='border-b-2 border-zinc-300 w-full'><Link to="/" onClick={handleClose}>Home</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link to="/properties" onClick={handleClose}>Properties</Link></li>

        <div className='my-4'>
        { account ? (
             <a
             className="text-center cursor-pointer items-center px-8 py-2 mx-2 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
             type="submit"
             >
             <span className="text-sm font-medium">
             {account.slice(0, 6) + '...' + account.slice(38, 42)}
             </span>
             </a>
         ) : (
            <a
            className="text-center cursor-pointer items-center px-8 py-2 mx-2 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
            type="submit"
            onClick={connectHandler}
            >
            <span className="text-sm font-medium">
            Connect
            </span>
            </a>
         )

         }
        </div>
      </ul>
    </div>
    );
}

export default Navigation;