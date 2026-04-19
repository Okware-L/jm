// app/admin/components/AuditTrail.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Calendar, Download, Shield, User, FileText, DollarSign, Users } from "lucide-react";

interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: "approval" | "rejection" | "signature" | "transaction" | "registration" | "update" | "deletion";
  entityType: "company" | "worker" | "client" | "funding_recipient" | "document" | "transaction";
  entityId: string;
  entityName: string;
  userId: string;
  userName: string;
  action: string;
  details: Record<string, any>;
  blockchainHash: string;
  ipfsHash?: string;
}

export default function AuditTrail() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<AuditEvent[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [eventType, setEventType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, fetch from immutable ledger
    const mockEvents: AuditEvent[] = [
      {
        id: "AUDIT-001",
        timestamp: "2026-04-16T09:30:00Z",
        eventType: "approval",
        entityType: "company",
        entityId: "COMP-001",
        entityName: "TechVision Solutions",
        userId: "ADMIN-001",
        userName: "Super Admin",
        action: "Company registration approved",
        details: { approvedBy: "Super Admin", notes: "All documents verified" },
        blockchainHash: "0xabc123def456...",
      },
      {
        id: "AUDIT-002",
        timestamp: "2026-04-16T10:15:00Z",
        eventType: "signature",
        entityType: "document",
        entityId: "DOC-001",
        entityName: "Funding Agreement",
        userId: "USER-123",
        userName: "John Smith",
        action: "Document signed",
        details: { documentHash: "0xdef456...", signatureType: "digital" },
        blockchainHash: "0xdef456abc789...",
      },
      {
        id: "AUDIT-003",
        timestamp: "2026-04-16T11:00:00Z",
        eventType: "transaction",
        entityType: "transaction",
        entityId: "TX-001",
        entityName: "Yield Stake Transaction",
        userId: "RECIPIENT-001",
        userName: "Green Energy Initiative",
        action: "Staked 10,000 tokens in yield pool",
        details: { amount: 10000, poolId: "POOL-001", txHash: "0x789abc..." },
        blockchainHash: "0x789abc123def...",
      },
    ];
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...events];
    
    if (startDate) {
      filtered = filtered.filter(e => new Date(e.timestamp) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(e => new Date(e.timestamp) <= new Date(endDate));
    }
    if (eventType !== "all") {
      filtered = filtered.filter(e => e.eventType === eventType);
    }
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.action.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredEvents(filtered);
  }, [startDate, endDate, eventType, searchTerm, events]);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "approval": return <Check className="w-4 h-4 text-green-500" />;
      case "rejection": return <X className="w-4 h-4 text-red-500" />;
      case "signature": return <FileText className="w-4 h-4 text-blue-500" />;
      case "transaction": return <DollarSign className="w-4 h-4 text-yellow-500" />;
      case "registration": return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const exportAuditLog = () => {
    // In production: Export to CSV/JSON
    const dataStr = JSON.stringify(filteredEvents, null, 2);
    const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `audit_trail_${new Date().toISOString()}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return <div className="flex justify-center py-12">Loading audit trail...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-light text-slate-900" style={{ fontFamily: "'Cormorant', serif" }}>
            Audit Trail
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Immutable blockchain-backed audit log of all platform actions
          </p>
        </div>
        <button
          onClick={exportAuditLog}
          className="px-4 py-2 border border-slate-200 text-slate-600 hover:border-slate-300 flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              placeholder="Start Date"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              placeholder="End Date"
            />
          </div>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
          >
            <option value="all">All Event Types</option>
            <option value="approval">Approvals</option>
            <option value="rejection">Rejections</option>
            <option value="signature">Signatures</option>
            <option value="transaction">Transactions</option>
            <option value="registration">Registrations</option>
            <option value="update">Updates</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by entity, user, or action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
            />
          </div>
        </div>
      </div>

      {/* Audit Events Timeline */}
      <div className="space-y-3">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white border border-slate-200 hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getEventIcon(event.eventType)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-900">{event.action}</p>
                        <span className="text-xs text-slate-400">•</span>
                        <p className="text-xs text-slate-500">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{event.userName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span className="capitalize">{event.entityType}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>{event.entityName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-slate-400">{event.blockchainHash.slice(0, 16)}...</p>
                      <button className="text-xs text-[#2c5aa0] hover:underline mt-1">
                        Verify on Blockchain
                      </button>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  {Object.keys(event.details).length > 0 && (
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 text-xs">
                      <p className="font-medium text-slate-700 mb-1">Event Details:</p>
                      <pre className="text-slate-600 whitespace-pre-wrap">
                        {JSON.stringify(event.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blockchain Verification Badge */}
      <div className="bg-green-50 border border-green-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-800">Blockchain Verified</p>
            <p className="text-xs text-green-600">All audit events are immutably recorded on the blockchain</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-green-700">Total Events: {filteredEvents.length}</p>
          <p className="text-xs text-green-600">Last verified: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

// Import missing icons
import { Check, X } from "lucide-react";