// hooks/useFirestore.ts (with emulator detection)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit, QueryConstraint } from 'firebase/firestore';
import { db } from '../../firebseConfig';

// Add emulator detection for debugging
const isUsingEmulator = process.env.NEXT_PUBLIC_USE_EMULATORS === 'true';

async function fetchCollection<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
  if (isUsingEmulator) {
    console.log(`🔍 [Emulator] Fetching from ${collectionName}`);
  }
  
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

// Rest of the hooks remain the same...