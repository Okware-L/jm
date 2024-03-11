import React from 'react'
import {jobsData} from '../../jobs'
import Navbar from '../components/Navbar'

const page = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar/>
    <div className=" mx-auto p-8 py-40">
      <h1 className="text-3xl font-light mb-8 text-center text-black ">Join Our Team</h1>


      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">

        <div className="p-6 bg-gray-900 rounded">
          <h2 className="text-xl font-bold mb-2 text-gray-100">Tenders</h2>
            <p className="text-gray-100 mb-4 hover:text-sky-300">See Available tenders up for grabs.</p>
        </div>

        {jobsData.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{job.title}</h2>
              <p className="text-gray-600 mb-4">{job.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default page