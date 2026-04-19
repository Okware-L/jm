// lib/firebase/seed/generators/companies.ts
import { Timestamp } from 'firebase/firestore';
import { Company, CompanyDocument } from '../../types';
import { faker } from '@faker-js/faker';

const industries = [
  'Healthcare', 'Technology', 'Finance', 'Agriculture', 
  'Energy', 'Education', 'Transportation', 'Construction',
  'Real Estate', 'Manufacturing', 'Retail', 'Blockchain'
];

const skillsByIndustry: Record<string, string[]> = {
  Healthcare: ['Medical Research', 'Lab Testing', 'Patient Care', 'Telemedicine', 'Health Records'],
  Technology: ['Software Development', 'Cloud Computing', 'AI/ML', 'Cybersecurity', 'Blockchain'],
  Finance: ['Investment Banking', 'Risk Management', 'Financial Planning', 'Auditing', 'Compliance'],
  Agriculture: ['Farming', 'Crop Management', 'Supply Chain', 'AgriTech', 'Irrigation'],
  Energy: ['Solar Power', 'Wind Energy', 'Grid Management', 'Energy Storage', 'Sustainability'],
  Blockchain: ['Smart Contracts', 'DeFi', 'NFT Development', 'Web3', 'Cryptocurrency'],
  default: ['General Business', 'Management', 'Operations', 'Sales', 'Marketing']
};

export const generateCompany = (
  id: string,
  adminId: string,
  status: 'approved' | 'pending' | 'rejected' = 'approved'
): Omit<Company, 'id'> => {
  const industry = faker.helpers.arrayElement(industries);
  const companyName = faker.company.name();
  
  const documents: CompanyDocument[] = [
    {
      id: faker.string.uuid(),
      type: 'registration',
      name: `business_registration_${companyName.toLowerCase().replace(/\s/g, '_')}.pdf`,
      url: faker.internet.url(),
      verified: status === 'approved',
      verifiedAt: status === 'approved' ? Timestamp.now() : undefined,
      verifiedBy: status === 'approved' ? 'admin_system' : undefined,
    },
    {
      id: faker.string.uuid(),
      type: 'tax',
      name: `tax_certificate_${companyName.toLowerCase().replace(/\s/g, '_')}.pdf`,
      url: faker.internet.url(),
      verified: status === 'approved',
      verifiedAt: status === 'approved' ? Timestamp.now() : undefined,
      verifiedBy: status === 'approved' ? 'admin_system' : undefined,
    },
    {
      id: faker.string.uuid(),
      type: 'financial',
      name: `financial_statement_${new Date().getFullYear()}.pdf`,
      url: faker.internet.url(),
      verified: status === 'approved',
    },
  ];

  return {
    name: companyName,
    registrationNumber: `REG${faker.number.int({ min: 100000, max: 999999 })}`,
    industry,
    description: faker.company.catchPhrase(),
    website: faker.internet.url(),
    email: faker.internet.email({ provider: companyName.toLowerCase().replace(/\s/g, '') }),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    teamSize: faker.number.int({ min: 5, max: 500 }),
    fundingNeeds: `$${faker.number.int({ min: 50000, max: 5000000 })} for ${faker.company.buzzPhrase()}`,
    status,
    adminId,
    workerIds: [],
    clientIds: [],
    documents,
    skills: skillsByIndustry[industry] || skillsByIndustry.default,
    foundedYear: faker.number.int({ min: 2000, max: 2024 }),
    socialLinks: {
      linkedin: `https://linkedin.com/company/${companyName.toLowerCase().replace(/\s/g, '-')}`,
      twitter: `https://twitter.com/${companyName.toLowerCase().replace(/\s/g, '')}`,
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};

export const generatePendingCompany = (id: string, adminId: string): Omit<Company, 'id'> => {
  return generateCompany(id, adminId, 'pending');
};

export const generateRejectedCompany = (id: string, adminId: string): Omit<Company, 'id'> => {
  return generateCompany(id, adminId, 'rejected');
};

export const generateMultipleCompanies = (
  count: number,
  status: 'approved' | 'pending' | 'rejected' = 'approved'
): Omit<Company, 'id'>[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = `company_${Date.now()}_${i}`;
    const adminId = `user_${Date.now()}_admin_${i}`;
    return generateCompany(id, adminId, status);
  });
};