// lib/firebase/seed/generators/workers.ts
import { Timestamp } from 'firebase/firestore';
import { WorkerProfile } from '../../types';
import { faker } from '@faker-js/faker';

const workerRoles = [
  'Account Manager', 'Technical Specialist', 'Financial Analyst',
  'Compliance Officer', 'Customer Success Manager', 'Project Coordinator'
];

const skills = [
  'Communication', 'Project Management', 'Data Analysis', 'Customer Service',
  'Technical Writing', 'Blockchain Technology', 'Financial Modeling',
  'Risk Assessment', 'Documentation', 'Negotiation'
];

export const generateWorkerProfile = (
  userId: string,
  companyId: string,
  assignedClientIds: string[] = []
): Omit<WorkerProfile, 'id'> => {
  return {
    userId,
    companyId,
    role: faker.helpers.arrayElement(workerRoles),
    skills: faker.helpers.arrayElements(skills, faker.number.int({ min: 3, max: 7 })),
    assignedClientIds,
    anonymousAllowed: faker.datatype.boolean(),
    communicationPreferences: {
      emailNotifications: faker.datatype.boolean(),
      desktopNotifications: faker.datatype.boolean(),
      anonymousModeDefault: faker.datatype.boolean(),
    },
    performanceMetrics: {
      avgResponseTime: faker.number.int({ min: 5, max: 120 }),
      clientSatisfaction: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
      completedTasks: faker.number.int({ min: 10, max: 500 }),
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};

// Add the missing function
export const generateMultipleWorkerProfiles = (
  userIds: string[],
  companyIds: string[],
  count: number
): Omit<WorkerProfile, 'id'>[] => {
  const profiles: Omit<WorkerProfile, 'id'>[] = [];
  
  for (let i = 0; i < count && i < userIds.length; i++) {
    const companyId = faker.helpers.arrayElement(companyIds);
    profiles.push(generateWorkerProfile(userIds[i], companyId));
  }
  
  return profiles;
};