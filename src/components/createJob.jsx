"use client"

import { db } from "../../firebseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";




export default function Create() {
  const router = useRouter();
  const [jobs, setJobs] = useState({
    title: "",
    location: "",
    employment: "",
    description: "",
  });

  const onChange = (e) => {
    setJobs({ ...jobs, [e.target.title]: e.target.value });
  };


  const handleCreate = async () => {
    const col = collection(db, "jobs");
    try {
      addDoc(col, {
        title: jobs.title,
        description: jobs.description,
        employment:jobs.employment,
        location:jobs.location,

      });


      toast("New Job has been created successfully", {
        variant: "success",
        duration: 5000,
      });

    // Reset the state after successfully adding a tender
      setJobs({
        title: "",
        description: "",
        employment: "",
        locations: "",
      });

    } catch (error) {}
  };

  return (
    <>
      <>
        <div className="container mx-auto mt-8 max-w-[560px]">
          <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
            <h1 className="text-3xl font-semibold">Create new job listing</h1>
          </div>
          <form>
            <div className="mb-4">
              <label>Title</label>
              <Input
              placeholder="job title"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
                type="text"
                title="title"
                value={jobs?.title}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label>Employment</label>
              <Input
              placeholder="Full Time/ Remote / Internship"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
                type="text"
                title="employment"
                value={jobs?.employment}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label>Location</label>
              <Input
              placeholder="Remote / On - site"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
                type="text"
                title="location"
                value={jobs?.location}
                onChange={onChange}
              />
            </div>

            <div className="mb-4">
              <label>Description</label>
              <Textarea
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full bg white text-black"
                type="text"
                title="description"
                value={jobs?.description}
                onChange={onChange}
              />
            </div>
            <button
              className="bg-gray-900 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
              type="button"
              onClick={handleCreate}
            >
              Create new Job .
            </button>
          </form>
        </div>
        <Head>
          <title> Admin Create Job</title>
        </Head>
      </>
    </>
  );
}