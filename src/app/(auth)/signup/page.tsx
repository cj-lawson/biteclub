"use client";

import AuthInput from "~/app/components/AuthInput";
import { signup } from "~/app/actions/auth/index";
import { useActionState } from "react";

import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  const [data, action, isPending] = useActionState(signup, undefined);
  console.log(data);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="space-y-2 text-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          <Image
            src="/logo-mark.svg"
            width={44}
            height={44}
            alt="Biteclube logo mark"
            className="ml-auto mr-auto"
          />
        </Link>

        <h1 className="text-center text-2xl/9 font-bold tracking-tight">
          Create a free account
        </h1>
        <p className="opacity-70">Provide your email and choose a password</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={action} className="space-y-6">
          <div>
            <AuthInput
              label="Username"
              type="text"
              id="userame"
              name="userName"
              required
              placeholder="Create a username"
            />
          </div>
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-brand-500 flex w-full justify-center rounded-full px-3 py-3 text-sm/6 font-semibold text-white shadow-sm hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
