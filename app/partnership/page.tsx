"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Partnership() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-32">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 py-16 text-6xl font-extralight text-indigo-900"
          >
            JM-Qafri Partner Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-8 max-w-3xl text-xl font-extralight text-gray-600"
          >
            At JM-Qafri, we believe in the power of collaboration. Our partner
            ecosystem is the cornerstone of our mission to revolutionize
            identity-powered technology solutions.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="rounded bg-indigo-600 px-6 py-2 text-white transition duration-300 hover:bg-indigo-700"
          >
            Become a Partner
          </motion.button>
        </section>

        {/* Introduction Section */}
        <section className="mb-16 rounded-lg bg-white p-8 shadow-sm">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-2xl font-light text-indigo-900"
          >
            Our Collaborative Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-extralight text-gray-600"
          >
            JM-Qafri&apos;s partner program is a strategic alliance between
            industry leaders including JM-Q Methuselah, NWCV, Scorpion Group,
            and CPJ Farms. Together, we&apos;re committed to developing
            innovative solutions for a more equitable and sustainable future
            across business, healthcare, community development, and education
            sectors.
          </motion.p>
        </section>

        {/* Core Pillars Section */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-2xl font-light text-indigo-900"
          >
            Our Core Pillars
          </motion.h2>
          <div className="grid gap-8 font-extralight md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Innovation",
                desc: "Developing cutting-edge solutions for global challenges.",
              },
              {
                title: "Collaboration",
                desc: "Fostering partnerships to amplify our collective impact.",
              },
              {
                title: "Expertise",
                desc: "Leveraging our think tank to solve complex problems.",
              },
              {
                title: "Impact",
                desc: "Driving measurable change in communities worldwide.",
              },
            ].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                key={index}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-light text-indigo-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partner Program Benefits */}
        <section className="mb-16 rounded-lg bg-indigo-900 p-8 text-white">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-2xl font-light"
          >
            Partner Program Benefits
          </motion.h2>
          <div className="grid gap-8 font-extralight md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Unique Engagement Opportunities</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Targeted Audience Reach</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Collaborative Knowledge Exchange</span>
                  <p></p>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-6 w-6 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>
                    Enhanced Visibility & networking using JM-Qafri Channels
                  </span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Image
                src="/claire2.jpeg"
                alt="Partner Benefits"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-2xl font-light text-indigo-900"
          >
            Partnership Opportunities
          </motion.h2>
          <div className="grid gap-8 font-extralight md:grid-cols-3">
            {[
              {
                title: "Solution Provider",
                desc: "Integrate our identity solutions into your offerings.",
              },
              {
                title: "Distributor",
                desc: "Expand our reach in new markets and industries.",
              },
              {
                title: "System Integrator",
                desc: "Implement our solutions for enterprise clients.",
              },
              {
                title: "Managed Service Provider",
                desc: "Offer our services as part of your managed portfolio.",
              },
              {
                title: "Technology Partner",
                desc: "Collaborate on developing innovative identity solutions.",
              },
              {
                title: "Consultant",
                desc: "Provide expert advice on identity management strategies.",
              },
            ].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-light text-indigo-900">
                  {item.title}
                </h3>
                <p className="mb-4 text-gray-600">{item.desc}</p>
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Learn more →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partner Tiers */}
        <section className="mb-16 rounded-lg bg-white p-8 shadow-sm">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-2xl font-light text-indigo-900"
          >
            Partner Tiers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 text-gray-600"
          >
            Our tiered partnership structure is designed to align with your
            organization&apos;s goals and level of engagement:
          </motion.p>
          <div className="space-y-6">
            {[
              {
                title: "Founding",
                desc: "A select group of organizations who share our founding vision and play a pivotal role in shaping the network's direction. Founding Partners receive the highest level of visibility and engagement opportunities.",
              },
              {
                title: "Core",
                desc: "Actively involved partners who contribute significantly to the network's growth and impact. Core Partners benefit from prominent promotion and participation in key initiatives.",
              },
              {
                title: "Supporting",
                desc: "Organizations that align with our mission and contribute valuable expertise or resources. Supporting Partners gain access to a network of purpose-driven organizations and visibility through our platforms.",
              },
            ].map((tier, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                key={index}
                className="flex items-center"
              >
                <div
                  className={`mr-4 hidden h-16 w-16 items-center justify-center rounded-full md:flex ${
                    index === 0
                      ? "bg-indigo-900"
                      : index === 1
                        ? "bg-indigo-700"
                        : "bg-indigo-500"
                  } font-light text-white`}
                >
                  {tier.title.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-light text-indigo-900">
                    {tier.title}
                  </h3>
                  <p className="font-extralight text-gray-600">{tier.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-2xl font-light text-indigo-900"
          >
            Join Our Ecosystem of Innovation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-8 max-w-2xl font-extralight text-gray-600"
          >
            We invite forward-thinking organizations to join the JM-Qafri
            Methuselah Network and become partners in progress. Together, we can
            create a more just and sustainable world for all.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="rounded bg-indigo-600 px-8 py-3 text-white transition duration-300 hover:bg-indigo-700"
          >
            Apply for Partnership
          </motion.button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
