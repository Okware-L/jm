import React from "react";
import Create from "../../components/createJob";
import Createdtender from "../../components/createTender";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SubmissionsTable from "../../components/SubmissionsTable";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />
      <div className="p-5">
        <h1 className="pt-40 text-center text-3xl font-light">Admin !</h1>
        <p className="my-3 text-center">Welcome to the admin page</p>
        <div className="mx-3 grid md:flex">
          <Create />
          <Createdtender />
        </div>
        <SubmissionsTable />
      </div>
      <Footer />
    </div>
  );
}
