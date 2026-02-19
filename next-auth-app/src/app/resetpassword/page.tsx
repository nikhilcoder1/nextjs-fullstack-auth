"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success("Password reset successful");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div className="text-center mt-10">Invalid link</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full mt-6 px-4 py-2 rounded bg-gray-900 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={reset}
          disabled={loading}
          className="w-full mt-4 bg-green-600 py-2 rounded text-white"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}