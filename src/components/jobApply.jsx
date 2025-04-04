// pages/jobApply.js

import React, { useState } from "react";
import { db } from "../../firebseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const JobApply = () => {
  const [application, setApplication] = useState({
    fullName: "",
    email: "",
    jobTitle: "",
    experience: "",
    resumeLink: "",
    coverLetter: "",
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
    const col = collection(db, "jobApplications");
    try {
      await addDoc(col, {
        fullName: application.fullName,
        email: application.email,
        experience: application.experience,
        jobTitle: application.jobTitle,
        resume: application.resume,
        // coverLetter: application.coverLetter,
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

      // Reset the state after successfully adding a tender
      setApplication({
        fullName: "",
        jobTitle: "",
        email: "",
        experience: "",
        resume: "",
        //  coverLetter: "",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-5 shadow-md md:w-3/4">
        <h2 className="mb-6 text-center text-3xl font-light text-black">
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
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email Address
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
              htmlFor="jobTitle"
              className="block text-sm font-medium text-black"
            >
              Job Title
            </label>
            <Input
              name="jobTitle"
              value={application.jobTitle}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-black"
            >
              Experience (years)
            </label>
            <Input
              name="experience"
              value={application.experience}
              onChange={handleChange}
              type="number"
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-black"
            >
              Resume Link
            </label>
            <Input
              name="resume"
              value={application.resume}
              onChange={handleChange}
              type="url"
              className="mt-1 w-full rounded-md border-gray-300 p-2"
            />
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
};

export default JobApply;
