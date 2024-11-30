"use client";

import { authenticate } from "@/app/lib/actions";
import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "../button";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white px-6 py-8 rounded-lg shadow-lg">
        <h1 className={`${lusitana.className} mb-3 text-3xl text-center`}>
          Please log in to continue.
        </h1>

        {/* Email Field */}
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-700 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 text-black"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-700 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 text-black"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-blue-500"
          aria-disabled={isPending}
        >
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
        </Button>

        {/* Error Message */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

        {/* Create Account Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-yellow-400 hover:text-yellow-600"
            >
              Create new one
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
