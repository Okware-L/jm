import React from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export default function page() {
  return (
    <div className='min-h-screen bg-gray-100'>
        <Navbar />
        <div className='bg-white text-black pt-40'>
            <h1 className='text-center sm:text-5xl text-3xl font-extralight'>Submissions</h1>
            <p className='text-center font-light'> No current submissions</p>
        </div>
        <Footer />
    </div>
  )
}
