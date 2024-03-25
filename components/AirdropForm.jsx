"use client"

import { useState } from 'react';
import { db } from '../firebseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

export default function AirdropForm() {
  const [application, setApplication] = useState({
    name: '',
    email: '',
    ethWallet: '',
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
    const col = collection(db, 'airdropApplications');
    try {
      await addDoc(col, {
        name: application.name,
        email: application.email,
        ethWallet: application.ethWallet,
      });
      toast('Airdrop application submitted successfully', {
        variant: 'success',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error submitting airdrop application:', error);
      toast('Failed to submit airdrop application', {
        variant: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="sm:w-3/4 p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-light text-center mb-6 text-black">
          Participate in the Airdrop
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              name="name"
              value={application.name}
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
            <label htmlFor="ethWallet" className="block text-sm font-medium text-black">
              ETH Wallet Address
            </label>
            <Input
              name="ethWallet"
              value={application.ethWallet}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-black">
              Additional Information (if any)
            </label>
            <Textarea
              name="message"
              rows="4"
              value={application.message}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            ></Textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Submit Airdrop Application
          </button>
        </form>
      </div>
    </div>
  );
}
