"use client"

import { useState } from 'react';
import { db } from '../../../../firebseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';

export default function Page() {
  const [application, setApplication] = useState({
    fullName: '',
    email: '',
    university: '',
    degree: '',
    graduationYear: '',
    portfolioLink: '',
    motivation: '',
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
    if (!validateForm()) {
      return;
    }
    const col = collection(db, 'architectureApplications');
    try {
      await addDoc(col, {
        fullName: application.fullName,
        email: application.email,
        university: application.university,
        degree: application.degree,
        graduationYear: application.graduationYear,
        portfolioLink: application.portfolioLink,
        motivation: application.motivation,
      });
      toast('Application submitted successfully', {
        variant: 'success',
        duration: 5000,
      });
      resetForm();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast('Failed to submit application', {
        variant: 'error',
        duration: 5000,
      });
    }
  };

  const validateForm = () => {
    const { fullName, email, university, degree, graduationYear } = application;
    if (!fullName || !email || !university || !degree || !graduationYear) {
      toast('Please fill out all required fields', {
        variant: 'error',
        duration: 5000,
      });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setApplication({
      fullName: '',
      email: '',
      university: '',
      degree: '',
      graduationYear: '',
      portfolioLink: '',
      motivation: '',
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
      <div className="w-3/4 p-5 bg-white rounded-lg shadow-md ">
        <h2 className="text-3xl font-light text-center mb-6 text-black ">
          Apply for Architecture Competition
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
              Email
            </label>
            <Input
              name="email"
              value={application.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="university" className="block text-sm font-medium text-black">
              University
            </label>
            <Input
              name="university"
              value={application.university}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="degree" className="block text-sm font-medium text-black">
              Degree
            </label>
            <Input
              name="degree"
              value={application.degree}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="graduationYear" className="block text-sm font-medium text-black">
              Graduation Year
            </label>
            <Input
              name="graduationYear"
              value={application.graduationYear}
              onChange={handleChange}
              type="number"
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="portfolioLink" className="block text-sm font-medium text-black">
              Portfolio Link
            </label>
            <Input
              name="portfolioLink"
              value={application.portfolioLink}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="motivation" className="block text-sm font-medium text-black">
              Motivation
            </label>
            <Textarea
              name="motivation"
              rows="4"
              value={application.motivation}
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
}
