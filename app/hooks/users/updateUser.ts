import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { revalidateTagCustom } from "@/app/lib/actions";

interface UserData {
  firstName: string | null;
  lastName: string | null;
  email: string;
  gender: "FEMALE" | "MALE";
}

const updateUser = async ({ data }: { data: UserData }) => {
  const response = await apiClient.put("/user", {
    ...data,
  });

  return response.data;
};

export const useUpdateUserMutation = () => {
  const router = useRouter();
  return useMutation<any, Error, { data: UserData }>(updateUser, {
    onSuccess: async (data) => {
      router.push(`/profile/${data.id}`);
      revalidateTagCustom("TOP_USERS");
      toast.success("Account updated successfully!");
    },
    onError: (error) => {
      toast.error("Error while updating account!");
    },
  });
};
