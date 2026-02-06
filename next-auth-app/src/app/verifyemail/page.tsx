"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  // get token from URL
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  // call verify API
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  // 🔥 auto redirect after success
  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verified, router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b0b0c] px-4 overflow-hidden">
      
      {/* 🌌 Glow effect */}
      <div className="absolute w-80 h-80 bg-blue-600/20 blur-3xl rounded-full top-1/3 left-1/2 -translate-x-1/2" />

      <div className="w-full max-w-md text-center relative z-10">

        {/* Card */}
        <div className="bg-[#111113] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur">
          
          {/* Icon */}
          {verified && (
            <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
              <span className="text-green-400 text-2xl">✓</span>
            </div>
          )}

          {error && (
            <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-red-400 text-2xl">!</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-2xl font-semibold text-white">
            {verified
              ? "Email Verified"
              : error
              ? "Verification Failed"
              : "Verifying..."}
          </h1>

          {/* Sub text */}
          <p className="text-sm text-gray-400 mt-3">
            {verified &&
              "Your email has been successfully verified. Redirecting you to login..."}

            {error &&
              "The verification link is invalid or expired. Please request a new verification email."}

            {!verified && !error &&
              "Please wait while we verify your email address."}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/10 my-6" />

          {/* CTA */}
          {verified && (
            <Link
              href="/login"
              className="inline-block w-full py-2.5 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Go to Login
            </Link>
          )}

          {error && (
            <Link
              href="/signup"
              className="inline-block w-full py-2.5 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Back to Signup
            </Link>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-600 mt-6">
          Secure authentication system • Next.js App Router
        </p>
      </div>
    </div>
  );
}
