// app/admin/components/ErrorMonitoring.tsx
"use client";

import React, { useState } from "react";

interface ErrorEvent {
  id: string;
  timestamp: string;
  severity: "P0" | "P1" | "P2" | "P3" | "P4";
  message: string;
  userImpact: string;
  status: "open" | "investigating" | "resolved";
}

export default function ErrorMonitoring() {
  const [selectedError, setSelectedError] = useState<ErrorEvent | null>(null);
  
  // Mock error data - in production, fetch from API
  const errors: ErrorEvent[] = [
    {
      id: "ERR-001",
      timestamp: "2026-04-16T10:32:45Z",
      severity: "P0",
      message: "Authentication service failure - 5 failed attempts",
      userImpact: "1 user affected",
      status: "investigating",
    },
    {
      id: "ERR-002",
      timestamp: "2026-04-16T10:31:00Z",
      severity: "P1",
      message: "Database connection pool at 85% capacity",
      userImpact: "Potential slowdown",
      status: "open",
    },
    {
      id: "ERR-003",
      timestamp: "2026-04-16T10:28:15Z",
      severity: "P2",
      message: "Smart contract sync delay - 2.8s avg",
      userImpact: "Minor delay in transaction confirmation",
      status: "resolved",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "P0": return "bg-red-500 text-white";
      case "P1": return "bg-orange-500 text-white";
      case "P2": return "bg-yellow-500 text-white";
      case "P3": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-700 border-red-200";
      case "investigating": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-green-100 text-green-700 border-green-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-light text-slate-900" style={{ fontFamily: "'Cormorant', serif" }}>
            Error Monitoring System
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time error tracking with P0-P4 severity classification and automated escalation
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs border border-slate-200 text-slate-600 hover:border-slate-300">
            Export Logs
          </button>
          <button className="px-4 py-2 text-xs bg-[#2c5aa0] text-white hover:bg-[#1e4280]">
            Configure Alerts
          </button>
        </div>
      </div>

      {/* Error Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Active Errors</p>
          <p className="text-3xl font-light text-slate-900 mt-2">3</p>
          <p className="text-xs text-red-500 mt-1">↑ 2 from yesterday</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Critical (P0)</p>
          <p className="text-3xl font-light text-slate-900 mt-2">1</p>
          <p className="text-xs text-orange-500 mt-1">Requires immediate action</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Avg Resolution Time</p>
          <p className="text-3xl font-light text-slate-900 mt-2">24m</p>
          <p className="text-xs text-green-500 mt-1">↓ 12m from SLA</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Platform Uptime</p>
          <p className="text-3xl font-light text-slate-900 mt-2">99.94%</p>
          <p className="text-xs text-green-500 mt-1">Last 30 days</p>
        </div>
      </div>

      {/* Live Error Stream */}
      <div className="bg-slate-900 border border-slate-800">
        <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Live Error Stream</p>
          </div>
          <button className="text-[10px] text-slate-500 hover:text-slate-300">PAUSE</button>
        </div>
        <div className="p-4 space-y-2 font-mono text-xs max-h-96 overflow-y-auto">
          {errors.map((error) => (
            <div
              key={error.id}
              className="flex items-start gap-3 p-2 hover:bg-slate-800 cursor-pointer"
              onClick={() => setSelectedError(error)}
            >
              <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${getSeverityColor(error.severity)}`}>
                {error.severity}
              </span>
              <span className="text-slate-500">{new Date(error.timestamp).toLocaleTimeString()}</span>
              <span className="text-slate-300 flex-1">{error.message}</span>
              <span className={`px-2 py-0.5 text-[9px] rounded border ${getStatusColor(error.status)}`}>
                {error.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Details Modal */}
      {selectedError && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50" onClick={() => setSelectedError(null)}>
          <div className="bg-white max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Error Details</p>
                  <h3 className="text-xl font-light text-slate-900 mt-1">{selectedError.id}</h3>
                </div>
                <button onClick={() => setSelectedError(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Message</p>
                <p className="text-sm text-slate-900 mt-1">{selectedError.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Severity</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${getSeverityColor(selectedError.severity)}`}>
                    {selectedError.severity}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Status</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded border ${getStatusColor(selectedError.status)}`}>
                    {selectedError.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">User Impact</p>
                <p className="text-sm text-slate-900 mt-1">{selectedError.userImpact}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Stack Trace</p>
                <pre className="mt-1 p-3 bg-slate-50 text-xs text-slate-600 overflow-x-auto">
                  at AuthService.authenticate (auth.js:124)
                  at LoginController.handle (controller.js:45)
                </pre>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button className="px-4 py-2 text-xs bg-[#2c5aa0] text-white hover:bg-[#1e4280]">
                  Mark Resolved
                </button>
                <button className="px-4 py-2 text-xs border border-slate-200 text-slate-600 hover:border-slate-300">
                  Create Ticket
                </button>
                <button className="px-4 py-2 text-xs border border-red-200 text-red-600 hover:bg-red-50">
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}