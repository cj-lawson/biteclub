"use client";

import { useState } from "react";
import AuthInput from "~/components/AuthInput";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function signUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-green-600">
          Join BiteClub
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={"submit"} className="space-y-6">
          <div>
            <AuthInput
              label="Email address"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="flex items-center justify-between">
            <AuthInput
              label="Password"
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create free account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          already a member?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Log in to your account
          </Link>
        </p>
      </div>
    </div>
  );
}
