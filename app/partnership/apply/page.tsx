"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PartnershipApply() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-32">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-light text-indigo-900"
          >
            Apply to Become a Partner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-6 max-w-2xl text-lg text-gray-600"
          >
            Join the JM-Qafri partner program and collaborate with us to drive
            impact, innovation, and sustainable solutions across industries.
          </motion.p>
        </section>

        {/* Application Form */}
        <section className="mb-12 rounded-lg bg-white p-6 shadow-sm">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xl font-light text-indigo-900"
          >
            Partnership Application Form
          </motion.h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Name
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="partnershipType"
                className="block text-sm font-medium text-gray-700"
              >
                Type of Partnership
              </label>
              <select
                id="partnershipType"
                name="partnershipType"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Solution Provider</option>
                <option>Distributor</option>
                <option>System Integrator</option>
                <option>Managed Service Provider</option>
                <option>Technology Partner</option>
                <option>Consultant</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Why do you want to partner with JM-Qafri?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="text-center">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                type="submit"
                className="rounded bg-indigo-600 px-6 py-2 text-white transition duration-300 hover:bg-indigo-700"
              >
                Submit Application
              </motion.button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
