import React from 'react'

import Navbar from '../../components/Navbar'
import Contact from '../../components/contact'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'


const page = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-gray-100 py-40 px-5'>

        <h1 className='text-center text-3xl font-extralight text-black py-5'> CONTACT FORM </h1>
        <div className='p-5 px-20'>


        </div>
        <div className='sm:mx-10'>
          <Contact/>
        </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default page 


function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}