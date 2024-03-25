import React from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AcquisitionsForm from '../../components/AcquisitionsForm'

const AcquisitionsPage = () => {
    return (
        <div className='min-h-screen bg-gray-100'>
            <Navbar />
            <div className='p-5 pt-40 text-black'>
                <div className='flex justify-center items-center'>
                    <Image src="/acquisitions.jpg" alt="Acquisitions" width="700" height="400"/>
                </div>
                
                <h1 className='text-center text-5xl font-extralight mb-8 my-5'>Explore Business Acquisitions</h1>
                
                {/* Introduction */}
                <div className='mb-8 mt-5'>
                    <p className='text-normal font-extralight'>
                        Our members can explore exciting opportunities to buy or sell businesses. Whether you are looking to expand your portfolio or ready to embark on a new venture, we provide a seamless platform for you to connect with potential buyers or sellers. Our dedicated team understands the importance of a comprehensive due diligence process to ensure a successful transaction. Through diligent evaluation and analysis, we aim to provide a transparent and reliable environment where you can make informed decisions. Join our community today and unlock a world of possibilities for your business aspirations.
                    </p>
                </div>


                {/* Submission Form */}
                <AcquisitionsForm />
                
            </div>
            <Footer />
        </div>
    );
}

export default AcquisitionsPage;
