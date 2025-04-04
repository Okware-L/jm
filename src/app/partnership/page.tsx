"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Partnership() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-800">
      <main className="container mx-auto px-4 py-8 pt-32">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 py-12 text-5xl font-light text-indigo-900"
          >
            JM-Qafri Partner Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-6 max-w-2xl text-lg text-gray-600"
          >
            We believe in the power of collaboration to revolutionize
            identity-powered technology solutions. Join our ecosystem to drive
            impact and innovation.
          </motion.p>
          <Link href="/partnership/apply">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="rounded bg-indigo-600 px-6 py-2 text-white transition duration-300 hover:bg-indigo-700"
            >
              Become a Partner
            </motion.button>
          </Link>
        </section>

        {/* Collaborative Vision */}
        <section className="mb-12 rounded-lg bg-white p-6 shadow-sm">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xl font-light text-indigo-900"
          >
            Our Collaborative Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600"
          >
            Partnering with JM-Qafri means aligning with leading organizations
            like JM-Q Methuselah, NWCV, Scorpion Group, and CPJ Farms to create
            solutions that address global challenges in business, healthcare,
            education, and community development.
          </motion.p>
        </section>

        {/* Core Pillars */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center text-xl font-light text-indigo-900"
          >
            Our Core Pillars
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Innovation", desc: "Crafting cutting-edge solutions." },
              {
                title: "Collaboration",
                desc: "Amplifying impact through partnerships.",
              },
              {
                title: "Expertise",
                desc: "Applying knowledge to solve challenges.",
              },
              { title: "Impact", desc: "Transforming communities worldwide." },
            ].map((pillar, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                key={index}
                className="rounded-lg bg-white p-5 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-light text-indigo-900">
                  {pillar.title}
                </h3>
                <p className="text-gray-600">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partner Program Benefits */}
        <section className="mb-12 rounded-lg bg-indigo-900 p-6 text-white">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xl font-light"
          >
            Partner Program Benefits
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ul className="space-y-3">
                <li>Unique Engagement Opportunities</li>
                <li>Targeted Audience Reach</li>
                <li>Collaborative Knowledge Exchange</li>
                <li>Enhanced Visibility through JM-Qafri Channels</li>
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
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center text-xl font-light text-indigo-900"
          >
            Partnership Opportunities
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Solution Provider",
                desc: "Integrate identity solutions.",
              },
              {
                title: "Distributor",
                desc: "Expand our reach in new markets.",
              },
              {
                title: "System Integrator",
                desc: "Implement our enterprise solutions.",
              },
              {
                title: "Managed Service Provider",
                desc: "Offer managed identity services.",
              },
              {
                title: "Technology Partner",
                desc: "Collaborate on tech solutions.",
              },
              { title: "Consultant", desc: "Advise on identity management." },
            ].map((opportunity, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-light text-indigo-900">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600">{opportunity.desc}</p>
                <a
                  href="#"
                  className="mt-3 inline-block font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Learn more →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xl font-light text-indigo-900"
          >
            Join Our Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-6 max-w-xl text-gray-600"
          >
            Partner with JM-Qafri to shape the future. Together, we can create
            sustainable, impactful solutions.
          </motion.p>
          <Link href="/partnership/apply">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="rounded bg-indigo-600 px-6 py-2 text-white transition duration-300 hover:bg-indigo-700"
            >
              Apply Now
            </motion.button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
