"use client"

import { useState, useEffect } from 'react';
import { contents } from '../data';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Trigger fade animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
        setFade(false); // Reset fade animation after content change
      }, 300); // Wait for 500 milliseconds for the fade animation
    }, 8000); // Change the content every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='bg-gray-100 hero' style={{backgroundImage: 'url(./placeholder2.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
    <div className="h-[95vh] flex items-center justify-center  text-white">
      <div className="text-center">
        <div className={`mb-8 transition-opacity duration-800 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-5xl  mb-2">{contents[currentIndex].heading}</h1>
          <p className="text-base font-light">{contents[currentIndex].text}</p>
          
        </div>
          <button className="btn btn-wide rounded-none text-sm transition duration-500 ease-in-out text-white hover:scale-105">
          Discover More
          </button>

      </div>
    </div>
    </section>
  );
}
