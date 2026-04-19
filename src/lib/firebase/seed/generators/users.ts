// lib/firebase/seed/generators/users.ts
import { Timestamp } from 'firebase/firestore';
import { User, UserRole, ApprovalStatus } from '../../types';
import { faker } from '@faker-js/faker';

// Base user generator
export const generateUser = (
  clerkId: string, 
  role: UserRole, 
  status: ApprovalStatus = 'approved'
): Omit<User, 'id'> => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const displayName = `${firstName} ${lastName}`;
  
  // Create predictable email for emulator testing
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  
  return {
    clerkId,
    email,
    displayName,
    role,
    walletAddress: `0x${faker.string.hexadecimal({ length: 40, prefix: '' })}`,
    status,
    profileImage: `https://picsum.photos/id/${faker.number.int({ min: 1, max: 100 })}/200/200`,
    phoneNumber: faker.phone.number(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    lastLoginAt: faker.date.recent({ days: 30 }) as unknown as Timestamp,
  };
};

// Specific role generators
export const generateCompanyAdmin = (clerkId: string, status: ApprovalStatus = 'approved'): Omit<User, 'id'> => {
  return generateUser(clerkId, 'company_admin', status);
};

export const generateWorker = (clerkId: string, status: ApprovalStatus = 'approved'): Omit<User, 'id'> => {
  return generateUser(clerkId, 'worker', status);
};

export const generateClient = (clerkId: string, status: ApprovalStatus = 'approved'): Omit<User, 'id'> => {
  return generateUser(clerkId, 'client', status);
};

export const generateFundingRecipient = (clerkId: string, status: ApprovalStatus = 'approved'): Omit<User, 'id'> => {
  return generateUser(clerkId, 'funding_recipient', status);
};

// Generate multiple users at once
export const generateMultipleUsers = (
  role: UserRole, 
  count: number, 
  baseClerkId: string,
  status: ApprovalStatus = 'approved'
): Omit<User, 'id'>[] => {
  return Array.from({ length: count }, (_, i) => {
    const clerkId = `${baseClerkId}_${i}`;
    switch (role) {
      case 'company_admin':
        return generateCompanyAdmin(clerkId, status);
      case 'worker':
        return generateWorker(clerkId, status);
      case 'client':
        return generateClient(clerkId, status);
      case 'funding_recipient':
        return generateFundingRecipient(clerkId, status);
      default:
        return generateUser(clerkId, role, status);
    }
  });
};

// Generate a mix of users for testing
export const generateUserMix = () => {
  return {
    superadmin: generateCompanyAdmin('clerk_superadmin_001', 'approved'),
    pendingCompanyAdmin: generateCompanyAdmin('clerk_pending_company_001', 'pending'),
    rejectedCompanyAdmin: generateCompanyAdmin('clerk_rejected_company_001', 'rejected'),
    activeWorker: generateWorker('clerk_worker_active_001', 'approved'),
    pendingWorker: generateWorker('clerk_worker_pending_001', 'pending'),
    activeClient: generateClient('clerk_client_active_001', 'approved'),
    fundingRecipient: generateFundingRecipient('clerk_funding_001', 'approved'),
  };
};