"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

// Firebase configuration (as before)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-5E9XBNR537",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function EnhancedPetitionPage() {
  const [signatureCount, setSignatureCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getSignatureCount();
  }, []);

  async function getSignatureCount() {
    try {
      const querySnapshot = await getDocs(collection(db, "petitions"));
      setSignatureCount(querySnapshot.size);
    } catch (err) {
      console.error("Error getting signature count:", err);
      setErrorMsg("Failed to get signature count. Please try again later.");
    }
  }

  async function signPetition(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg("Please provide both name and email.");
      return;
    }

    try {
      await addDoc(collection(db, "petitions"), {
        name,
        email,
        timestamp: new Date(),
      });
      setSuccessMsg("Thank you for signing the petition!");
      setName("");
      setEmail("");
      getSignatureCount();
    } catch (err) {
      console.error("Error signing petition:", err);
      setErrorMsg("Failed to sign petition. Please try again.");
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 pt-32">
        <div className="container mx-auto px-4 py-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-4xl font-bold text-blue-800"
          >
            Petition for Mandatory Annual Free Healthcare via Mobile Clinics for
            Kenyans
          </motion.h1>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 rounded-lg bg-white p-6 shadow-md"
              >
                <h2 className="mb-4 text-2xl font-semibold text-blue-700">
                  Our Vision
                </h2>
                <p className="mb-4">
                  We, the undersigned Kenyan citizens, firmly believe that
                  access to high-quality healthcare is a fundamental human
                  right. We hereby petition for the immediate implementation of
                  a mandatory annual free healthcare program delivered through
                  mobile clinics, fully funded by the government.
                </p>
                <p>
                  This initiative is essential to bridge the healthcare gap,
                  particularly in rural and underserved urban areas, by
                  providing accessible, affordable, and quality healthcare
                  services to all Kenyans, including vulnerable groups such as
                  children, pregnant women, the elderly, people with
                  disabilities, and refugees.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8 rounded-lg bg-white p-6 shadow-md"
              >
                <h2 className="mb-4 text-2xl font-semibold text-blue-700">
                  The Importance of Mobile Clinics in Kenya
                </h2>
                <p className="mb-4">
                  Kenya&apos;s vast and diverse geography presents significant
                  challenges in delivering healthcare services. Mobile clinics
                  offer a practical and effective solution by bringing medical
                  care closer to the people.
                </p>
                <h3 className="mb-2 text-xl font-semibold">
                  Benefits for Kenyans:
                </h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Enhanced Accessibility: Overcoming geographical barriers
                  </li>
                  <li>
                    Early Disease Detection: Facilitating timely treatment
                  </li>
                  <li>
                    Preventive Care: Providing vital services for all ages
                  </li>
                  <li>Chronic Disease Management: Improving quality of life</li>
                  <li>
                    Reduced Out-of-Pocket Spending: Alleviating financial
                    burdens
                  </li>
                  <li>
                    Strengthened Primary Healthcare: Complementing existing
                    systems
                  </li>
                </ul>
              </motion.section>
            </div>

            <div>
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-8 rounded-lg bg-white p-6 shadow-md"
              >
                <h2 className="mb-4 text-2xl font-semibold text-blue-700">
                  Funding and Implementation
                </h2>
                <p>
                  We propose that the government fully finance this initiative
                  through the Sustainable Health Insurance Fund (SHIF),
                  replacing the former National Hospital Insurance Fund (NHIF).
                  By allocating adequate resources, the government can ensure
                  the successful implementation and sustainability of the mobile
                  clinic program.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-8 rounded-lg bg-white p-6 shadow-md"
              >
                <h2 className="mb-4 text-2xl font-semibold text-blue-700">
                  Call to Action
                </h2>
                <p className="mb-4">
                  We urge the Kenyan government to prioritize the health and
                  well-being of its citizens by implementing mandatory annual
                  free healthcare through mobile clinics. This initiative has
                  the potential to transform the healthcare landscape in Kenya,
                  improve public health outcomes, and contribute to the overall
                  development of the nation.
                </p>
                <p className="font-semibold">
                  Please sign this petition to show your support for a healthier
                  Kenya.
                </p>
              </motion.section>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="rounded-lg bg-blue-50 p-6 shadow-md"
              >
                <h2 className="mb-4 text-2xl font-semibold text-blue-700">
                  Sign the Petition
                </h2>
                <p className="mb-4 font-bold">
                  Current Signature Count: {signatureCount}
                </p>
                {errorMsg && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMsg}</AlertDescription>
                  </Alert>
                )}
                {successMsg && (
                  <Alert variant="default" className="mb-4">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{successMsg}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={signPetition} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Petition
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-12 rounded-lg bg-white p-6 shadow-md"
          >
            <h2 className="mb-4 text-2xl font-semibold text-blue-700">
              Additional Considerations
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Highlight specific challenges faced by Kenyans in accessing
                healthcare, such as poverty, distance, and cultural barriers.
              </li>
              <li>
                Emphasize the importance of involving communities in the
                planning and implementation of mobile clinic services.
              </li>
              <li>
                Call for the training of healthcare providers to deliver
                culturally sensitive and effective care.
              </li>
              <li>
                Propose partnerships with local organizations and NGOs to
                support the mobile clinic program.
              </li>
            </ul>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}
