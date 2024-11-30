import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const changePassword = async ({ data }: { data: PasswordData }) => {
  const response = await apiClient.post(`/user/change-password`, {
    ...data, // Pass topicId and content from the `data` parameter
  });

  return response.data; // Assuming the API returns the created/updated comment
};

export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, Error, { data: PasswordData }>(
    changePassword, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        toast.success("Password changed successfully!");
      },
    }
  );
};
