"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6 };

const SpaceExplorationPage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white p-8 pt-32">
        <motion.header
          className="mb-12 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transition}
        >
          <h1 className="mb-4 bg-slate-950 py-16 text-6xl font-extralight text-indigo-100">
            Achieving Balance in Space Exploration
          </h1>
          <p className="py-8 text-lg font-light text-slate-700">
            As we venture deeper into the cosmos, it is crucial to strike a
            delicate balance between the pursuit of scientific knowledge and the
            preservation of our fragile home planet. This presentation will
            explore innovative ways to harmonise space exploration and
            environmental conservation, ensuring a sustainable future for both.
          </p>
        </motion.header>

        <motion.section
          className="mb-16 bg-slate-100 p-8"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Importance of Environmental Conservation
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Protecting Our Planet
              </h3>
              <p className="font-light text-slate-700">
                Space exploration must be conducted with a deep respect for the
                environment, minimizing the impact on our Earth&apos;s precious
                ecosystems.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Sustainable Practices
              </h3>
              <p className="font-light text-slate-700">
                Adopting eco-friendly technologies and practices in space
                missions can help reduce the carbon footprint and resource
                depletion associated with space activities.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Inspiring Conservation
              </h3>
              <p className="font-light text-slate-700">
                Sharing the breathtaking views of our planet from space can
                inspire people to appreciate and protect the natural world.
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
            Educational Programs for Children
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "STEM Curriculum",
                content:
                  "Integrate space exploration and environmental conservation into STEM education, sparking children's curiosity and instilling a sense of responsibility.",
              },
              {
                title: "Experiential Learning",
                content:
                  "Organize field trips to space centers and nature preserves, allowing children to witness the wonders of the cosmos and the beauty of our planet firsthand.",
              },
              {
                title: "Storytelling and Creativity",
                content:
                  "Encourage children to express their ideas through art, writing, and multimedia projects that explore the interconnectedness of space exploration and environmental protection.",
              },
            ].map((program, index) => (
              <div key={index} className="rounded-lg bg-indigo-100 p-4 shadow">
                <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                  {program.title}
                </h3>
                <p className="font-light text-slate-700">{program.content}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-16 bg-slate-100 p-8"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Architectural Creativity in Space Exploration
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Eco-Friendly Structures
              </h3>
              <p className="font-light text-slate-700">
                Design space habitats and infrastructure that minimize the
                ecological impact, utilizing renewable materials and
                energy-efficient technologies.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Symbiotic Ecosystems
              </h3>
              <p className="font-light text-slate-700">
                Integrate natural elements, such as greenery and water systems,
                into space settlements to create self-sustaining environments
                that mimic the balance of our Earth.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Sustainable Exploration
              </h3>
              <p className="font-light text-slate-700">
                Develop innovative architectural solutions that enable space
                exploration while maintaining a harmonious relationship with the
                surrounding environment.
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
            Financial Incentives for Sustainable Space Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Government Funding",
                content:
                  "Allocate public funds to support the research, development, and implementation of sustainable space technologies and exploration missions.",
              },
              {
                title: "Private Sector Investments",
                content:
                  "Encourage private companies and investors to finance eco-friendly space initiatives through tax incentives, grants, and public-private partnerships.",
              },
              {
                title: "Crowd-Sourcing Platforms",
                content:
                  "Leverage crowd-sourcing platforms to engage the public and raise funds for innovative sustainable space projects.",
              },
              {
                title: "Impact Investment Opportunities",
                content:
                  "Develop investment opportunities that prioritize the environmental and social impact of space exploration, attracting socially conscious investors.",
              },
            ].map((incentive, index) => (
              <div
                key={index}
                className="rounded-lg bg-indigo-100 p-4 text-center shadow"
              >
                <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                  {incentive.title}
                </h3>
                <p className="font-light text-slate-700">{incentive.content}</p>
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
            Promoting Eco-Friendly Space Initiatives
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Circular Economy
              </h3>
              <p className="font-light text-slate-700">
                Promote the principles of a circular economy in space
                exploration, where waste is minimized, and resources are reused
                and repurposed.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Renewable Energy
              </h3>
              <p className="font-light text-slate-700">
                Invest in the development and deployment of renewable energy
                technologies, such as solar and wind, to power space missions
                and habitats.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Public Engagement
              </h3>
              <p className="font-light text-slate-700">
                Engage the public through educational initiatives and community
                outreach to raise awareness and garner support for sustainable
                space exploration.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-normal text-indigo-900">
                Interdisciplinary Collaboration
              </h3>
              <p className="font-light text-slate-700">
                Foster collaboration between space agencies, environmental
                organizations, and diverse stakeholders to develop holistic
                solutions for a sustainable space future.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-16 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="mb-6 text-3xl font-light text-slate-900">
            Conclusion: Towards a Sustainable Space Future
          </h2>
          <p className="mx-auto max-w-3xl font-light text-slate-700">
            By embracing innovative approaches, aligning space exploration with
            environmental protection, and inspiring the next generation, we can
            unlock a future where the wonders of the cosmos and the preservation
            of our planet go hand in hand. Together, we can forge a path towards
            a sustainable and responsible space exploration that benefits all of
            humanity and the natural world.
          </p>
          <Button className="mt-8 bg-indigo-600 text-white hover:bg-indigo-700">
            Join the Mission
          </Button>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default SpaceExplorationPage;
