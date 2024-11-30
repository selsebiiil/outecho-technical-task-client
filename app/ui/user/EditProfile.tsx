"use client";

import { useUpdateUserMutation } from "@/app/hooks/users/updateUser";
import { User } from "@/app/lib/definitions";
import { useState } from "react";
import { z } from "zod";

const userSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address."),
  gender: z.string({ required_error: "Gender is required" }),
});

type UserForm = z.infer<typeof userSchema>;

interface EditProfileProps {
  user: User;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onClose }) => {
  const initialFormData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email || "",
    gender: (user.gender as string) || "MALE",
  };
  const [formData, setFormData] = useState<UserForm>(initialFormData);
  const [errors, setErrors] = useState<Partial<UserForm>>({});
  const [mutationError, setMutationError] = useState<string | null>(null);
  const { mutate: updateUser, isLoading: isPosting } = useUpdateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = userSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        gender: fieldErrors.gender?.[0],
      });
      return;
    }

    setErrors({});

    const updatedUser = {
      id: user.id,
      avatarUrl: user.avatarUrl,
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      email: formData.email,
      gender: formData.gender as "MALE" | "FEMALE",
    };
    try {
      updateUser(
        { data: updatedUser },
        {
          onError: (error: any) => {
            setMutationError(
              error?.response.data?.message ||
                "An error occurred while updating."
            );
          },
          onSuccess: () => {
            setMutationError(null);
            onClose();
          },
        }
      );
    } catch (e) {
      setMutationError("An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>
          {mutationError && (
            <p className="text-sm text-red-500">{mutationError}</p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
