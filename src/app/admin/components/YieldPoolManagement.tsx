// app/admin/components/YieldPoolManagement.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, TrendingUp, Users, DollarSign, Clock, BarChart3 } from "lucide-react";

interface YieldPool {
  id: string;
  name: string;
  description: string;
  apy: number;
  tvl: number;
  stakers: number;
  duration: number; // in days
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "ended" | "paused";
  minStake: number;
  maxStake: number;
  totalRewards: number;
  distributedRewards: number;
}

export default function YieldPoolManagement() {
  const [pools, setPools] = useState<YieldPool[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPool, setEditingPool] = useState<YieldPool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, fetch from blockchain/smart contract
    const mockPools: YieldPool[] = [
      {
        id: "POOL-001",
        name: "High Yield Staking Pool",
        description: "Earn competitive yields by staking platform tokens",
        apy: 12.5,
        tvl: 847231,
        stakers: 47,
        duration: 90,
        startDate: "2026-04-01T00:00:00Z",
        endDate: "2026-06-30T23:59:59Z",
        status: "active",
        minStake: 100,
        maxStake: 50000,
        totalRewards: 250000,
        distributedRewards: 45230,
      },
      {
        id: "POOL-002",
        name: "Community Growth Pool",
        description: "Support platform growth with flexible staking terms",
        apy: 8.75,
        tvl: 123450,
        stakers: 23,
        duration: 30,
        startDate: "2026-05-01T00:00:00Z",
        endDate: "2026-05-31T23:59:59Z",
        status: "upcoming",
        minStake: 50,
        maxStake: 10000,
        totalRewards: 50000,
        distributedRewards: 0,
      },
    ];
    setPools(mockPools);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "upcoming": return "bg-blue-100 text-blue-700";
      case "ended": return "bg-gray-100 text-gray-700";
      case "paused": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatTVL = (tvl: number) => {
    if (tvl >= 1000000) return `$${(tvl / 1000000).toFixed(2)}M`;
    if (tvl >= 1000) return `$${(tvl / 1000).toFixed(2)}K`;
    return `$${tvl}`;
  };

  const handleCreatePool = (poolData: Partial<YieldPool>) => {
    // In production: Deploy new smart contract for yield pool
    const newPool: YieldPool = {
      id: `POOL-${Date.now()}`,
      name: poolData.name!,
      description: poolData.description!,
      apy: poolData.apy!,
      tvl: 0,
      stakers: 0,
      duration: poolData.duration!,
      startDate: poolData.startDate!,
      endDate: poolData.endDate!,
      status: "upcoming",
      minStake: poolData.minStake!,
      maxStake: poolData.maxStake!,
      totalRewards: poolData.totalRewards!,
      distributedRewards: 0,
    };
    setPools(prev => [...prev, newPool]);
    setShowCreateModal(false);
  };

  const handleUpdatePool = (poolId: string, updates: Partial<YieldPool>) => {
    // In production: Update smart contract parameters
    setPools(prev => prev.map(pool =>
      pool.id === poolId ? { ...pool, ...updates } : pool
    ));
    setEditingPool(null);
  };

  const handleToggleStatus = async (poolId: string, currentStatus: string) => {
    // In production: Pause/resume smart contract
    const newStatus = currentStatus === "active" ? "paused" : "active";
    setPools(prev => prev.map(pool =>
      pool.id === poolId ? { ...pool, status: newStatus } : pool
    ));
  };

  if (loading) {
    return <div className="flex justify-center py-12">Loading yield pools...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-light text-slate-900" style={{ fontFamily: "'Cormorant', serif" }}>
            Yield Pool Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage yield farming pools with smart contract integration
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#2c5aa0] text-white hover:bg-[#1e4280] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Pool
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Total Value Locked</p>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-light text-slate-900">${pools.reduce((sum, p) => sum + p.tvl, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Active Stakers</p>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-light text-slate-900">{pools.reduce((sum, p) => sum + p.stakers, 0)}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Avg APY</p>
            <BarChart3 className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-light text-slate-900">{(pools.reduce((sum, p) => sum + p.apy, 0) / pools.length).toFixed(1)}%</p>
        </div>
        <div className="bg-white border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Total Rewards</p>
            <DollarSign className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-light text-slate-900">${pools.reduce((sum, p) => sum + p.totalRewards, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Pools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pools.map((pool) => (
          <div key={pool.id} className="bg-white border border-slate-200">
            <div className="p-5 border-b border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-slate-900">{pool.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{pool.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getStatusColor(pool.status)}`}>
                  {pool.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">APY</p>
                  <p className="text-xl font-light text-green-600">{pool.apy}%</p>
                </div>
                <div>
                  <p className="text-slate-500">TVL</p>
                  <p className="text-xl font-light text-slate-900">{formatTVL(pool.tvl)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Stakers</p>
                  <p className="text-slate-900">{pool.stakers}</p>
                </div>
                <div>
                  <p className="text-slate-500">Duration</p>
                  <p className="text-slate-900">{pool.duration} days</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Rewards Distributed</span>
                  <span>${pool.distributedRewards.toLocaleString()} / ${pool.totalRewards.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-slate-100">
                  <div 
                    className="h-full bg-[#2c5aa0] transition-all"
                    style={{ width: `${(pool.distributedRewards / pool.totalRewards) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPool(pool)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 text-slate-600 hover:border-slate-300 flex items-center justify-center gap-1"
                >
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(pool.id, pool.status)}
                  className={`flex-1 px-3 py-2 text-xs ${
                    pool.status === "active"
                      ? "border border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                      : pool.status === "paused"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "border border-slate-200 text-slate-400 cursor-not-allowed"
                  } flex items-center justify-center gap-1`}
                  disabled={pool.status === "ended" || pool.status === "upcoming"}
                >
                  {pool.status === "active" ? "Pause" : pool.status === "paused" ? "Resume" : "Not Available"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingPool) && (
        <CreateEditPoolModal
          pool={editingPool}
          onClose={() => {
            setShowCreateModal(false);
            setEditingPool(null);
          }}
          onSave={(data) => {
            if (editingPool) {
              handleUpdatePool(editingPool.id, data);
            } else {
              handleCreatePool(data);
            }
          }}
        />
      )}
    </div>
  );
}

