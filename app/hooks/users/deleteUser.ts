import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { signOut } from "@/auth";
import { toast } from "react-toastify";

const deleteUser = async () => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const response = await apiClient.delete(`/user}`);

  return response.data; // Assuming the API returns the created/updated comment
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error>(
    deleteUser, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        await signOut();
        toast.success("Account deleted successfully!");
      },
      onError: (error) => {
        toast.error("Error while deleting user!");
      },
    }
  );
};
