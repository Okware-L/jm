import React from 'react'
import Navbar from '../components/Navbar'

const page = () => {
  return (
    <div className='min-h-screen bg-white'>
    <Navbar />
    <div className=' py-40'>
        <h1 className='text-center text-3xl font-extralight text-black'> Profile </h1>
        <p className='text-center font-light text-xl text-gray-800'> Wallet address</p>
    </div>        
    </div>

  )
}

export default page