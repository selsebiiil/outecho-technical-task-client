import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

interface UserData {
  firstName: string | null;
  lastName: string | null;
  email: string;
  gender: "FEMALE" | "MALE";
}

const updateUser = async ({ data }: { data: UserData }) => {
  const response = await apiClient.put("/user", {
    ...data, // Pass topicId and content from the `data` parameter
  });

  return response.data; // Assuming the API returns the created/updated comment
};

export const useUpdateUserMutation = () => {
  const router = useRouter();
  return useMutation<any, Error, { data: UserData }>(updateUser, {
    onSuccess: async (data) => {
      router.push(`/profile/${data.id}`);
      toast.success("Account updated successfully!");
    },
    onError: (error) => {
      toast.error("Error while updating account!");
    },
  });
};
