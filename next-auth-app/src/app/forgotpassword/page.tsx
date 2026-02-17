"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Reset link sent to your email");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-white text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mt-6 px-4 py-2 rounded bg-gray-900 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 py-2 rounded text-white"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </div>
    </div>
  );
}