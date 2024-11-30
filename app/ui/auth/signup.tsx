"use client";

import { authenticate } from "@/app/lib/actions";
import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../button";
import { useActionState } from "react";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserMutation } from "../../hooks/users/createUser";
import { Toast } from "../toast";

const Schema = z.object({
  firstName: z.string().optional(), // Optional, but if provided, it can't be empty
  lastName: z.string().optional(), // Optional, but if provided, it can't be empty
  email: z.string().email({ message: "Email format not recognized" }),
  password: z
    .string()
    .min(8, { message: "Password should contain at least 8 characters" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password should contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password should contain at least one lowercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password should contain at least one digit",
    }),
  gender: z.string({ required_error: "Gender is required" }),
});

type FormSchemaType = z.infer<typeof Schema>;

const SignInForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const { mutate: createUser, isLoading: isPosting } = useCreateUserMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormSchemaType>({ resolver: zodResolver(Schema) });

  const handleOnSubmit: SubmitHandler<FormSchemaType> = async (dataUser) => {
    const { firstName, email, password, lastName, gender } = dataUser;
    const data = {
      firstName: firstName as string,
      lastName: lastName as string,
      email,
      password,
      gender: (gender as "FEMALE") || "MALE",
    };
    createUser({ data: data });
    <Toast message="Successfully created user" onClose={() => {}}></Toast>;
    // You can now use formAction to authenticate, for example:
    // formAction.mutate({ firstName, lastName, email, password, gender });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white px-6 py-8 rounded-lg shadow-lg w-full  md:min-w-[400px] max-w-[400px] mx-auto sm:w-full">
        <h1 className={`${lusitana.className} mb-6 text-3xl text-center`}>
          Create an Account
        </h1>

        {/* First Name Field */}
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-300"
            htmlFor="firstName"
          >
            First Name (Optional)
          </label>
          <div className="relative">
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              className="block w-full rounded-md border border-gray-700 py-2 pl-3 pr-3 text-sm text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("firstName")} // Correctly use register for form field
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        {/* Last Name Field */}
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-300"
            htmlFor="lastName"
          >
            Last Name (Optional)
          </label>
          <div className="relative">
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="block w-full rounded-md border border-gray-700 py-2 pl-3 pr-3 text-sm text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("lastName")} // Correctly use register for form field
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Gender Field */}
        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-300"
            htmlFor="gender"
          >
            Gender
          </label>
          <div className="relative">
            <select
              id="gender"
              defaultValue="female" // Default value
              className="block w-full rounded-md border border-gray-700 py-2 pl-3 pr-3 text-sm text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("gender")} // Correctly use register for form field
            >
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>
        </div>

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
                placeholder="Enter your email address"
                required
                {...register("email")} // Correctly use register for form field
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="w-full">
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
              placeholder="Enter password"
              required
              minLength={6}
              {...register("password")} // Correctly use register for form field
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-blue-500"
          aria-disabled={isPending}
        >
          Sign Up
          <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
        </Button>

        {/* Error Message */}
        {errorMessage && (
          <div
            className="flex items-center mt-4 text-red-500"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Link to login page */}
        <p className="mt-6 text-center text-xs">
          Already have an account?{" "}
          <Link
            className="text-yellow-500 hover:text-yellow-600 focus:ring-2 focus:ring-blue-500"
            href="/login"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
