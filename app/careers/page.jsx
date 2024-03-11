import React from 'react'
import {jobsData} from '../../jobs'
import Navbar from '../../components/Navbar'
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const page = () => {
  return (
    <>
   
    <div className='min-h-screen bg-gray-100'>
      <Navbar/>

          <div className="w-full pt-40 sm:text">
      <div className="container grid max-w-6xl gap-6 px-4 py-6 lg:gap-10 lg:px-6 lg:py-12 ">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-light tracking-tighter sm:text-5xl text-black">Find your dream job</h1>
            <p className="max-w-3xl text-gray-900 font-extralight last:md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Search for jobs and internships. Discover the companies and roles that are right for you.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input id="search" placeholder="Search for jobs" />
            </div>
            <div className="flex items-center space-x-2">
              <button className='btn btn-wide '>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full space-y-2 sm:space-y-6 px-5">

          {jobsData.map((job, index) => (
      <div 
      key={index}
      className="grid ">
        
        <Card >
          <CardContent className="grid gap-4 p-5">
            <div>
              <h3 className="text-2xl font-light">{job.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{job.role}</p>
            </div>
            <div className="grid gap-2 hidden md:block">
              <div>
                <h4 className="font-semibold">Location;</h4>
                <p>{job.location}</p>
              </div>
              <div>
                <h4 className="font-semibold">Employment Type;</h4>
                <p>{job.employment}</p>
              </div>
            </div>
            <div className='hidden md:block'>
              <h4 className="font-semibold">Description</h4>
              <p className="text-gray-500 dark:text-gray-400">
              {job.description}
              </p>
            </div>
          </CardContent>
          <CardFooter className='hidden md:flex'>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  alt="Company logo"
                  className="rounded-full"
                  height="40"
                  src="/jmlogoblack.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="text-sm font-medium">
                  <h4>JM-Qafri Methuselah</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We're on a mission to make finance more accessible.
                  </p>
                </div>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium mx-5"
                href="#"
              >
                Apply
              </Link>
            </div>
          </CardFooter>
        </Card>
        
      </div>
      ))}
    </div>
    </div>
     </>
  )
}

export default page