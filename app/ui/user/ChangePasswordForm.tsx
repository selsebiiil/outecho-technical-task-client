"use client";

import { useChangePasswordMutation } from "@/app/hooks/users/changePassword";
import { useState } from "react";
import { z } from "zod";

const passwordSchema = z
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
  });

const formSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required."),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: changePassword, isLoading: isPosting } =
    useChangePasswordMutation();

  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);

      setErrors({});

      changePassword(
        { data: formData },
        {
          onError: (error: any) => {
            setMutationError(
              error?.response?.data?.message ||
                "An error occurred while updating."
            );
          },
          onSuccess: () => {
            setMutationError(null);
            setFormData({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          },
        }
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.errors.reduce((acc, curr) => {
          if (curr.path[0]) {
            acc[curr.path[0] as string] = curr.message;
          }
          return acc;
        }, {} as Record<string, string>);
        setErrors(fieldErrors);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <form onSubmit={handlePasswordChange}>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            name="oldPassword"
            className={`w-full p-2 border rounded ${
              errors.oldPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter current password"
            value={formData.oldPassword}
            onChange={handleInputChange}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            className={`w-full p-2 border rounded ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={`w-full p-2 border rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {mutationError && (
          <p className="text-sm text-red-500">{mutationError}</p>
        )}
        <button
          type="submit"
          disabled={isPosting}
          className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg"
        >
          {isPosting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
