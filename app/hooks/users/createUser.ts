import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { revalidateTagCustom } from "@/app/lib/actions";

interface UserData {
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  gender: "FEMALE" | "MALE";
}

const createUser = async ({ data }: { data: UserData }) => {
  const response = await apiClient.post(`/user`, {
    ...data,
  });

  return response.data;
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, Error, { data: UserData }>(createUser, {
    onSuccess: async (data) => {
      router.push("/login");
      toast.success("User created successfully!");
      revalidateTagCustom("TOP_USERS");
    },
    onError: (error) => {
      toast.error("Error creating user");
    },
  });
};
