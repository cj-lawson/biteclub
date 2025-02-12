"use client";

import Link from "next/link";
import AuthInput from "~/components/AuthInput";

export default function Login() {
  return (
    <div className="mt-12 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl/9 font-bold tracking-tight text-green-600">
          Log into BiteClub
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={"signIn"} className="space-y-6">
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

          <div>
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
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member yet?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Create a free account
          </Link>
        </p>
      </div>
    </div>
  );
}
