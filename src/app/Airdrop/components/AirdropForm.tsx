"use client";

import {  useState } from "react";
import { db } from "./config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export default function AirdropForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ethWallet: "",
    message: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "airdropApplications"), {
        name: formData.name,
        email: formData.email,
        ethWallet: formData.ethWallet,
        message: formData.message,
        timestamp: Timestamp.now(),
      });
      toast.success("Airdrop application submitted successfully");
      setFormData({
        name: "",
        email: "",
        ethWallet: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting airdrop application:", error);
      toast.error("Failed to submit airdrop application");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="sm:w-3/4 lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-light text-center mb-6 text-black">
          Participate in the Airdrop
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ethWallet" className="block text-sm font-medium text-black">
              ETH Wallet Address
            </label>
            <Input
              name="ethWallet"
              value={formData.ethWallet}
              onChange={handleChange}
              placeholder="0x..."
              required
              
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-black">
              Additional Information (optional)
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any extra details..."
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Submit Airdrop Application
          </button>
        </form>
      </div>
    </div>
  );
}
