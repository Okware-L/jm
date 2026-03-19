"use client";

import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

interface Transaction {
  id: string;
  type: "stake" | "unstake" | "fund" | "reward" | "transfer" | "contract";
  fromWallet?: string;
  toWallet?: string;
  amount: number;
  currency: string;
  status: "confirmed" | "pending" | "failed";
  blockNumber?: number;
  txHash?: string;
  userId?: string;
  userLabel?: string;
  createdAt: Timestamp | null;
}

interface YieldPool {
  id: string;
  name: string;
  apy: number;
  totalStaked: number;
  currency: string;
  duration: number;
  active: boolean;
  participantCount: number;
  createdAt: Timestamp | null;
}

const TX_STATUS_STYLES = {
  confirmed: "border-emerald-300 text-emerald-700 bg-emerald-50",
  pending:   "border-amber-300 text-amber-700 bg-amber-50",
  failed:    "border-red-300 text-red-600 bg-red-50",
};

const TX_TYPE_LABELS = {
  stake:    "Stake",
  unstake:  "Unstake",
  fund:     "Funding",
  reward:   "Reward",
  transfer: "Transfer",
  contract: "Contract",
};

const short = (addr?: string) =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "—";

export default function BlockchainMonitoring() {
  const db = getFirestore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [yieldPools, setYieldPools] = useState<YieldPool[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [loadingPools, setLoadingPools] = useState(true);
  const [activeTab, setActiveTab] = useState<"transactions" | "pools">("transactions");
  const [txFilter, setTxFilter] = useState<Transaction["status"] | "all">("all");

  useEffect(() => {
    const q = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc"),
      limit(100)
    );
    const unsub = onSnapshot(q, (snap) => {
      setTransactions(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction)));
      setLoadingTx(false);
    });
    return () => unsub();
  }, [db]);

  useEffect(() => {
    const q = query(collection(db, "yield_pools"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setYieldPools(snap.docs.map((d) => ({ id: d.id, ...d.data() } as YieldPool)));
      setLoadingPools(false);
    });
    return () => unsub();
  }, [db]);

  const filteredTx =
    txFilter === "all" ? transactions : transactions.filter((t) => t.status === txFilter);

  const totalStaked = yieldPools.reduce((a, p) => a + (p.totalStaked || 0), 0);
  const confirmedCount = transactions.filter((t) => t.status === "confirmed").length;
  const pendingCount = transactions.filter((t) => t.status === "pending").length;
  const failedCount = transactions.filter((t) => t.status === "failed").length;

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "—";
    return ts.toDate().toLocaleString("en-KE", {
      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
          Blockchain Monitoring
          <span className="inline-block ml-3 h-px w-12 bg-slate-200 align-middle" />
        </p>
        <h2 className="font-['Cormorant'] font-light text-3xl text-slate-900 tracking-tight">
          Transactions & Yield Pools
        </h2>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-[#2c5aa0]">{transactions.length}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Total Transactions</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-emerald-600">{confirmedCount}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Confirmed</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-amber-600">{pendingCount}</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Pending</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-2xl font-['Cormorant'] font-light text-slate-600">
            {totalStaked.toLocaleString()}
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">Total Value Locked</p>
        </div>
      </div>

      {/* Network Health Banner */}
      <div className="border border-slate-200 bg-slate-50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.16em] text-slate-600">Network: Polygon (Layer 2)</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Avg Gas</p>
            <p className="text-xs text-slate-600 font-mono">~$0.002</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Block Time</p>
            <p className="text-xs text-slate-600 font-mono">2.1s</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Failed</p>
            <p className="text-xs text-red-500 font-mono">{failedCount}</p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-6 border-b border-slate-200">
        {[
          { key: "transactions", label: "Transaction Log" },
          { key: "pools", label: "Yield Pools" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as typeof activeTab)}
            className={`text-[11px] uppercase tracking-[0.14em] pb-3 transition-colors border-b-2 -mb-px ${
              activeTab === t.key
                ? "border-[#2c5aa0] text-[#2c5aa0]"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="space-y-4">
          {/* Status filter */}
          <div className="flex gap-3">
            {(["all", "confirmed", "pending", "failed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTxFilter(f)}
                className={`text-[10px] uppercase tracking-[0.14em] px-3 py-1 border transition-colors ${
                  txFilter === f
                    ? "border-[#2c5aa0] text-[#2c5aa0] bg-[#2c5aa0]/5"
                    : "border-slate-200 text-slate-400 hover:border-slate-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {loadingTx ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 border border-slate-200 bg-slate-50 animate-pulse" />
              ))}
            </div>
          ) : filteredTx.length === 0 ? (
            <div className="py-12 text-center border border-slate-200">
              <p className="font-['Cormorant'] font-light text-2xl text-slate-400">No transactions recorded</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-300 mt-2">
                Transactions will appear as the platform processes activity
              </p>
            </div>
          ) : (
            <div className="border border-slate-200">
              <div className="grid grid-cols-12 px-4 py-3 bg-slate-50 border-b border-slate-200">
                {["Type", "From", "To", "Amount", "Status", "Time"].map((h, i) => (
                  <div
                    key={h}
                    className={`text-[10px] uppercase tracking-[0.16em] text-slate-400 ${
                      i === 0 ? "col-span-2" : i === 1 ? "col-span-2" : i === 2 ? "col-span-2" : i === 3 ? "col-span-2" : i === 4 ? "col-span-2" : "col-span-2"
                    }`}
                  >
                    {h}
                  </div>
                ))}
              </div>
              {filteredTx.map((tx, idx) => (
                <div
                  key={tx.id}
                  className={`grid grid-cols-12 px-4 py-3 items-center hover:bg-slate-50 transition-colors text-sm ${
                    idx !== filteredTx.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div className="col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.12em] border border-slate-200 px-2 py-0.5 text-slate-500">
                      {TX_TYPE_LABELS[tx.type] || tx.type}
                    </span>
                  </div>
                  <div className="col-span-2 font-mono text-xs text-slate-500 truncate">{short(tx.fromWallet)}</div>
                  <div className="col-span-2 font-mono text-xs text-slate-500 truncate">{short(tx.toWallet)}</div>
                  <div className="col-span-2">
                    <span className="font-['Cormorant'] text-base text-slate-800">{(tx.amount || 0).toLocaleString()}</span>
                    <span className="text-xs text-slate-400 ml-1">{tx.currency || "USD"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 border ${TX_STATUS_STYLES[tx.status]}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="col-span-2 text-xs text-slate-400">{formatDate(tx.createdAt)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Yield Pools Tab */}
      {activeTab === "pools" && (
        <div className="space-y-4">
          {loadingPools ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 border border-slate-200 bg-slate-50 animate-pulse" />
              ))}
            </div>
          ) : yieldPools.length === 0 ? (
            <div className="py-12 text-center border border-slate-200">
              <p className="font-['Cormorant'] font-light text-2xl text-slate-400">No yield pools configured</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-300 mt-2">
                Pools are created via smart contract deployment
              </p>
            </div>
          ) : (
            <div className="space-y-px">
              {yieldPools.map((pool) => (
                <div key={pool.id} className="border border-slate-200 bg-white px-6 py-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-['Cormorant'] text-xl font-light text-slate-900">{pool.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Duration: {pool.duration || "—"} days · {pool.participantCount || 0} participants
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 border ${pool.active ? "border-emerald-300 text-emerald-700 bg-emerald-50" : "border-slate-200 text-slate-400"}`}>
                        {pool.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">APY</p>
                      <p className="font-['Cormorant'] text-2xl font-light text-[#2c5aa0]">{pool.apy || 0}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">Total Staked</p>
                      <p className="font-['Cormorant'] text-2xl font-light text-slate-700">
                        {(pool.totalStaked || 0).toLocaleString()}
                        <span className="text-sm text-slate-400 ml-1">{pool.currency || "USD"}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">Created</p>
                      <p className="text-sm text-slate-600">{formatDate(pool.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Smart contract note */}
          <div className="border border-dashed border-slate-200 px-5 py-4 flex items-center gap-3">
            <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p className="text-[11px] text-slate-400">
              New yield pools are deployed via Solidity smart contracts on Polygon. Contact your blockchain developer to create a new pool.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}