function CreateEditPoolModal({ pool, onClose, onSave }: { pool?: YieldPool | null; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: pool?.name || "",
    description: pool?.description || "",
    apy: pool?.apy || 10,
    duration: pool?.duration || 30,
    minStake: pool?.minStake || 100,
    maxStake: pool?.maxStake || 50000,
    totalRewards: pool?.totalRewards || 100000,
    startDate: pool?.startDate?.split("T")[0] || new Date().toISOString().split("T")[0],
    endDate: pool?.endDate?.split("T")[0] || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="text-xl font-light text-slate-900">
            {pool ? "Edit Yield Pool" : "Create New Yield Pool"}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Pool Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">APY (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.apy}
                onChange={(e) => setFormData({ ...formData, apy: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Duration (days)</label>
              <input
                type="number"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Min Stake ($)</label>
              <input
                type="number"
                required
                value={formData.minStake}
                onChange={(e) => setFormData({ ...formData, minStake: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Max Stake ($)</label>
              <input
                type="number"
                required
                value={formData.maxStake}
                onChange={(e) => setFormData({ ...formData, maxStake: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Total Rewards ($)</label>
              <input
                type="number"
                required
                value={formData.totalRewards}
                onChange={(e) => setFormData({ ...formData, totalRewards: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">End Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-[#2c5aa0]"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2c5aa0] text-white hover:bg-[#1e4280]"
            >
              {pool ? "Update Pool" : "Create Pool"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 hover:border-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}