"use client"

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { db } from "../../../../firebseConfig"; // Correct the import path
import { doc, getDoc } from "firebase/firestore";
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import JobApply from '../../../components/jobApply'

const Page = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Comment: Check if router.isReady is true before accessing router.query
  useEffect(() => {
    
      const fetchJob = async () => {
        try {
          if (id) {
            const docRef = doc(db, "jobs", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setJob({ id: docSnap.id, ...docSnap.data() });
            } else {
              setError("Job not found");
            }
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchJob();
    
  }, [id]);

  // Log the id parameter for debugging
  console.log("ID:", id);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container bg-white shadow mx-auto px-4 py-6 pt-40">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : job ? ( // Check if job is not null
            <div className=' text-black'>
              <h1 className="text-3xl font-semibold mb-2 ">{job.title}</h1>
              <p className="text-gray-600 mb-4">{job.employment}</p>
              <p className="text-gray-600 mb-4">{job.location}</p>
              <p className="text-gray-800">{job.description}</p>
              {/* Add more job details here */}
              {/* Add application form */}
              <div>
                <JobApply />
              </div>
            </div>
            
          ) : (
            <p>Job not found</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;