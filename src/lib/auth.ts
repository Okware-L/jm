// lib/auth.ts
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export type UserRole =
  | "company"
  | "worker"
  | "client"
  | "superadmin"
  | "funding_recipient"
  | null;

export type UserStatus =
  | "active"
  | "pending"
  | "approved"
  | "rejected"
  | "suspended"
  | null;

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  status: UserStatus;
  companyId?: string;
  inviteToken?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  companyName?: string;
  registrationNumber?: string;
  industry?: string;
}

export type AuthState =
  | "loading"
  | "unauthenticated"
  | "no_profile"
  | "active"
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

// ── Core hooks ────────────────────────────────────────────────────────────────

export function useAuthState() {
  const [state, setState] = useState<AuthState>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setState("unauthenticated");
        setUser(null);
        setProfile(null);
        return;
      }
      setUser(firebaseUser);
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      if (!snap.exists()) {
        setState("no_profile");
        return;
      }
      const data = snap.data() as UserProfile;
      setProfile({ ...data, uid: firebaseUser.uid });
      setState((data.status as AuthState) ?? "approved");
    });
    return () => unsub();
  }, [auth, db]);

  return { state, user, profile };
}

export function useRequireAuth() {
  const { state, user, profile } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (state === "loading") return;
    if (state === "unauthenticated") { router.replace("/signin"); return; }
    if (state === "no_profile")      { router.replace("/register"); return; }
  }, [state, router]);

  return { state, user, profile };
}

// ── Auth helpers ──────────────────────────────────────────────────────────────

/** Google OAuth — returns uid */
export async function authWithGoogle(): Promise<string> {
  const auth = getAuth();
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  return result.user.uid;
}

/** Create email/password account — returns uid */
export async function createEmailAccount(
  email: string,
  password: string,
  displayName: string
): Promise<string> {
  const auth = getAuth();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName });
  return result.user.uid;
}

/** Sign in with email/password — returns uid */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<string> {
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user.uid;
}

/** Send password reset email */
export async function resetPassword(email: string): Promise<void> {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}

/** Write Firestore user profile after auth */
export async function createUserProfile(
  uid: string,
  data: Omit<UserProfile, "uid" | "createdAt" | "updatedAt">
): Promise<void> {
  const db = getFirestore();
  await setDoc(doc(db, "users", uid), {
    ...data,
    status: data.status ?? "approved",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

/** Generate a worker invite token */
export async function generateInviteToken(
  companyId: string,
  companyName: string,
  email: string
): Promise<string> {
  const db = getFirestore();
  const token = crypto.randomUUID();
  await setDoc(doc(db, "worker_invites", token), {
    companyId,
    companyName,
    email,
    used: false,
    createdAt: Timestamp.now(),
    expiresAt: Timestamp.fromDate(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ),
  });
  return token;
}

export const ROLE_LABELS: Record<NonNullable<UserRole>, string> = {
  company:           "Company",
  worker:            "Account Manager",
  client:            "Client",
  superadmin:        "Superadmin",
  funding_recipient: "Funding Recipient",
};
