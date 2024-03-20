import React from 'react'
import Create from '../../components/createJob'
import Createdtender from '../../components/createTender'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'



export default function page() {
  return (
    <div className='min-h-screen text-black bg-gray-100 p-5'>
        <Navbar />
        <h1 className='text-center font-light text-3xl pt-40'>Admin !</h1>
        <p className='my-3 text-center '>Welcome to the admin page</p>
        <div className='md:flex grid mx-3'>
        <Create />
        <Createdtender />
        </div>

        <Footer />
    </div>
  )
}
 