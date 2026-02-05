"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during logout"
      );
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-100 text-center">
          Profile
        </h1>

        <div className="h-px bg-gray-700" />

        {/* User ID */}
        <div className="text-center">
          {data === "nothing" ? (
            <p className="text-gray-400 text-sm">
              No user data fetched yet
            </p>
          ) : (
            <Link
              href={`/profile/${data}`}
              className="inline-block px-3 py-1 rounded-lg bg-gray-900 text-blue-400 font-mono text-sm hover:underline border border-gray-700"
            >
              {data}
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {/* Get User */}
          <button
            onClick={getUserDetails}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium
                       hover:bg-blue-700 active:scale-[0.98] transition
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get User Details
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full py-2.5 rounded-lg bg-red-600/90 text-white font-medium
                       hover:bg-red-700 active:scale-[0.98] transition
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}