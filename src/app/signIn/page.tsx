// app/signIn/page.tsx
"use client"; // Ensure this is a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead of 'next/router'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebseConfig"; // Adjust the path if necessary

const SignInPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth(app);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
       await signInWithPopup(auth, provider);
      // User signed in successfully
      router.push("/Admin"); // Redirect to admin page
    } catch (error) {
      setError("Failed to sign in: " + (error as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-96 rounded bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
        {error && <p className="text-red-600">{error}</p>}
        <button
          onClick={handleGoogleSignIn}
          className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
