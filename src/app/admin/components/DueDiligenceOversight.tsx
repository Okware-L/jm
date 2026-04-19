// app/admin/components/DueDiligenceOversight.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Eye, AlertTriangle, FileCheck, Clock, User, Calendar, Download } from "lucide-react";

interface DueDiligenceCase {
  id: string;
  companyName: string;
  companyId: string;
  initiatedAt: string;
  status: "pending" | "in_progress" | "completed" | "failed" | "escalated";
  priority: "low" | "medium" | "high" | "critical";
  assignedTo: string;
  checklist: ChecklistItem[];
  findings: string;
  finalReport?: string;
}

interface ChecklistItem {
  id: string;
  name: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  notes?: string;
  completedAt?: string;
  completedBy?: string;
}

export default function DueDiligenceOversight() {
  const [cases, setCases] = useState<DueDiligenceCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<DueDiligenceCase | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, fetch from API
    const mockCases: DueDiligenceCase[] = [
      {
        id: "DD-001",
        companyName: "TechVision Solutions",
        companyId: "COMP-001",
        initiatedAt: "2026-04-10T10:00:00Z",
        status: "in_progress",
        priority: "high",
        assignedTo: "Sarah Johnson",
        checklist: [
          { id: "1", name: "Business Registration Verification", status: "completed", completedAt: "2026-04-11T09:00:00Z", completedBy: "Admin" },
          { id: "2", name: "Tax Compliance Check", status: "in_progress", notes: "Awaiting latest tax returns" },
          { id: "3", name: "Financial Statements Review", status: "pending" },
          { id: "4", name: "Background Checks", status: "completed", completedAt: "2026-04-12T14:00:00Z", completedBy: "Admin" },
          { id: "5", name: "Industry Licenses Validation", status: "pending" },
          { id: "6", name: "References Contacted", status: "pending" },
        ],
        findings: "Initial review shows good standing. Pending financial statements for final assessment.",
      },
      {
        id: "DD-002",
        companyName: "Green Energy Initiative",
        companyId: "COMP-002",
        initiatedAt: "2026-04-12T14:30:00Z",
        status: "pending",
        priority: "medium",
        assignedTo: "Unassigned",
        checklist: [
          { id: "1", name: "Business Registration Verification", status: "pending" },
          { id: "2", name: "Tax Compliance Check", status: "pending" },
          { id: "3", name: "Financial Statements Review", status: "pending" },
          { id: "4", name: "Background Checks", status: "pending" },
          { id: "5", name: "Industry Licenses Validation", status: "pending" },
        ],
        findings: "",
      },
    ];
    setCases(mockCases);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "in_progress": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-green-100 text-green-700";
      case "failed": return "bg-red-100 text-red-700";
      case "escalated": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "text-gray-500";
      case "medium": return "text-yellow-600";
      case "high": return "text-orange-600";
      case "critical": return "text-red-600";
      default: return "text-gray-500";
    }
  };

  const calculateProgress = (checklist: ChecklistItem[]) => {
    const completed = checklist.filter(c => c.status === "completed").length;
    return { completed, total: checklist.length, percentage: (completed / checklist.length) * 100 };
  };

  const updateChecklistItem = (caseId: string, itemId: string, status: ChecklistItem["status"], notes?: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updatedChecklist = c.checklist.map(item =>
          item.id === itemId ? { 
            ...item, 
            status, 
            notes: notes || item.notes,
            completedAt: status === "completed" ? new Date().toISOString() : item.completedAt,
            completedBy: status === "completed" ? "Current Admin" : item.completedBy
          } : item
        );
        const allCompleted = updatedChecklist.every(item => item.status === "completed");
        const newStatus = allCompleted ? "completed" : c.status;
        
        return { ...c, checklist: updatedChecklist, status: newStatus };
      }
      return c;
    }));
  };

  const generateFinalReport = (caseId: string) => {
    // In production: Generate PDF report
    console.log(`Generating final report for case ${caseId}`);
    setCases(prev => prev.map(c =>
      c.id === caseId ? { 
        ...c, 
        status: "completed",
        finalReport: `dd_report_${caseId}.pdf`,
        findings: c.findings + "\n\nFinal assessment completed. Company approved for funding."
      } : c
    ));
  };

  const filteredCases = cases.filter(c => {
    if (filter !== "all" && c.status !== filter) return false;
    return true;
  });

  if (loading) {
    return <div className="flex justify-center py-12">Loading due diligence cases...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-light text-slate-900" style={{ fontFamily: "'Cormorant', serif" }}>
          Due Diligence Oversight
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage and monitor due diligence cases across all companies
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Active Cases</p>
          <p className="text-2xl font-light text-slate-900 mt-1">{cases.filter(c => c.status !== "completed").length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">In Progress</p>
          <p className="text-2xl font-light text-slate-900 mt-1">{cases.filter(c => c.status === "in_progress").length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Completed</p>
          <p className="text-2xl font-light text-slate-900 mt-1">{cases.filter(c => c.status === "completed").length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Escalated</p>
          <p className="text-2xl font-light text-slate-900 mt-1">{cases.filter(c => c.status === "escalated").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
        >
          <option value="all">All Cases</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="escalated">Escalated</option>
        </select>
      </div>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.map((case_) => {
          const progress = calculateProgress(case_.checklist);
          return (
            <div
              key={case_.id}
              className="bg-white border border-slate-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedCase(case_)}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck className="w-4 h-4 text-slate-400" />
                      <h3 className="font-medium text-slate-900">{case_.companyName}</h3>
                      <span className={`text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                        {case_.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Case ID: {case_.id}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(case_.status)}`}>
                    {case_.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="w-3 h-3" /> Assigned: {case_.assignedTo}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-3 h-3" /> Initiated: {new Date(case_.initiatedAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Due Diligence Progress</span>
                    <span>{progress.completed}/{progress.total} items</span>
                  </div>
                  <div className="h-1.5 bg-slate-100">
                    <div 
                      className="h-full bg-[#2c5aa0] transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                {case_.findings && (
                  <p className="text-xs text-slate-500 mt-3 line-clamp-2">{case_.findings}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50 overflow-y-auto" onClick={() => setSelectedCase(null)}>
          <div className="bg-white max-w-4xl w-full mx-4 my-8" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-6 py-5 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Due Diligence Case</p>
                  <h3 className="text-xl font-light text-slate-900 mt-1">{selectedCase.companyName}</h3>
                </div>
                <button onClick={() => setSelectedCase(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
              {/* Case Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Case ID</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedCase.id}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Priority</p>
                  <p className={`text-sm font-medium mt-1 ${getPriorityColor(selectedCase.priority)}`}>
                    {selectedCase.priority.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Assigned To</p>
                  <p className="text-sm text-slate-900 mt-1">{selectedCase.assignedTo}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Initiated</p>
                  <p className="text-sm text-slate-900 mt-1">{new Date(selectedCase.initiatedAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <p className="text-xs font-medium text-slate-500 mb-3">Due Diligence Checklist</p>
                <div className="space-y-2">
                  {selectedCase.checklist.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 border border-slate-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-slate-700">{item.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              item.status === "completed" ? "bg-green-100 text-green-700" :
                              item.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                              item.status === "failed" ? "bg-red-100 text-red-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {item.status.replace("_", " ").toUpperCase()}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-xs text-slate-500 mt-1">{item.notes}</p>
                          )}
                          {item.completedAt && (
                            <p className="text-xs text-green-600 mt-1">
                              Completed by {item.completedBy} on {new Date(item.completedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {item.status !== "completed" && (
                            <>
                              <button
                                onClick={() => updateChecklistItem(selectedCase.id, item.id, "in_progress")}
                                className="px-2 py-1 text-xs border border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                Start
                              </button>
                              <button
                                onClick={() => {
                                  const notes = prompt("Add completion notes:");
                                  updateChecklistItem(selectedCase.id, item.id, "completed", notes || undefined);
                                }}
                                className="px-2 py-1 text-xs border border-green-200 text-green-600 hover:bg-green-50"
                              >
                                Complete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Findings */}
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">Findings & Notes</p>
                <textarea
                  value={selectedCase.findings}
                  onChange={(e) => {
                    const updated = { ...selectedCase, findings: e.target.value };
                    setSelectedCase(updated);
                    setCases(prev => prev.map(c => c.id === selectedCase.id ? updated : c));
                  }}
                  rows={4}
                  className="w-full p-3 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
                  placeholder="Record findings and observations..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                {selectedCase.status !== "completed" && (
                  <button
                    onClick={() => {
                      if (calculateProgress(selectedCase.checklist).completed === selectedCase.checklist.length) {
                        generateFinalReport(selectedCase.id);
                      } else {
                        alert("Please complete all checklist items before generating final report.");
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <FileCheck className="w-4 h-4" /> Generate Final Report
                  </button>
                )}
                <button
                  onClick={() => {
                    setCases(prev => prev.map(c =>
                      c.id === selectedCase.id ? { ...c, status: "escalated" } : c
                    ));
                    setSelectedCase(null);
                  }}
                  className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" /> Escalate Case
                </button>
                {selectedCase.finalReport && (
                  <button className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Report
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