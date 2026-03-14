import React from 'react';
import Image from 'next/image';
import Footer from '../../components/Footer';
import AcquisitionsForm from '../../components/AcquisitionsForm';
import Navbar from "../../components/Navbar"

const AcquisitionsPage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar scrollThreshold={50}/>
      <div className='p-5 pt-40 text-black'>
        <div className='flex justify-center items-center'>
          <Image src="/acquisitions.jpg" alt="Acquisitions & Valuation" width="700" height="400" />
        </div>

        <h1 className='text-center text-5xl font-extralight mb-8 my-5'>
          Explore Business Acquisitions & Valuation
        </h1>

        <div className='mb-8 mt-5'>
          <p className='text-normal font-extralight'>
            Our members can explore exciting opportunities to buy or sell businesses, or request accurate business valuations.
            Whether you are looking to expand your portfolio, sell your company, or understand your business&apos;s worth,
            we provide a seamless platform to support your goals. Our dedicated team ensures a comprehensive due diligence
            process and trusted valuation framework, so you can make informed, confident decisions.
            Upload your key documents and let us help guide your next strategic move.
          </p>
        </div>

        <AcquisitionsForm />
      </div>
      <Footer />
    </div>
  );
};

export default AcquisitionsPage;
