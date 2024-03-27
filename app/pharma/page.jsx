import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'

const page = () => {
  return (
    <div className='min-h-screen bg-gray-100 text-black'>
        <Navbar />
        
        <div className='pt-20'>
          <div className='grid justify-center place-items-center mb-10'>
            <Image src="/pharma.jpg" alt="hm" width="800" height="500"/>
          </div>
          
          <h1 className='font-light  text-xl sm:text-3xl text-center'>Advancing Healthcare Infrastructure in Africa
</h1>
         <p className="text-left text-base font-extralight leading-relaxed max-w-3xl mx-auto py-10 px-5">
We are pleased to provide an update on our ongoing initiative aimed at strengthening healthcare infrastructure across Africa. This foundational project represents a critical first step in our commitment to transforming healthcare delivery on the continent.
While the specifics of this project remain confidential for the time being, we can assure stakeholders of its alignment with addressing some of the most significant challenges currently faced by African healthcare systems. Our efforts are primarily focused on the following key areas:

      </p>

        </div>


      <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 text-black py-11 pt-11 font-extralight pb-11">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white">
        <div className="lg:w-1/2 p-5">
          <ul className='list-disc list-inside text-lg'>
            <li className='font-light'>Enhanced accessibility:
             <p className='font-extralight text-base p-5'>We are actively exploring innovative solutions to ensure equitable access to high-quality healthcare services for all citizens across Africa.</p>
             </li>
            <li className='font-light'>Technological Integration: 
            <p className='font-extralight text-base p-5'>
            Recognizing the transformative potential of technology in healthcare delivery, we are investigating the strategic integration of technology to address specific healthcare needs within the African context.
            </p></li>
            <li className='font-light'>Collaborative Partnerships:
             <p className='font-extralight text-base p-5'>
We firmly believe that fostering collaboration among key stakeholders is essential for building a more robust healthcare system. We are actively establishing partnerships to combine resources and expertise for maximum impact.            </p></li>
          </ul>

          <button className="mt-4 bg-gray-200 text-gray-800 p-3 rounded">Pharma</button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <Image
            alt="defi"
            className="rounded-none hover:scale-105 ease-out duration-500"
            height="400"
            src="/charity.jpg"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
        </div>
      </div>


         <p className="text-left text-base font-extralight leading-relaxed max-w-3xl mx-auto py-20">
We anticipate sharing additional details regarding the project and its anticipated impact in the coming months. We extend our sincere gratitude for your continued interest and support. Together, we can significantly enhance healthcare infrastructure and usher in a brighter future for healthcare in Africa.

      </p>
    </div>
        <Footer />
    </div>
  )
}

export default page