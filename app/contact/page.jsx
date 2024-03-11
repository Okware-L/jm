import React from 'react'

import Navbar from '../components/Navbar'


const page = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-white py-40'>
      
        <h1 className='text-center text-3xl font-extralight text-black'> CONTACT FORM </h1>
        <div className='p-5 px-20'>
        <p className='text-center font-light text-base text-blue-900 py-10'> We look forward to assisting you with any questions or enquiries you might have, and will respond to your message as soon as possible.</p>

        </div>
    </div>
    </>
  )
}

export default page 