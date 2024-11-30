import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UserData {
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  gender: "FEMALE" | "MALE";
}

const createUser = async ({ data }: { data: UserData }) => {
  const response = await apiClient.post(`/user`, {
    ...data, // Pass topicId and content from the `data` parameter
  });

  return response.data; // Assuming the API returns the created/updated comment
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, Error, { data: UserData }>(
    createUser, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        router.push("/login");
        toast.success("User created successfully!");
      },
      onError: (error) => {
        toast.error("Error creating user");
      },
    }
  );
};
