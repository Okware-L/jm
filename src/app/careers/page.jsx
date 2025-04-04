"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
//import Create from '../../components/createJob'
import { db } from "../../../firebseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Page = () => {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    const col = collection(db, "jobs");
    const snapshot = await getDocs(col);
    setJobs(
      snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }),
    );
  };

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100">

        <div className="sm:text w-full pt-40">
          <div className="container grid max-w-6xl gap-6 px-4 py-6 lg:gap-10 lg:px-6 lg:py-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-light tracking-tighter text-black sm:text-5xl">
                  Search for jobs and internships with JM-Qafri & NWCV.
                </h1>
                <p className="max-w-3xl font-extralight text-gray-900 last:md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the role that is right for you.
                </p>
                <div className="py-5 text-black">
                  <Link href="/careers/tenders">
                    <h1>See Available Tenders</h1>
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input id="search" placeholder="Search for jobs" />
                </div>
                <div className="flex items-center space-x-2">
                  <button className="btn btn-wide">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-2 px-5 sm:space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="grid pb-10">
              <Card>
                <CardContent className="grid gap-4 p-5">
                  <div>
                    <Link href={`/careers/${job.id}`} key={job.id}>
                      <h3 className="text-2xl font-light">{job.title}</h3>
                    </Link>
                  </div>
                  <div className="grid hidden gap-2 md:block">
                    <div>
                      <h4 className="font-semibold">Location;</h4>
                      <p>{job.location}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Employment Type;</h4>
                      <p>{job.employment}</p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <h4 className="font-semibold">Description</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      {job.description}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="hidden md:flex">
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
                          We&#39;re on a mission to make finance more
                          accessible.
                        </p>
                      </div>
                    </div>
                    <Link
                      className="mx-5 inline-flex h-9 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium"
                      href={`/careers/${job.id}`}
                      key={job.id}
                    >
                      Apply
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Page;
