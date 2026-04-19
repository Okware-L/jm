// lib/firebase/seed/index.ts
import { db } from '../../../../firebseConfig';
import { 
  collection, 
  doc, 
  setDoc, 
  Timestamp,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { faker } from '@faker-js/faker';

// Import all generators
import { 
  generateCompanyAdmin,
  generateWorker,
  generateClient,
  generateFundingRecipient,
  generateMultipleUsers
} from './generators/users';

import { 
  generateCompany, 
  generatePendingCompany,
  generateMultipleCompanies
} from './generators/companies';

import { 
  generateWorkerProfile,
  generateMultipleWorkerProfiles
} from './generators/workers';

import { 
  generateYieldPool,
  generateStakeRecord,
  generateMultipleYieldPools
} from './generators/yieldPools';

import { 
  generateDocument, 
  generateSigners,
  generateMultipleDocuments
} from './generators/documents';

// Import types
import type { 
  Company, 
  WorkerProfile, 
  ClientProfile,
  FundingRecipient,
  YieldPool,
  Document,
  DueDiligenceCase,
  AuditLog,
  ErrorLog,
  StakeRecord,
  User
} from '../types';

export class FirestoreSeeder {
  private counters = {
    users: 0,
    companies: 0,
    workers: 0,
    clients: 0,
    fundingRecipients: 0,
    documents: 0,
    transactions: 0,
    yieldPools: 0,
    dueDiligence: 0,
    auditLogs: 0,
    errorLogs: 0,
  };

  async seedAll() {
    console.log('🌱 Starting Firestore seed...');
    console.log('📍 Using Firestore Emulator');
    
    // Generate all mock data
    const mockData = await this.generateMockData();
    
    // Write to Firestore
    await this.writeToFirestore(mockData);
    
    console.log('✅ Seeding complete!');
    console.table(this.counters);
    
    return this.counters;
  }

  private async generateMockData() {
    console.log('📦 Generating mock data...');
    
    // 1. Generate Users (without IDs)
    const superAdmin = generateCompanyAdmin('clerk_superadmin_001');
    const companyAdmins = generateMultipleUsers('company_admin', 30, 'clerk_company');
    const workers = generateMultipleUsers('worker', 80, 'clerk_worker');
    const clients = generateMultipleUsers('client', 1000, 'clerk_client');
    const fundingRecipients = generateMultipleUsers('funding_recipient', 20, 'clerk_funding');
    
    // 2. Generate Companies (with IDs for relationships)
    const approvedCompaniesData = generateMultipleCompanies(25, 'approved');
    const pendingCompaniesData = generateMultipleCompanies(5, 'pending');
    const allCompaniesData = [...approvedCompaniesData, ...pendingCompaniesData];
    
    // Create company objects with IDs
    const companies = allCompaniesData.map((company, index) => ({
      ...company,
      id: `company_${Date.now()}_${index}`,
      adminId: `user_${Date.now()}_company_admin_${index % companyAdmins.length}`
    }));
    
    // 3. Generate Worker Profiles
    const workerUserIds = workers.map((_, index) => `user_${Date.now()}_worker_${index}`);
    const companyIds = companies.map(c => c.id);
    const workerProfiles = generateMultipleWorkerProfiles(workerUserIds, companyIds, workers.length);
    
    // 4. Generate Yield Pools
    const yieldPools = generateMultipleYieldPools(8);
    
    // 5. Generate Documents
    const documents = generateMultipleDocuments(200);
    
    return {
      superAdmin,
      companyAdmins,
      workers,
      clients,
      fundingRecipients,
      companies,
      workerProfiles,
      yieldPools,
      documents,
      workerUserIds,
      clientUserIds: clients.map((_, index) => `user_${Date.now()}_client_${index}`),
      fundingUserIds: fundingRecipients.map((_, index) => `user_${Date.now()}_funding_${index}`),
    };
  }

  private async writeToFirestore(data: any) {
    console.log('💾 Writing to Firestore...');
    
    const batch = writeBatch(db);
    
    // Write Super Admin
    const superAdminId = `user_${Date.now()}_superadmin`;
    await setDoc(doc(db, 'users', superAdminId), data.superAdmin);
    this.counters.users++;
    
    // Write Company Admins
    for (let i = 0; i < data.companyAdmins.length; i++) {
      const userId = `user_${Date.now()}_company_admin_${i}`;
      await setDoc(doc(db, 'users', userId), data.companyAdmins[i]);
      this.counters.users++;
    }
    
    // Write Workers
    for (let i = 0; i < data.workers.length; i++) {
      const userId = data.workerUserIds[i];
      await setDoc(doc(db, 'users', userId), data.workers[i]);
      this.counters.users++;
    }
    
    // Write Clients
    for (let i = 0; i < data.clients.length; i++) {
      const userId = data.clientUserIds[i];
      await setDoc(doc(db, 'users', userId), data.clients[i]);
      this.counters.users++;
    }
    
    // Write Funding Recipients
    for (let i = 0; i < data.fundingRecipients.length; i++) {
      const userId = data.fundingUserIds[i];
      await setDoc(doc(db, 'users', userId), data.fundingRecipients[i]);
      this.counters.users++;
    }
    
    // Write Companies
    for (let i = 0; i < data.companies.length; i++) {
      const company = data.companies[i];
      await setDoc(doc(db, 'companies', company.id), company);
      this.counters.companies++;
    }
    
    // Write Worker Profiles
    for (let i = 0; i < data.workerProfiles.length; i++) {
      const profileId = `worker_profile_${Date.now()}_${i}`;
      await setDoc(doc(db, 'workerProfiles', profileId), data.workerProfiles[i]);
      this.counters.workers++;
    }
    
    // Write Yield Pools
    for (let i = 0; i < data.yieldPools.length; i++) {
      const poolId = `yield_pool_${Date.now()}_${i}`;
      await setDoc(doc(db, 'yieldPools', poolId), data.yieldPools[i]);
      this.counters.yieldPools++;
    }
    
    // Write Documents
    for (let i = 0; i < data.documents.length; i++) {
      const docId = `document_${Date.now()}_${i}`;
      await setDoc(doc(db, 'documents', docId), data.documents[i]);
      this.counters.documents++;
    }
    
    console.log('💾 Write complete!');
  }
}

// Export runner function
export const runSeeder = async () => {
  const seeder = new FirestoreSeeder();
  await seeder.seedAll();
};