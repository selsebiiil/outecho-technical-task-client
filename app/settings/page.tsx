"use client";

import { useState } from "react";

import ConfirmationModal from "../ui/ConfirmationModal";
import ChangePasswordForm from "../ui/user/ChangePasswordForm";
import { useDeleteUserMutation } from "../hooks/users/deleteUser";

import { getSession, signOut } from "next-auth/react";

const SettingsPage = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: deleteUser } = useDeleteUserMutation();
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    handleLogout();
  };

  const handleOpenDeleteConfirmation = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white p-6 mb-8">
        <h1 className="text-4xl font-extrabold text-center">Settings</h1>
      </div>
      <div className="space-y-6 p-8">
        {/* Change Password Section */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <ChangePasswordForm />
        </div>

        {/* Delete Account Section */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
          <button
            onClick={handleOpenDeleteConfirmation}
            className="text-red-600 hover:text-red-800 mt-2"
          >
            Delete Account
          </button>
        </div>

        {/* Logout Section */}
        <div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Confirmation Modal for Account Deletion */}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onConfirm={handleDeleteAccount}
          onCancel={handleCloseDeleteConfirmation}
          message="Are you sure you want to delete your account? This action cannot be undone."
        />
      </div>
    </>
  );
};

export default SettingsPage;
