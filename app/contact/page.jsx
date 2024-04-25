import React from "react";

import Navbar from "../../components/Navbar";
import Contact from "../../components/contact";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-40 px-5">
        <h1 className="text-center text-3xl font-extralight text-black py-5">
          CONTACT FORM
        </h1>
        <div className="p-5 px-20"></div>
        <div className="sm:mx-10">
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
