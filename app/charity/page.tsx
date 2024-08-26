"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DonorWall from "./components/Donors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CharityProject {
  name: string;
  description: string;
}

interface Donor {
  name: string;
  amount: number;
  message?: string;
  project?: string;
  date: string;
}

const CharityPage: React.FC = () => {
  const [isDonorWallOpen, setIsDonorWallOpen] = useState(false);

  const charitySections = [
    {
      title: "Collaborating with Charities",
      content:
        "We actively partner with reputable charities to drive positive change, leveraging our network's resources and expertise.",
    },
    {
      title: "Encouraging Donations",
      content:
        "Every contribution, regardless of size, can significantly impact lives. We encourage both members and non-members to support our causes.",
    },
    {
      title: "The Impact of Your Donations",
      content:
        "Your generosity funds education, medical research, environmental initiatives, and more. Together, we're building a more equitable world.",
    },
  ];

  const charityProjects: CharityProject[] = [
    {
      name: "Mobile Clinic",
      description: "Providing healthcare services to remote areas.",
    },
    {
      name: "Development",
      description: "Supporting sustainable community development projects.",
    },
    {
      name: "NWCV (Women Empowerment)",
      description: "Empowering women through education and skill development.",
    },
    {
      name: "Anonymous Hope Initiative",
      description: "Boy child education and support programs.",
    },
  ];

  const donors: Donor[] = [
    {
      name: "John Doe",
      amount: 1000,
      message: "Happy to support this cause!",
      project: "Mobile Clinic",
      date: "2023-08-15",
    },
    {
      name: "Jane Smith",
      amount: 500,
      project: "Development",
      date: "2023-08-14",
    },
    {
      name: "Anonymous",
      amount: 250,
      message: "Keep up the great work!",
      date: "2023-08-13",
    },
    { name: "Alice Johnson", amount: 100, project: "NWCV", date: "2023-08-12" },
    {
      name: "Bob Williams",
      amount: 750,
      message: "Proud to contribute",
      project: "Anonymous Hope Initiative",
      date: "2023-08-11",
    },
    { name: "Emma Davis", amount: 300, date: "2023-08-10" },
    {
      name: "Michael Brown",
      amount: 1500,
      project: "Mobile Clinic",
      date: "2023-08-09",
    },
    {
      name: "Sophia Lee",
      amount: 200,
      message: "Every bit helps!",
      date: "2023-08-08",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pt-20 text-slate-800"
        >
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h1 className="mb-4 text-4xl font-light text-slate-900 md:text-5xl">
                Join Us in Making a Difference
              </h1>
              <div className="mx-auto h-0.5 w-16 bg-slate-300"></div>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {charitySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  className="rounded-lg bg-white p-6 shadow-sm"
                >
                  <h2 className="mb-3 text-xl font-medium text-slate-800">
                    {section.title}
                  </h2>
                  <p className="text-sm text-slate-600">{section.content}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 rounded-lg bg-white p-8 shadow-sm"
            >
              <h2 className="mb-6 text-center text-2xl font-light text-slate-900">
                Our Charity Projects
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {charityProjects.map((project, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-slate-800">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/charity/Donate"
                  className="inline-block rounded-md bg-slate-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                  Donate Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-16 rounded-lg bg-slate-200 p-6 text-slate-800"
            >
              <h2 className="mb-3 text-center text-xl font-light text-slate-900">
                Transparency Note
              </h2>
              <p className="mx-auto max-w-2xl text-center text-sm">
                The Jmqafri Network ensures that all donations are handled with
                utmost transparency and allocated responsibly to the intended
                causes. We regularly review our partnerships to ensure their
                credibility and impact.
              </p>
            </motion.div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => setIsDonorWallOpen(true)}
                className="bg-slate-800 text-white hover:bg-slate-700"
              >
                View Donor Wall
              </Button>
            </div>
          </div>

          {/**          <div className="mt-8 text-center">
            <DonorWall
              isOpen={isDonorWallOpen}
              onOpenChange={setIsDonorWallOpen}
              donors={donors}
            />
          </div> */}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CharityPage;
