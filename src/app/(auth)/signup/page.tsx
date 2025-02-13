"use client";

import AuthInput from "~/app/components/AuthInput";
import { signup } from "~/app/actions/auth/index";
import { useActionState } from "react";

import Link from "next/link";

export default function SignUp() {
  const [data, action, isPending] = useActionState(signup, undefined);
  console.log(data);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-green-600">
          Join BiteClub
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={action} className="space-y-6">
          <div>
            <AuthInput
              label="Display name"
              type="text"
              id="displayName"
              name="displayName"
              required
              placeholder="Enter your display name"
            />
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
              disabled={isPending}
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
