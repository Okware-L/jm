// app/admin/components/DocumentOversight.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FileText, CheckCircle, Clock, XCircle, Eye, Download, Shield, Search } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploader: string;
  uploaderType: "company" | "worker" | "client" | "funding_recipient";
  uploaderId: string;
  uploadedAt: string;
  status: "pending" | "signed" | "rejected" | "expired";
  signers: Signer[];
  blockchainHash: string;
  ipfsHash: string;
  size: number;
}

interface Signer {
  id: string;
  name: string;
  email: string;
  signed: boolean;
  signedAt?: string;
  signatureHash?: string;
}

export default function DocumentOversight() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, fetch from API/IPFS
    const mockDocuments: Document[] = [
      {
        id: "DOC-001",
        name: "Funding Agreement - TechVision & Client A",
        type: "contract",
        uploader: "TechVision Solutions",
        uploaderType: "company",
        uploaderId: "COMP-001",
        uploadedAt: "2026-04-10T14:30:00Z",
        status: "pending",
        signers: [
          { id: "1", name: "John Smith", email: "john@techvision.com", signed: true, signedAt: "2026-04-11T09:00:00Z", signatureHash: "0xabc..." },
          { id: "2", name: "Client Representative", email: "client@example.com", signed: false },
        ],
        blockchainHash: "0x3f7b8a9c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
        ipfsHash: "QmX5gFvR4nLpK3sJdH2gFdS1aKjLhGfDcBvNmQwErTy",
        size: 245760,
      },
      {
        id: "DOC-002",
        name: "Service Agreement - Green Energy",
        type: "service_contract",
        uploader: "Green Energy Initiative",
        uploaderType: "company",
        uploaderId: "COMP-002",
        uploadedAt: "2026-04-12T11:00:00Z",
        status: "signed",
        signers: [
          { id: "1", name: "Sarah Green", email: "sarah@greenenergy.org", signed: true, signedAt: "2026-04-12T15:30:00Z", signatureHash: "0xdef..." },
          { id: "2", name: "Service Provider", email: "provider@example.com", signed: true, signedAt: "2026-04-13T10:00:00Z", signatureHash: "0xghi..." },
        ],
        blockchainHash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
        ipfsHash: "QmWpLkJsHdFgSdFgHjKlZxVcBnMqWeRtYuIoP",
        size: 189440,
      },
    ];
    setDocuments(mockDocuments);
    setLoading(false);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "signed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected": return <XCircle className="w-4 h-4 text-red-500" />;
      case "expired": return <Clock className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "signed": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      case "expired": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const verifyBlockchain = (hash: string) => {
    // In production: Query blockchain for verification
    console.log(`Verifying document hash ${hash} on blockchain`);
    alert(`Verifying document on blockchain...\nHash: ${hash}\nStatus: Valid ✓`);
  };

  const filteredDocs = documents.filter(doc => {
    if (filter !== "all" && doc.status !== filter) return false;
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return <div className="flex justify-center py-12">Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-light text-slate-900" style={{ fontFamily: "'Cormorant', serif" }}>
          Document Oversight
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Monitor all documents, signatures, and blockchain verification across the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Total Documents</p>
          <p className="text-2xl font-light text-slate-900 mt-1">{documents.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Pending Signature</p>
          <p className="text-2xl font-light text-yellow-600 mt-1">{documents.filter(d => d.status === "pending").length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Signed & Verified</p>
          <p className="text-2xl font-light text-green-600 mt-1">{documents.filter(d => d.status === "signed").length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Blockchain Verified</p>
          <p className="text-2xl font-light text-blue-600 mt-1">{documents.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
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
          <option value="all">All Documents</option>
          <option value="pending">Pending Signature</option>
          <option value="signed">Signed</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-slate-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Document</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Uploader</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Signatures</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Blockchain</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">{formatFileSize(doc.size)} · {doc.type.replace("_", " ")}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-slate-700">{doc.uploader}</p>
                  <p className="text-xs text-slate-500 capitalize">{doc.uploaderType.replace("_", " ")}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-slate-700">{doc.signers.filter(s => s.signed).length}/{doc.signers.length} signed</p>
                  <p className="text-xs text-slate-500">{new Date(doc.uploadedAt).toLocaleDateString()}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                    {doc.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => verifyBlockchain(doc.blockchainHash)}
                    className="flex items-center gap-1 text-xs text-[#2c5aa0] hover:underline"
                  >
                    <Shield className="w-3 h-3" /> Verify
                  </button>
                  <p className="text-xs font-mono text-slate-400 mt-1">{doc.blockchainHash.slice(0, 10)}...</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50 overflow-y-auto" onClick={() => setSelectedDoc(null)}>
          <div className="bg-white max-w-4xl w-full mx-4 my-8" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-5 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Document Details</p>
                  <h3 className="text-xl font-light text-slate-900 mt-1">{selectedDoc.name}</h3>
                </div>
                <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Document Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Document Type</p>
                  <p className="text-sm text-slate-900 mt-1 capitalize">{selectedDoc.type.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Uploaded By</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedDoc.uploader} ({selectedDoc.uploaderType})</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Uploaded On</p>
                  <p className="text-sm text-slate-900 mt-1">{new Date(selectedDoc.uploadedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">File Size</p>
                  <p className="text-sm text-slate-900 mt-1">{formatFileSize(selectedDoc.size)}</p>
                </div>
              </div>

              {/* Signatures */}
              <div>
                <p className="text-xs font-medium text-slate-500 mb-3">Signature Status</p>
                <div className="space-y-2">
                  {selectedDoc.signers.map((signer) => (
                    <div key={signer.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{signer.name}</p>
                        <p className="text-xs text-slate-500">{signer.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {signer.signed ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600">Signed {signer.signedAt && new Date(signer.signedAt).toLocaleString()}</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs text-yellow-600">Awaiting Signature</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blockchain Verification */}
              <div className="bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Blockchain Verification</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-500">Document Hash</p>
                    <p className="text-xs font-mono text-slate-700 break-all">{selectedDoc.blockchainHash}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">IPFS Hash</p>
                    <p className="text-xs font-mono text-slate-700 break-all">{selectedDoc.ipfsHash}</p>
                  </div>
                  <button
                    onClick={() => verifyBlockchain(selectedDoc.blockchainHash)}
                    className="mt-2 px-3 py-1 text-xs bg-[#2c5aa0] text-white hover:bg-[#1e4280]"
                  >
                    Verify on Blockchain
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button className="flex-1 px-4 py-2 bg-[#2c5aa0] text-white hover:bg-[#1e4280] flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Document
                </button>
                {selectedDoc.status === "pending" && (
                  <button className="flex-1 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50">
                    Flag for Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}