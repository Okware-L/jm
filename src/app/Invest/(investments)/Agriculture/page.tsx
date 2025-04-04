"use client";

import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Head>
        <title>Revolutionising Agriculture with Organic Solutions</title>
      </Head>
      <header className="bg-emerald-100 py-6 text-slate-900">
        <div className="container mx-auto pt-32">
          <h1 className="py-32 text-center text-4xl font-light">
            Revolutionising Agriculture with{" "}
            <span className="font-bold text-emerald-900">
              Organic Solutions
            </span>
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="md:flex md:space-x-8">
          <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg bg-slate-100 p-6 shadow-md">
              <h2 className="mb-4 text-3xl font-light text-indigo-900">
                JM-Qafri and World Organic Group Partnership
              </h2>
              <p className="font-extralight text-slate-900">
                JM-Qafri and World Organic Group have partnered to promote
                sustainable agriculture, improve soil enrichment technology, and
                enhance plant and animal growth using innovative organic
                products. This presentation will provide an overview of the
                partnership, the product lineup, and the expected benefits and
                outcomes.
              </p>
            </div>
          </motion.section>
          <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg bg-slate-100 p-6 shadow-md">
              <h2 className="mb-4 text-3xl font-light text-indigo-900">
                Company Profiles
              </h2>
              <p className="font-extralight text-slate-900">
                JM-Qafri is a leading provider of sustainable agricultural
                solutions, with a mission to develop eco-friendly technologies
                that improve soil health and crop yields. World Organic Group is
                a pioneer in the organic farming movement, dedicated to
                promoting environmentally responsible agricultural practices
                globally.
              </p>
              <p className="font-extralight text-slate-900">
                Together, these two organizations are committed to
                revolutionizing the industry and providing farmers with the
                tools they need to achieve long-term success.
              </p>
            </div>
          </motion.section>
        </div>

        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-lg bg-slate-100 p-6 shadow-md">
            <h2 className="mb-4 py-8 text-3xl font-light text-indigo-900">
              Innovative Organic Products
            </h2>
            <ul className="list-inside list-disc space-y-3 text-slate-900">
              <li className="font-extralight">
                <strong className="text-xl font-light text-indigo-900">
                  Peatgel+:
                </strong>{" "}
                A liquid organic plant growth stimulator that promotes healthy
                root development and increased yields.
              </li>
              <li className="font-extralight">
                <strong className="text-xl font-light text-indigo-900">
                  Peatgel:
                </strong>{" "}
                A liquid organic plant growth stimulator that enhances nutrient
                uptake and overall plant vigor.
              </li>
              <li className="font-extralight">
                <strong className="text-xl font-light text-indigo-900">
                  Peatgel-Feed:
                </strong>{" "}
                A humic additive for animal feed that supports digestive health
                and improves the nutritional value of livestock products.
              </li>
            </ul>
            {/**hmmmmmmm */}
            <h2 className="mb-4 py-8 text-3xl font-light text-indigo-900">
              Ecogreentech: Cutting-Edge Soil Enrichment
            </h2>
            <ol className="list-inside list-decimal space-y-3 text-slate-900">
              <li className="font-extralight">
                <strong className="text-xl font-light text-indigo-900">
                  Soil Analysis:
                </strong>{" "}
                Comprehensive assessment of soil composition and nutrient levels
                to develop customized solutions.
              </li>
              <li className="font-extralight">
                <strong className="text-xl font-light text-indigo-900">
                  Organic Formulation:
                </strong>{" "}
                Proprietary blend of natural ingredients that replenish soil
                health and promote sustainable growth.
              </li>
              <li className="font-extralight">
                <strong className="text-xl font-light text-indigo-900">
                  Real-World Application:
                </strong>{" "}
                Field trials and case studies demonstrating the effectiveness of
                Ecogreentech in improving crop yields and reducing environmental
                impact.
              </li>
            </ol>
          </div>
        </motion.section>

        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-emerald-100 p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-emerald-900">
                Promote Sustainable Practices
              </h3>
              <p className="font-light text-slate-900">
                Encourage the adoption of organic and regenerative farming
                methods to improve soil quality and reduce the environmental
                impact of agriculture.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-100 p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-emerald-900">
                Improve Soil Enrichment
              </h3>
              <p className="font-light text-slate-900">
                Develop innovative technologies that enhance the natural
                fertility and nutrient content of soil, reducing the need for
                synthetic fertilizers.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-100 p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-emerald-900">
                Enhance Natural Growth
              </h3>
              <p className="font-light text-slate-900">
                Provide organic solutions that stimulate the natural growth and
                development of plants and animals, without the use of harmful
                chemicals.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center rounded-lg bg-slate-100 p-6 shadow-md">
            <div className="w-1/2">
              <h2 className="mb-4 text-2xl font-semibold text-emerald-900">
                Our Vision
              </h2>
              <p className="text-slate-900">
                Our vision is to lead the industry in sustainable agricultural
                practices, promoting a healthier planet and better quality of
                life for future generations.
              </p>
            </div>
            <div className="w-1/2 pl-4">
              <Image
                src="/strawberry.jpg"
                alt="Our Vision"
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
      <footer className="bg-indigo-900 py-4 text-white">
        <div className="container mx-auto text-center">
          <p>
            &copy; 2024 JM-Qafri and World Organic Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
