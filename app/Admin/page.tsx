"use client";

import React, { useState } from "react";
import Create from "../../components/createJob";
import Createdtender from "../../components/createTender";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ContactFormSubmissions from "./components/ContactFormSubmissions";
import JobSubmissions from "./components/JobSubmissions";
import TenderSubmissions from "./components/TenderSubmissions";
import AcquisitionsSubmissions from "./components/AcquisitionsSubmissions";
import Analytics from "./components/Analytics";
import UserManagement from "./components/UserManagement";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "createJob":
        return <Create />;
      case "createTender":
        return <Createdtender />;
      case "contactSubmissions":
        return <ContactFormSubmissions />;
      case "jobSubmissions":
        return <JobSubmissions />;
      case "tenderSubmissions":
        return <TenderSubmissions />;
      case "acquisitionsSubmissions":
        return <AcquisitionsSubmissions />;
      case "analytics":
        return <Analytics />;
      case "userManagement":
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-indigo-900">
      <Navbar />
      <div className="container mx-auto p-5">
        <h1 className="pt-24 text-center text-4xl font-bold">
          Admin Dashboard
        </h1>
        <p className="my-3 text-center text-indigo-600">
          Manage your application efficiently
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            "dashboard",
            "createJob",
            "createTender",
            "contactSubmissions",
            "jobSubmissions",
            "tenderSubmissions",
            "acquisitionsSubmissions",
            "analytics",
            "userManagement",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 transition-colors ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() +
                tab
                  .slice(1)
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
            </button>
          ))}
        </div>

        <div className="mt-8">{renderActiveComponent()}</div>
      </div>
      <Footer />
    </div>
  );
}

const Dashboard = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <DashboardCard title="Total Users" value="--.--" />
    <DashboardCard title="Active Jobs" value="36" />
    <DashboardCard title="Open Tenders" value="12" />
    <DashboardCard title="New Submissions" value="--.--" />
    <DashboardCard title="Revenue" value="--.--" />
  </div>
);

const DashboardCard = ({ title, value }: { title: any; value: any }) => (
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h3 className="text-xl font-semibold text-indigo-900">{title}</h3>
    <p className="mt-2 text-3xl font-bold text-indigo-600">{value}</p>
  </div>
);
