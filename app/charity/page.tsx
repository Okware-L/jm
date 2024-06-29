"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface CharitySection {
  title: string;
  content: string;
  icon: string;
}

const CharityPage: React.FC = () => {
  const charitySections: CharitySection[] = [
    {
      title: "Collaborating with Charities",
      content:
        "We actively partner with reputable charities to drive positive change. Our collaborations span various causes, leveraging our network's resources and expertise.",
      icon: "🤝",
    },
    {
      title: "Encouraging Donations",
      content:
        "Every contribution, regardless of size, can significantly impact lives. We encourage both members and non-members to support our causes.",
      icon: "💖",
    },
    {
      title: "The Impact of Your Donations",
      content:
        "Your generosity funds education, medical research, environmental initiatives, and more. Together, we're building a more equitable and compassionate world.",
      icon: "🌍",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-20 text-black"
      >
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="mb-4 text-5xl font-extralight text-indigo-900 md:text-7xl">
              Join Us in Making a Difference
            </h1>
            <div className="mx-auto h-1 w-24 bg-indigo-500"></div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {charitySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                className="rounded-lg border-t-4 border-indigo-500 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-4 text-4xl">{section.icon}</div>
                <h2 className="mb-4 text-2xl font-light text-indigo-900">
                  {section.title}
                </h2>
                <p className="text-normal font-light text-gray-700">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 rounded-lg bg-indigo-100 p-8 shadow-lg"
          >
            <h2 className="mb-8 text-center text-4xl font-light text-indigo-900">
              How to Donate
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                "Visit our website",
                "Choose a cause",
                "Select a donation method",
                "Spread the word",
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-indigo-900">
                      {step}
                    </h3>
                    <p className="font-light text-gray-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 rounded-lg bg-indigo-900 p-8 text-white shadow-lg"
          >
            <h2 className="mb-4 text-center text-3xl font-light">
              Transparency Note
            </h2>
            <p className="mx-auto max-w-2xl text-center text-lg font-light">
              The Jmqafri Network ensures that all donations are handled with
              the utmost transparency and that funds are allocated responsibly
              to the intended causes. We regularly review our partnerships with
              charities to ensure their credibility and impact.
            </p>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default CharityPage;
