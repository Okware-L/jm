"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
//import Image from "next/image";
//import claire1 from "../public/claire1.jpeg";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white p-6 pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="py-8 text-5xl font-light text-slate-900">
            Introduction to AI in Medicine
          </h1>
        </motion.div>

        <section className="mb-8 flex flex-col lg:flex-row">
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-lg bg-slate-50 p-6 shadow-lg lg:mb-0 lg:mr-4 lg:w-1/2"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Diagnostic Applications of AI
            </h2>
            <p className="mt-4 font-light text-slate-700">
              AI-powered algorithms can analyze medical images, such as X-rays,
              CT scans, and MRI scans, with unprecedented speed and accuracy. By
              detecting subtle patterns and anomalies that may be overlooked by
              the human eye, AI can assist in the early detection of diseases,
              enabling timely intervention and improved patient prognosis.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-slate-50 p-6 shadow-lg lg:w-1/2"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Predictive Analytics
            </h2>
            <p className="mt-4 font-light text-slate-700">
              AI models can analyze complex patient data, including medical
              history, lab results, and lifestyle factors, to predict the risk
              of developing certain conditions. This predictive capability can
              help healthcare providers implement proactive preventive measures
              and personalize treatment plans for their patients.
            </p>
          </motion.div>
        </section>

        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Clinical Decision Support
            </h2>
            <p className="mt-4 font-light text-slate-700">
              AI-based decision support systems can provide clinicians with
              real-time recommendations and insights, drawing from a vast
              database of medical knowledge and evidence-based practices. This
              can aid in the diagnosis, treatment selection, and management of
              various health conditions, ultimately enhancing the quality of
              care delivered to patients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col lg:flex-row"
          >
            <div className="mb-8 lg:mb-0 lg:mr-4 lg:w-1/2">
              <h2 className="text-2xl font-normal text-indigo-900">
                Importance of Data Processing in AI-Powered Diagnostics
              </h2>
              <p className="mt-4 font-light text-slate-700">
                Ensuring the consistency and quality of medical data is crucial
                for effective AI-powered diagnostics. Standardizing data
                formats, terminology, and coding systems enables seamless
                integration and analysis by AI algorithms.
              </p>
            </div>
            {/**image was here */}
          </motion.div>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-indigo-50 p-6 shadow-lg"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Time-Saving Benefits of AI-Assisted Diagnosis
            </h2>
            <p className="mt-4 font-light text-slate-700">
              AI algorithms can rapidly analyze medical images and patient data,
              identifying potential abnormalities or risk factors much faster
              than human clinicians. This accelerated screening process enables
              early detection and timely intervention, ultimately improving
              patient outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-indigo-50 p-6 shadow-lg"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Challenges and Limitations of AI in Medical Diagnostics
            </h2>
            <p className="mt-4 font-light text-slate-700">
              The accuracy of AI-driven diagnostics is heavily dependent on the
              quality and representativeness of the training data. Addressing
              issues of data scarcity, incomplete records, and demographic
              biases is crucial to ensure equitable and unbiased AI-powered
              healthcare solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-indigo-50 p-6 shadow-lg"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Ethical Considerations in AI-Driven Healthcare
            </h2>
            <p className="mt-4 font-light text-slate-700">
              Ensuring that AI-powered healthcare solutions do not exacerbate
              existing disparities and provide equitable access to all patients,
              regardless of their demographic or socioeconomic background.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-indigo-50 p-6 shadow-lg"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Integrating AI with Human Expertise
            </h2>
            <p className="mt-4 font-light text-slate-700">
              AI should be viewed as a powerful tool that augments and enhances
              the capabilities of healthcare professionals, rather than a
              replacement for human expertise. The synergistic integration of AI
              and human judgment can lead to more accurate and well-informed
              clinical decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-lg bg-indigo-50 p-6 shadow-lg"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Future Outlook and Opportunities
            </h2>
            <p className="mt-4 font-light text-slate-700">
              As AI technologies continue to evolve, they are expected to become
              more sophisticated, accurate, and capable of handling increasingly
              complex medical tasks. This includes advancements in areas like
              natural language processing, computer vision, and advanced
              analytics, which will further enhance the diagnostic and
              decision-making capabilities of AI-powered healthcare solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-lg bg-indigo-50 p-6 shadow-lg"
          >
            <h2 className="text-2xl font-normal text-indigo-900">
              Personalized and Preventive Care
            </h2>
            <p className="mt-4 font-light text-slate-700">
              AI-driven healthcare will play a crucial role in the shift towards
              personalized and preventive care. By leveraging predictive
              analytics and a deep understanding of individual patient profiles,
              AI can help healthcare providers tailor treatments, identify
              high-risk individuals, and implement proactive interventions to
              improve overall health outcomes.
            </p>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
