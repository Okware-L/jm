// pages/jobApply.js

import React, { useState } from 'react';
import { db } from '../firebseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const JobApply = () => {
  const [application, setApplication] = useState({
    fullName: '',
    email: '',
    experience: '',
    resumeLink: '',
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication((prevApplication) => ({
      ...prevApplication,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const col = collection(db, 'jobApplications');
    try {
      await addDoc(col, {
        fullName: application.fullName,
        email: application.email,
        experience: application.experience,
        resumeLink: application.resumeLink,
        coverLetter: application.coverLetter,
      });
      toast('Application submitted successfully', {
        variant: 'success',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast('Failed to submit application', {
        variant: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-3/4 p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-light text-center mb-6 text-black">
          Job Application Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <Input
              name="fullName"
              value={application.fullName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email Address
            </label>
            <Input
              name="email"
              value={application.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-black">
              Experience (years)
            </label>
            <Input
              name="experience"
              value={application.experience}
              onChange={handleChange}
              type="number"
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resumeLink" className="block text-sm font-medium text-black">
              Resume Link
            </label>
            <Input
              name="resumeLink"
              value={application.resumeLink}
              onChange={handleChange}
              type="url"
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="coverLetter" className="block text-sm font-medium text-black">
              Cover Letter
            </label>
            <Textarea
              name="coverLetter"
              rows="4"
              value={application.coverLetter}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            ></Textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
