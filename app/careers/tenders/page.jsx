// pages/tenders.js

import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { CardFooter } from "@/components/ui/card"
import Image from 'next/image';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"



const TenderItem = ({ category, description, items, badge }) => (
  <div className="mb-8 ">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">{category}</h2>
        <Badge>{badge}</Badge>
      </div>
      
      <p className=" text-gray-600 mb-4 p-5">{description}</p>
      <div className="sm:grid sm:grid-cols-4 gap-2 shadow-inner p-5 bg-gray-100 hidden">
        {items.map((item, index) => (
          <div key={index}>
            <p className="font-light text-sm">.{item}</p>
          </div>
        ))}
      </div>

          <CardFooter className='hidden md:flex my-5'>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
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
                    Support system for you and your business.
                  </p>
                </div>
              </div>

            </div>
          </CardFooter>

      <div className='flex flex-col'>
<Drawer >
  <DrawerTrigger className='md:hidden text-start'>See list</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>{category}</DrawerTitle>
      <DrawerDescription>{description}</DrawerDescription>
    </DrawerHeader>
      <div className="grid gap-2 shadow-inner p-5">
        {items.map((item, index) => (
          <div key={index}>
            <p className="font-light text-sm">.{item}</p>
          </div>
        ))}
      </div>
    <DrawerFooter>
      <DrawerClose>
        <button className='btn btn-wide'>Close</button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

      <button className='btn btn-wide my-2 hover:animate-bounce'>Apply</button>
      </div>

    </div>
    
  </div>
);


const TendersPage = () => {
  const tenders = [
    {
      category: 'Pharmaceuticals',
       description: 'This category includes tenders for pharmaceutical products such as medications and medical supplies.',
       badge: 'pharma',
      items: [
        'Paracetamol',
        'Artemether lumefantrine',
        'Piriton',
        'Flagyl',
        'Brufen',
        'Actal',
        'Indomethacin',
        'Diclofenac',
        'Amoxicillin',
        'Blood builders',
        'Meloxicam',
        'Aceclofenac',
        'Augmentin',
        'Ampiclox',
        'Flucloxacillin',
        'Etricox',
      ],
    },
    {
      category: 'Mining',
       description: 'This category includes tenders for Mining supplies.',
       badge: 'mine',
      items: [
        'Crusher of 5ton/hrs',
        'jaw crusher',
        'electrical machine',
        'compressor machine',
        'faw truck of 15ton',
        'roll machine or rift machine special for stone',
      ],
    },
    {
      category: 'Pharma manufacturing',
       description: 'This category includes tenders for pharmaceutical products and medical supplies.',
       badge: 'pharma',
      items: [
        'Phenol',
        'Nitric acid',
        'Acetic acid or acetic anhydride',
        'Reducing agent: Sodium borohydride',
        'Excipients',
        'Coating materials',
        'Mass mixer',
        'Granulator',
        'Drying oven',
        'Tableting machine',
        'Tray dryer',
        'Cone blender',
        'Strip packaging',
      ],
    },
    {

        category: 'Farm -Processing',
         description: 'This category includes tenders for farming products and supplies.',
         badge: 'farming',
        items: [
        'Conveyor belts',
        'Washing tanks',
        'Sorting machine (to remove damaged or unripe tomatoes)',
        'Grading machine (to separate tomatoes by size)',
        'Blanching machine',
        'Peeling machine',
        'Juicing machine',
        'Pulping machine',
        'Evaporators (such as falling film or forced circulation evaporators)',
        'Concentrators',
        'Pasteurization tank or tunnel',
        'Filling machine (for filling into containers)',
        'Packaging machine (for pouches, cans, or jars)',
        'Sealing machine (for sealing containers)',
        'Capping machine (for jars or bottles)',
        'Labeling machine',
        'Sterilization equipment for packaging (if necessary)',
        'Industrial steel Tanks',
        'Palletizing equipment',
        'Conveyors for transportation within the plant',
        'Boilers (for steam generation)',
        'Chillers or refrigeration units (for cooling)',
        'Compressors (for air supply)',
        'Water treatment systems',
        'Laboratory equipment for testing pH, viscosity, and other parameters',
        'Water purification system',
        'Power generators (backup power)',
        'Fire suppression systems',
        'Personal protective equipment for workers',
        'Waste disposal equipment',
        'Recycling systems (for materials like packaging)',
        'Programmable Logic Controllers (PLCs)',
        'Human Machine Interface (HMI) panels',
        'Sensors for monitoring temperature, pressure, etc.',
        'Tools and equipment for regular maintenance and repair of machinery',
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100 '>
      <Navbar />
    <div className="min-h-screen bg-gray-100 px-5 py-8 text-black">


    <div className="w-full pt-20 sm:text">
      <div className="container grid max-w-6xl gap-6 px-4 py-6 lg:gap-10 lg:px-6 lg:py-12 ">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-light tracking-tighter sm:text-5xl text-black">JM-Qafri Methuselah tenders.</h1>
            <p className="max-w-3xl text-gray-900 font-extralight last:md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
               Welcome to our tenders section where you can explore various opportunities for procurement and partnerships. Below are the categories of tenders currently available.
            </p>
            <div className='text-black py-5'>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input id="search" placeholder="Search for tenders" />
            </div>
            <div className="flex items-center space-x-2">
              <button className='btn btn-wide '>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {tenders.map((tender, index) => (
        <TenderItem
          key={index}
          category={tender.category}
          description={tender.description}
          items={tender.items}
          badge={tender.badge}
        />
      ))}

    </div>
     <Footer />
    </div>
  );
};

export default TendersPage;
