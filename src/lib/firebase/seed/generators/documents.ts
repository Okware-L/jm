// lib/firebase/seed/generators/documents.ts
import { Timestamp } from 'firebase/firestore';
import { Document, DocumentSigner } from '../../types';
import { faker } from '@faker-js/faker';

const documentTypes = ['contract', 'agreement', 'kyc', 'report'];
const documentStatuses = ['pending_signature', 'partially_signed', 'signed', 'expired'];

export const generateSigners = (userIds: string[], userNames: string[]): DocumentSigner[] => {
  return userIds.map((id, index) => ({
    id: faker.string.uuid(),
    userId: id,
    name: userNames[index],
    email: faker.internet.email({ firstName: userNames[index].split(' ')[0] }),
    role: faker.helpers.arrayElement(['Signatory', 'Witness', 'Authorized Representative']),
    signed: faker.datatype.boolean(),
    signedAt: faker.datatype.boolean() ? Timestamp.now() : undefined,
    signatureHash: faker.datatype.boolean() ? faker.finance.ethereumAddress() : undefined,
  }));
};

export const generateDocument = (
  uploaderId: string,
  uploaderName: string,
  uploaderType: 'company' | 'worker' | 'client' | 'funding_recipient',
  signers: DocumentSigner[]
): Omit<Document, 'id'> => {
  const status = faker.helpers.arrayElement(documentStatuses);
  const allSigned = signers.every(s => s.signed);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + faker.number.int({ min: 7, max: 30 }));
  
  return {
    name: `${faker.company.catchPhrase()} ${faker.helpers.arrayElement(['Agreement', 'Contract', 'Application', 'Report'])}`,
    type: faker.helpers.arrayElement(documentTypes) as any,
    uploaderId,
    uploaderType,
    uploaderName,
    fileUrl: faker.internet.url(),
    fileSize: faker.number.int({ min: 100000, max: 5000000 }),
    fileType: 'application/pdf',
    blockchainHash: faker.finance.ethereumAddress(),
    ipfsHash: `Qm${faker.string.alphanumeric(44)}`,
    status: allSigned ? 'signed' : status as any,
    signers,
    expiresAt: expiresAt as unknown as Timestamp,
    signedAt: allSigned ? Timestamp.now() : undefined,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};

// Add the missing function
export const generateMultipleDocuments = (count: number): Omit<Document, 'id'>[] => {
  const documents: Omit<Document, 'id'>[] = [];
  const uploaderTypes = ['company', 'worker', 'client', 'funding_recipient'];
  
  for (let i = 0; i < count; i++) {
    const uploaderType = faker.helpers.arrayElement(uploaderTypes) as any;
    const uploaderId = `uploader_${Date.now()}_${i}`;
    const uploaderName = `Uploader ${i}`;
    
    // Generate 2-5 signers
    const numSigners = faker.number.int({ min: 2, max: 5 });
    const signerIds = Array.from({ length: numSigners }, () => `signer_${Date.now()}_${faker.number.int({ min: 0, max: 1000 })}`);
    const signerNames = signerIds.map(() => faker.person.fullName());
    const signers = generateSigners(signerIds, signerNames);
    
    documents.push(generateDocument(uploaderId, uploaderName, uploaderType, signers));
  }
  
  return documents;
};