"use client"

import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

import { db } from '../../../firebseConfig';

export default function Page() {
  const [jobs, setJobs] = useState([]);

    const getJobs = async () => {
    const col = collection(db, "jobs");
    const snapshot = await getDocs(col);
    setJobs(snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }));   
  }

    useEffect(() => {
    getJobs()
  }, [jobs.id])


  return (
    <div className='min-h-screen bg-gray-100'>
      <h1>{jobs.title}</h1>
      <p>{jobs.description}</p>
      
      {/* Render other job details as needed */}
    </div>
  );
}
