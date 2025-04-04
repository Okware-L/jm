"use client";

import { useState } from "react";
//import { useRouter } from 'next/navigation';
import { db } from "../../firebseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function Apply() {
  //const router = useRouter();
  const [application, setApplication] = useState({
    name: "",
    email: "",
    company: "",
    category: "",
    location: "",
    message: "",
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
    const col = collection(db, "tenderApplications");
    try {
      await addDoc(col, {
        name: application.name,
        email: application.email,
        company: application.company,
        category: application.category,
        location: application.location,
        message: application.message,
        timestamp: new Date(),
      });

      toast("Application submitted successfully", {
        variant: "success",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast("Failed to submit application", {
        variant: "error",
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-3/4 rounded-lg bg-white p-5 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-light text-black">
          Apply for Tender
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
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <Input
              name="email"
              value={application.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-black"
            >
              company
            </label>
            <Input
              name="company"
              value={application.company}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-black"
            >
              Tender category
            </label>
            <Input
              name="category"
              value={application.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-black"
            >
              Location
            </label>
            <Input
              name="location"
              value={application.location}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-black"
            >
              Message
            </label>
            <Textarea
              name="message"
              rows="4"
              value={application.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            ></Textarea>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
