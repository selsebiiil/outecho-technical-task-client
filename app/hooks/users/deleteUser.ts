import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { revalidateTagCustom, signOutCallback } from "@/app/lib/actions";

const deleteUser = async () => {
  const response = await apiClient.delete(`/user`);

  return response.data;
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, Error>(deleteUser, {
    onSuccess: async (data) => {
      toast.success("Account deleted successfully!");
      revalidateTagCustom("TOP_USERS");
      signOutCallback();
      router.push("/");
    },
    onError: (error) => {
      toast.error("Error while deleting user!");
    },
  });
};
