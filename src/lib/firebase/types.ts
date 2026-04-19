// lib/firebase/types.ts
import { Timestamp, FieldValue } from 'firebase/firestore';

// Base interface with Firestore timestamps
export interface BaseDocument {
  id: string;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

// User Roles
export type UserRole = 'superadmin' | 'company_admin' | 'worker' | 'client' | 'funding_recipient';
export type ApprovalStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'suspended';
export type DocumentStatus = 'draft' | 'pending_signature' | 'partially_signed' | 'signed' | 'expired' | 'rejected';
export type TransactionType = 'stake' | 'unstake' | 'reward' | 'funding_distribution' | 'wallet_transfer';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'confirmed_on_chain';

// User Collection
export interface User extends BaseDocument {
  clerkId: string;
  email: string;
  displayName: string;
  role: UserRole;
  walletAddress: string;
  status: ApprovalStatus;
  profileImage?: string;
  phoneNumber?: string;
  lastLoginAt?: Timestamp;
}

// Company Collection
export interface Company extends BaseDocument {
  name: string;
  registrationNumber: string;
  industry: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  teamSize: number;
  fundingNeeds: string;
  status: ApprovalStatus;
  adminId: string; // Reference to User (company_admin)
  workerIds: string[]; // References to User (workers)
  clientIds: string[]; // References to User (clients)
  documents: CompanyDocument[];
  skills: string[];
  foundedYear: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface CompanyDocument {
  id: string;
  type: 'registration' | 'tax' | 'financial' | 'license' | 'other';
  name: string;
  url: string;
  verified: boolean;
  verifiedAt?: Timestamp;
  verifiedBy?: string;
}

// Worker Profile
export interface WorkerProfile extends BaseDocument {
  userId: string;
  companyId: string;
  role: string;
  skills: string[];
  assignedClientIds: string[];
  anonymousAllowed: boolean;
  communicationPreferences: {
    emailNotifications: boolean;
    desktopNotifications: boolean;
    anonymousModeDefault: boolean;
  };
  performanceMetrics?: {
    avgResponseTime: number;
    clientSatisfaction: number;
    completedTasks: number;
  };
}

// Client Profile
export interface ClientProfile extends BaseDocument {
  userId: string;
  companyId: string;
  assignedWorkerId: string;
  needs: string;
  status: 'active' | 'inactive' | 'pending';
  communicationHistory?: {
    lastContactAt: Timestamp;
    totalMessages: number;
  };
}

// Funding Recipient Profile
export interface FundingRecipient extends BaseDocument {
  userId: string;
  walletAddress: string;
  stakedAmount: number;
  totalFundsReceived: number;
  yieldPreferences: {
    autoCompound: boolean;
    preferredPools: string[];
  };
  milestones: FundingMilestone[];
}

export interface FundingMilestone {
  id: string;
  description: string;
  targetAmount: number;
  achievedAmount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  dueDate: Timestamp;
  completedAt?: Timestamp;
}

// Yield Pool
export interface YieldPool extends BaseDocument {
  name: string;
  description: string;
  apy: number;
  tvl: number;
  stakers: number;
  durationDays: number;
  startDate: Timestamp;
  endDate: Timestamp;
  status: 'upcoming' | 'active' | 'paused' | 'ended';
  minStake: number;
  maxStake: number;
  totalRewards: number;
  distributedRewards: number;
  smartContractAddress: string;
  blockchainNetwork: 'ethereum' | 'polygon' | 'bsc';
}

// Stake Record
export interface StakeRecord extends BaseDocument {
  userId: string;
  poolId: string;
  amount: number;
  stakedAt: Timestamp;
  lastRewardClaimAt: Timestamp;
  totalRewardsEarned: number;
  status: 'active' | 'unstaked' | 'compounded';
  unstakedAt?: Timestamp;
}

// Document (for e-signatures)
export interface Document extends BaseDocument {
  name: string;
  type: 'contract' | 'agreement' | 'kyc' | 'report' | 'other';
  uploaderId: string;
  uploaderType: 'company' | 'worker' | 'client' | 'funding_recipient';
  uploaderName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  blockchainHash: string;
  ipfsHash: string;
  status: DocumentStatus;
  signers: DocumentSigner[];
  expiresAt: Timestamp;
  signedAt?: Timestamp;
}

export interface DocumentSigner {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  signed: boolean;
  signedAt?: Timestamp;
  signatureHash?: string;
}

// Transaction
export interface Transaction extends BaseDocument {
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  fromWallet: string;
  toWallet: string;
  blockchainTxHash: string;
  poolId?: string;
  documentId?: string;
  metadata?: Record<string, any>;
  confirmedAt?: Timestamp;
}

// Due Diligence Case
export interface DueDiligenceCase extends BaseDocument {
  companyId: string;
  companyName: string;
  initiatedBy: string;
  initiatedAt: Timestamp;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  assignedToName: string;
  checklist: DueDiligenceChecklistItem[];
  findings: string;
  finalReport?: string;
  completedAt?: Timestamp;
  escalatedAt?: Timestamp;
  escalationReason?: string;
}

export interface DueDiligenceChecklistItem {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  notes?: string;
  completedAt?: Timestamp;
  completedBy?: string;
}

// Audit Log
export interface AuditLog extends BaseDocument {
  eventType: 'approval' | 'rejection' | 'signature' | 'transaction' | 'registration' | 'update' | 'deletion';
  entityType: 'company' | 'worker' | 'client' | 'funding_recipient' | 'document' | 'transaction';
  entityId: string;
  entityName: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: Record<string, any>;
  blockchainHash: string;
  ipAddress: string;
  userAgent: string;
}

// Message (Anonymous Communication)
export interface Message extends BaseDocument {
  conversationId: string;
  senderId: string;
  senderRole: UserRole;
  senderName: string; // Will be masked for anonymous mode
  recipientId: string;
  recipientRole: UserRole;
  content: string;
  attachments: MessageAttachment[];
  isAnonymous: boolean;
  read: boolean;
  readAt?: Timestamp;
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// Conversation
export interface Conversation extends BaseDocument {
  participants: {
    userId: string;
    role: UserRole;
    name: string;
    anonymousMode: boolean;
  }[];
  lastMessage: {
    content: string;
    sentAt: Timestamp;
    senderId: string;
  };
  unreadCount: Record<string, number>;
  status: 'active' | 'archived' | 'blocked';
}

// Error Log (for monitoring)
export interface ErrorLog extends BaseDocument {
  errorId: string;
  severity: 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
  type: string;
  message: string;
  stackTrace?: string;
  endpoint?: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  status: 'active' | 'resolved' | 'ignored' | 'escalated';
  assignedTo?: string;
  assignedTeam?: string;
  tags: string[];
  metadata: Record<string, any>;
  resolvedAt?: Timestamp;
  resolutionNotes?: string;
}