import React from 'react'
import {jobsData} from '../../jobs'

const page = () => {
  return (
    <div className=" mx-auto p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Join Our Team</h1>
      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {jobsData.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{job.title}</h2>
              <p className="text-gray-600 mb-4">{job.location}</p>
              <p className="text-gray-700">{job.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page