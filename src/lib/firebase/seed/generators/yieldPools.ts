// lib/firebase/seed/generators/yieldPools.ts
import { Timestamp } from 'firebase/firestore';
import { YieldPool, StakeRecord } from '../../types';
import { faker } from '@faker-js/faker';

export const generateYieldPool = (index: number): Omit<YieldPool, 'id'> => {
  const apy = faker.number.float({ min: 5, max: 25, fractionDigits: 1 });
  const durationDays = faker.number.int({ min: 30, max: 365 });
  const startDate = faker.date.recent({ days: 30 });
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + durationDays);
  
  const statuses: ('upcoming' | 'active' | 'ended')[] = ['upcoming', 'active', 'ended'];
  const status = statuses[faker.number.int({ min: 0, max: 2 })];
  
  return {
    name: `${faker.company.name()} Yield Pool ${index + 1}`,
    description: faker.lorem.paragraph(),
    apy,
    tvl: faker.number.int({ min: 100000, max: 5000000 }),
    stakers: faker.number.int({ min: 10, max: 500 }),
    durationDays,
    startDate: startDate as unknown as Timestamp,
    endDate: endDate as unknown as Timestamp,
    status: status as any,
    minStake: faker.number.int({ min: 50, max: 500 }),
    maxStake: faker.number.int({ min: 10000, max: 100000 }),
    totalRewards: faker.number.int({ min: 50000, max: 500000 }),
    distributedRewards: status === 'active' ? faker.number.int({ min: 10000, max: 200000 }) : 0,
    smartContractAddress: faker.finance.ethereumAddress(),
    blockchainNetwork: faker.helpers.arrayElement(['ethereum', 'polygon', 'bsc']),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};

// Add the missing function
export const generateMultipleYieldPools = (count: number): Omit<YieldPool, 'id'>[] => {
  return Array.from({ length: count }, (_, i) => generateYieldPool(i));
};

export const generateStakeRecord = (
  userId: string,
  poolId: string,
  amount: number
): Omit<StakeRecord, 'id'> => {
  return {
    userId,
    poolId,
    amount,
    stakedAt: Timestamp.now(),
    lastRewardClaimAt: Timestamp.now(),
    totalRewardsEarned: 0,
    status: 'active',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};