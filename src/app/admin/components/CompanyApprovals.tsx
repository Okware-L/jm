// app/admin/components/CompanyApprovals.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Eye, FileText, Building, Mail, Phone, MapPin, AlertTriangle } from "lucide-react";

interface CompanyApplication {
  id: string;
  name: string;
  registrationNumber: string;
  industry: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  submittedAt: string;
  status: "pending" | "verifying" | "approved" | "rejected";
  documents: CompanyDocument[];
  teamSize: number;
  fundingNeeds: string;
  description: string;
}

interface CompanyDocument {
  type: string;
  name: string;
  url: string;
  verified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
}

export default function CompanyApprovals() {
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<CompanyApplication | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, fetch from API
    const mockApplications: CompanyApplication[] = [
      {
        id: "COMP-001",
        name: "TechVision Solutions",
        registrationNumber: "REG202400123",
        industry: "Technology",
        email: "admin@techvision.com",
        phone: "+1 (555) 123-4567",
        address: "123 Tech Street, Silicon Valley, CA 94025",
        website: "https://techvision.com",
        submittedAt: "2026-04-10T09:00:00Z",
        status: "verifying",
        documents: [
          { type: "Business Registration", name: "business_registration.pdf", url: "#", verified: true, verifiedAt: "2026-04-11T10:00:00Z", verifiedBy: "Admin User" },
          { type: "Tax Compliance", name: "tax_certificate.pdf", url: "#", verified: false },
          { type: "Financial Statement", name: "financials_2025.pdf", url: "#", verified: false },
          { type: "License", name: "tech_license.pdf", url: "#", verified: true },
        ],
        teamSize: 25,
        fundingNeeds: "$500,000 for R&D expansion",
        description: "Leading provider of AI-powered business solutions serving enterprise clients globally.",
      },
      {
        id: "COMP-002",
        name: "Green Energy Initiative",
        registrationNumber: "REG202400456",
        industry: "Energy",
        email: "contact@greenenergy.org",
        phone: "+1 (555) 987-6543",
        address: "456 Green Blvd, Austin, TX 73301",
        website: "https://greenenergy.org",
        submittedAt: "2026-04-12T14:30:00Z",
        status: "pending",
        documents: [
          { type: "Business Registration", name: "green_registration.pdf", url: "#", verified: false },
          { type: "Tax Compliance", name: "tax_cert.pdf", url: "#", verified: false },
          { type: "Financial Statement", name: "financials.pdf", url: "#", verified: false },
        ],
        teamSize: 12,
        fundingNeeds: "$250,000 for solar panel installation",
        description: "Renewable energy company focused on solar solutions for residential properties.",
      },
    ];
    setApplications(mockApplications);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "verifying": return "bg-blue-100 text-blue-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const calculateVerificationProgress = (documents: CompanyDocument[]) => {
    const verified = documents.filter(d => d.verified).length;
    return { verified, total: documents.length, percentage: (verified / documents.length) * 100 };
  };

  const handleVerifyDocument = (docType: string) => {
    // In production: API call to mark document as verified
    if (selectedApp) {
      const updatedDocs = selectedApp.documents.map(doc =>
        doc.type === docType ? { ...doc, verified: true, verifiedAt: new Date().toISOString(), verifiedBy: "Current Admin" } : doc
      );
      setSelectedApp({ ...selectedApp, documents: updatedDocs });
      
      // Update in applications list
      setApplications(prev => prev.map(app =>
        app.id === selectedApp.id ? { ...app, documents: updatedDocs } : app
      ));
    }
  };

  const handleApprove = async (id: string) => {
    // In production: API call to approve company
    // Triggers smart contract for company profile creation
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status: "approved" } : app
    ));
    setSelectedApp(null);
  };

  const handleReject = async (id: string, reason: string) => {
    // In production: API call to reject with reason, send notification
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status: "rejected" } : app
    ));
    setSelectedApp(null);
  };

  const filteredApps = applications.filter(app => {
    if (filter !== "all" && app.status !== filter) return false;
    return true;
  });

  if (loading) {
    return <div className="flex justify-center py-12">Loading company applications...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-light text-slate-900" style={{ fontFamily: "'Cormorant', serif" }}>
            Company Approvals
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Verify and approve company registrations with document validation
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light text-slate-900">{applications.filter(a => a.status === "pending" || a.status === "verifying").length}</p>
          <p className="text-xs text-slate-400">Pending Review</p>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid gap-4">
        {filteredApps.map((app) => {
          const progress = calculateVerificationProgress(app.documents);
          return (
            <div
              key={app.id}
              className="bg-white border border-slate-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedApp(app)}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-slate-400" />
                    <div>
                      <h3 className="font-medium text-slate-900">{app.name}</h3>
                      <p className="text-sm text-slate-500">{app.industry} · {app.teamSize} employees</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(app.status)}`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-3 h-3" /> {app.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <FileText className="w-3 h-3" /> Reg: {app.registrationNumber}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3 h-3" /> {app.address.split(",")[0]}
                  </div>
                </div>

                {/* Document Verification Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Document Verification</span>
                    <span>{progress.verified}/{progress.total} verified</span>
                  </div>
                  <div className="h-1 bg-slate-100">
                    <div 
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50 overflow-y-auto" onClick={() => setSelectedApp(null)}>
          <div className="bg-white max-w-4xl w-full mx-4 my-8" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-5 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Company Verification</p>
                  <h3 className="text-xl font-light text-slate-900 mt-1">{selectedApp.name}</h3>
                </div>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
              {/* Company Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Registration Number</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedApp.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Industry</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedApp.industry}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Email</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Phone</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedApp.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium text-slate-500">Address</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedApp.address}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium text-slate-500">Website</p>
                  <a href={selectedApp.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2c5aa0] hover:underline mt-1 block">
                    {selectedApp.website}
                  </a>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium text-slate-500">Company Description</p>
                  <p className="text-sm text-slate-700 mt-1">{selectedApp.description}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Team Size</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedApp.teamSize} employees</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Funding Needs</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedApp.fundingNeeds}</p>
                </div>
              </div>

              {/* Documents Section */}
              <div>
                <p className="text-xs font-medium text-slate-500 mb-3">Required Documents</p>
                <div className="space-y-3">
                  {selectedApp.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">{doc.type}</p>
                            <p className="text-xs text-slate-500">{doc.name}</p>
                          </div>
                        </div>
                        {doc.verified && (
                          <p className="text-xs text-green-600 mt-1 ml-7">
                            Verified by {doc.verifiedBy} on {new Date(doc.verifiedAt!).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {!doc.verified ? (
                          <button
                            onClick={() => handleVerifyDocument(doc.type)}
                            className="px-3 py-1 text-xs bg-[#2c5aa0] text-white hover:bg-[#1e4280]"
                          >
                            Verify Document
                          </button>
                        ) : (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        )}
                        <button className="text-xs text-slate-500 hover:text-slate-700">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {(selectedApp.status === "pending" || selectedApp.status === "verifying") && (
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => handleApprove(selectedApp.id)}
                    disabled={calculateVerificationProgress(selectedApp.documents).verified !== selectedApp.documents.length}
                    className={`flex-1 px-4 py-2 flex items-center justify-center gap-2 ${
                      calculateVerificationProgress(selectedApp.documents).verified === selectedApp.documents.length
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Check className="w-4 h-4" /> Approve Company
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt("Please provide rejection reason:");
                      if (reason) handleReject(selectedApp.id, reason);
                    }}
                    className="flex-1 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" /> Reject Application
                  </button>
                </div>
              )}
              
              {calculateVerificationProgress(selectedApp.documents).verified !== selectedApp.documents.length && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" />
                  All documents must be verified before approval
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}