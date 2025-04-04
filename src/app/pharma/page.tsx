"use client";
import React from "react";
import Footer from "../../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import Posts from "@/components/Blog";
import Link from "next/link";

const PharmaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      
      <div className="pt-20">
        <div className="mb-10 grid place-items-center justify-center">
          <Image
            src="/ambulance.jpeg"
            alt="Healthcare"
            width={800}
            height={500}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center text-xl font-light text-indigo-900 sm:text-3xl"
        >
          Advancing Healthcare Infrastructure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-5 py-6 text-left text-base font-extralight leading-relaxed"
        >
          We are pleased to provide an update on our ongoing initiative aimed at
          strengthening healthcare infrastructure across Africa. This
          foundational project represents a critical first step in our
          commitment to transforming healthcare delivery on the continent. While
          the specifics of this project remain confidential for the time being,
          we can assure stakeholders of its alignment with addressing some of
          the most significant challenges currently faced by African healthcare
          systems. Our efforts are primarily focused on the following key areas:
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 px-4 py-8 font-extralight text-black sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-start justify-between rounded-lg bg-white p-6 shadow-lg lg:flex-row lg:items-center">
          <div className="mb-6 lg:mb-0 lg:w-1/2">
            <ul className="list-inside list-disc text-lg">
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4 font-light"
              >
                Enhanced accessibility:
                <p className="py-2 text-base font-extralight">
                  We are actively exploring innovative solutions to ensure
                  equitable access to high-quality healthcare services for all
                  citizens across Africa.
                </p>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-4 font-light"
              >
                Technological Integration:
                <p className="py-2 text-base font-extralight">
                  Recognizing the transformative potential of technology in
                  healthcare delivery, we are investigating the strategic
                  integration of technology to address specific healthcare needs
                  within the African context.
                </p>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-4 font-light"
              >
                Collaborative Partnerships:
                <p className="py-2 text-base font-extralight">
                  We firmly believe that fostering collaboration among key
                  stakeholders is essential for building a more robust
                  healthcare system. We are actively establishing partnerships
                  to combine resources and expertise for maximum impact.
                </p>
              </motion.li>
            </ul>
            <div className="sm:space-x-3">
              <Link href="/pharma/mobileclinic">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 rounded-lg bg-indigo-900 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-indigo-800"
                >
                  Explore Pharma Initiatives
                </motion.button>
              </Link>
              <Link href="https://pharma.jmqafri.org">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 rounded-lg bg-indigo-900 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-indigo-800"
                >
                  Visit Pharmaceutical Application
                </motion.button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <video
              controls
              muted
              src="/clairevid.mp4"
              width={600}
              height={400}
            ></video>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl px-5 py-10 text-left text-base font-semibold leading-relaxed"
      >
        We anticipate sharing additional details regarding the project and its
        anticipated impact in the coming months. We extend our sincere gratitude
        for your continued interest and support. Together, we can significantly
        enhance healthcare infrastructure and usher in a brighter future for
        healthcare in Africa.
      </motion.p>
      <Posts />
      <Footer />
    </div>
  );
};

export default PharmaPage;
