"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import Footer from "@/components/Footer";

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6 };

const MobileClinicPage = () => {
  return (
    <div>
      
      <div className="min-h-screen bg-white p-8 pt-32">
        <motion.header
          className="mb-12 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transition}
        >
          <h1 className="mb-4 py-3 text-6xl font-normal text-indigo-950">
            Bridging the Healthcare Gap:
          </h1>
          <h2 className="mb-2 text-3xl font-light text-indigo-900">
            Mobile Clinics for Underserved Communities
          </h2>
          <p className="py-8 text-lg font-light text-slate-700">
            Welcome! Join us in transforming healthcare access for those in
            need.
            <br />
            Mobile clinics offer a vital solution to reach underserved
            communities, providing essential medical care where it&apos;s needed
            most.
          </p>
          <p className="mt-2 text-sm text-slate-600">by Claire atieno</p>
        </motion.header>

        <motion.section
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Project Objectives: A Roadmap to Healthier Communities
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Increase Access",
                content:
                  "Expand healthcare reach to remote and underserved regions, ensuring equitable access to vital medical services.",
              },
              {
                title: "Enhance Public Health",
                content:
                  "Implement targeted interventions, addressing health disparities and promoting preventive care within communities.",
              },
              {
                title: "Ensure Sustainability",
                content:
                  "Develop a long-term, scalable, and sustainable model that empowers communities and improves health outcomes.",
              },
            ].map((objective, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-indigo-100 p-6 shadow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                  {index + 1}. {objective.title}
                </h3>
                <p className="font-light text-slate-700">{objective.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Strategic Deployment: Reaching Those in Need
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-indigo-100 p-6 shadow">
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Data-Driven Approach
              </h3>
              <p className="font-light text-slate-700">
                Leveraging data analysis to identify high-need areas, ensuring
                targeted resource allocation and maximum impact.
              </p>
            </div>
            <div className="rounded-lg bg-indigo-100 p-6 shadow">
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Targeted Deployment
              </h3>
              <p className="font-light text-slate-700">
                Deploying mobile clinics strategically across rural and urban
                underserved communities, reaching patients where they are.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Comprehensive Services: Providing a Spectrum of Care
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: "Primary Care",
                content:
                  "Offer basic medical services, including diagnosis, treatment, and management of common health conditions.",
                image: "/claire1.jpeg",
              },
              {
                title: "Preventive Care",
                content:
                  "Promote wellness through screenings, vaccinations, health education, and preventive measures to mitigate health risks.",
                image: "/insideamb.jpeg",
              },
              {
                title: "Specialized Services",
                content:
                  "Provide access to specialized care, such as dental, vision, and mental health services, addressing diverse healthcare needs.",
                image: "/ambulance.jpeg",
              },
              {
                title: "Integrated Care",
                content:
                  "Collaborate with existing healthcare systems for referrals, follow-up care, and seamless patient transitions.",
                image: "/pharma.jpg",
              },
            ].map((service, index) => (
              <div key={index} className="rounded-lg bg-slate-100 p-4 shadow">
                <div className="relative mb-4 h-48 overflow-hidden rounded-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                  {service.title}
                </h3>
                <p className="font-light text-slate-700">{service.content}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Community Engagement & Technology Integration
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-normal text-indigo-900">
                Building Trust and Partnerships
              </h3>
              <ul className="list-inside list-disc space-y-2 font-light text-slate-700">
                <li>
                  Conducting awareness campaigns, workshops, and community
                  events
                </li>
                <li>
                  Collaborating with community leaders and local organizations
                </li>
                <li>
                  Ensuring effective service delivery through partnerships
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-normal text-indigo-900">
                Enhancing Efficiency and Reach
              </h3>
              <ul className="list-inside list-disc space-y-2 font-light text-slate-700">
                <li>Utilizing Electronic Health Records (EHR) systems</li>
                <li>Connecting with Health Information Exchanges (HIEs)</li>
                <li>
                  Implementing telemedicine solutions for remote consultations
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Impact Measurement: Tracking Progress and Outcomes
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                title: "Patient Visits",
                content: "Track the number of patients served",
              },
              {
                title: "Services Provided",
                content: "Monitor types and frequency of services",
              },
              {
                title: "Health Outcomes",
                content: "Assess improvements in health indicators",
              },
              {
                title: "Community Feedback",
                content: "Gather feedback from community members",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className="rounded-lg bg-indigo-100 p-4 text-center shadow"
              >
                <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                  {metric.title}
                </h3>
                <p className="font-light text-slate-700">{metric.content}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Call to Action: Partnering for a Healthier Future
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Invest in Access",
                content:
                  "Support the purchase or lease of mobile clinics, ensuring sustainable healthcare delivery.",
              },
              {
                title: "Empower Professionals",
                content:
                  "Fund the hiring and training of qualified medical professionals to provide quality care.",
              },
              {
                title: "Equip for Excellence",
                content:
                  "Contribute to procuring medical supplies, equipment, and technology solutions for optimal care.",
              },
            ].map((action, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-indigo-100 p-6 shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                  {action.title}
                </h3>
                <p className="mb-4 font-light text-slate-700">
                  {action.content}
                </p>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                  Support Now
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default MobileClinicPage;
