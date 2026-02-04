"use client";
import React, { useState , useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-100 text-center">
          Welcome Back
        </h1>
        <h1 className="text-sm text-gray-400 text-center mt-2">{loading ? "logging you in..." : "Login to get started"}</h1>

        {/* Form */}
        <div className="mt-8 space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              placeholder="you@example.com"
              className="px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              placeholder="••••••••"
              className="px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Button */}
          <button
            onClick={onLogin}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}