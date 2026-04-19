// scripts/seed-firestore.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, writeBatch, doc, setDoc, collection } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from 'firebase/auth';

// Emulator configuration
const firebaseConfig = {
  apiKey: "fake-api-key-for-emulator",
  authDomain: "localhost",
  projectId: "community-hub-dev",
  storageBucket: "community-hub-dev.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Connect to emulators
connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099');

// Import seeder
import { FirestoreSeeder } from '../lib/firebase/seed';

async function clearEmulatorData() {
  console.log('🧹 Clearing existing emulator data...');
  
  // Get all collections
  const collections = [
    'users', 'companies', 'workerProfiles', 'clientProfiles', 
    'fundingRecipients', 'yieldPools', 'documents', 'dueDiligenceCases',
    'auditLogs', 'errorLogs', 'conversations', 'messages', 'transactions'
  ];
  
  const batch = writeBatch(db);
  
  for (const collectionName of collections) {
    const snapshot = await getDocs(collection(db, collectionName));
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
  }
  
  await batch.commit();
  console.log('✅ Emulator data cleared');
}

async function seed() {
  console.log('🌱 Starting seed process for Firestore Emulator...');
  console.log('📍 Emulator running at: http://localhost:4000');
  
  try {
    // Optional: Clear existing data
    const shouldClear = process.argv.includes('--clear');
    if (shouldClear) {
      await clearEmulatorData();
    }
    
    const seeder = new FirestoreSeeder();
    const stats = await seeder.seedAll();
    
    console.log('\n✨ Seed completed successfully!');
    console.log('📊 You can view the data at: http://localhost:4000/firestore');
    console.log('\n📈 Statistics:');
    console.table(stats);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Helper function to get all documents from a collection
async function getDocs(collectionRef: any) {
  const { getDocs } = await import('firebase/firestore');
  return getDocs(collectionRef);
}

seed();