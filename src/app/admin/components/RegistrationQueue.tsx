// app/admin/components/RegistrationQueue.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Check, X, Eye, Clock, AlertCircle, Upload } from "lucide-react";

interface RegistrationRequest {
  id: string;
  type: "company" | "worker" | "client" | "funding_recipient";
  name: string;
  email: string;
  submittedAt: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  documents: Document[];
  companyId?: string;
  walletAddress?: string;
}

interface Document {
  name: string;
  url: string;
  verified: boolean;
}

export default function RegistrationQueue() {
  const [requests, setRequests] = useState<RegistrationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock data - in production, fetch from API
  useEffect(() => {
    const mockRequests: RegistrationRequest[] = [
      {
        id: "REG-001",
        type: "company",
        name: "TechVision Solutions",
        email: "admin@techvision.com",
        submittedAt: "2026-04-15T10:30:00Z",
        status: "pending",
        documents: [
          { name: "Business Registration.pdf", url: "#", verified: false },
          { name: "Tax Certificate.pdf", url: "#", verified: false },
        ],
        walletAddress: "0x3f7b...e2a5",
      },
      {
        id: "REG-002",
        type: "worker",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        submittedAt: "2026-04-15T14:20:00Z",
        status: "under_review",
        documents: [
          { name: "Resume.pdf", url: "#", verified: true },
          { name: "Certification.pdf", url: "#", verified: false },
        ],
        companyId: "COMP-001",
      },
      {
        id: "REG-003",
        type: "funding_recipient",
        name: "Green Energy Initiative",
        email: "funding@greenenergy.org",
        submittedAt: "2026-04-16T09:15:00Z",
        status: "pending",
        documents: [
          { name: "Project Proposal.pdf", url: "#", verified: false },
          { name: "Financial Statement.pdf", url: "#", verified: false },
        ],
        walletAddress: "0x8d2a...f4b1",
      },
    ];
    setRequests(mockRequests);
    setLoading(false);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "company": return "🏢";
      case "worker": return "👤";
      case "client": return "👥";
      case "funding_recipient": return "💰";
      default: return "📝";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "under_review": return "bg-blue-100 text-blue-700 border-blue-200";
      case "approved": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleApprove = async (id: string) => {
    // In production: API call to approve registration
    // Triggers smart contract for wallet creation
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: "approved" } : req
    ));
    setSelectedRequest(null);
  };

  const handleReject = async (id: string, reason: string) => {
    // In production: API call to reject with reason
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: "rejected" } : req
    ));
    setSelectedRequest(null);
  };

  const filteredRequests = requests.filter(req => {
    if (filter !== "all" && req.status !== filter) return false;
    if (searchTerm && !req.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return <div className="flex justify-center py-12">Loading registration queue...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-light text-slate-900" style={{ fontFamily: "'Cormorant', serif" }}>
            Registration Queue
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage pending registrations for companies, workers, clients, and funding recipients
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light text-slate-900">{requests.filter(r => r.status === "pending").length}</p>
          <p className="text-xs text-slate-400">Pending Approvals</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
            onClick={() => setSelectedRequest(request)}
          >
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl">{getTypeIcon(request.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-slate-900">{request.name}</p>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                      {request.type.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{request.email}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Submitted: {new Date(request.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(request.status)}`}>
                  {request.status.replace("_", " ").toUpperCase()}
                </span>
                <Eye className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50" onClick={() => setSelectedRequest(null)}>
          <div className="bg-white max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-5 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Registration Details</p>
                  <h3 className="text-xl font-light text-slate-900 mt-1">{selectedRequest.name}</h3>
                </div>
                <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Registration Type</p>
                  <p className="text-sm text-slate-900 mt-1 capitalize">{selectedRequest.type.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Email</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedRequest.email}</p>
                </div>
                {selectedRequest.walletAddress && (
                  <div>
                    <p className="text-xs font-medium text-slate-500">Wallet Address</p>
                    <p className="text-sm font-mono text-slate-900 mt-1">{selectedRequest.walletAddress}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-slate-500">Submitted</p>
                  <p className="text-sm text-slate-900 mt-1">{new Date(selectedRequest.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <p className="text-xs font-medium text-slate-500 mb-3">Required Documents</p>
                <div className="space-y-2">
                  {selectedRequest.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <Upload className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {doc.verified ? (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <button className="text-xs text-[#2c5aa0] hover:underline">Verify</button>
                        )}
                        <button className="text-xs text-slate-500 hover:text-slate-700">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedRequest.status === "pending" || selectedRequest.status === "under_review" ? (
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Approve Registration
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt("Please provide rejection reason:");
                      if (reason) handleReject(selectedRequest.id, reason);
                    }}
                    className="flex-1 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              ) : selectedRequest.status === "approved" ? (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm">
                  ✓ Registration approved on {new Date().toLocaleDateString()}
                </div>
              ) : selectedRequest.status === "rejected" ? (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                  ✗ Registration rejected
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}