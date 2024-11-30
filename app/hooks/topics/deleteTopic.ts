import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { topicsKeys } from "./topicsKeys";
import { toast } from "react-toastify";

const deleteTopic = async ({ id }: { id: number }) => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const response = await apiClient.delete(`/topics/${id}`);

  return response.data; // Assuming the API returns the created/updated comment
};

export const useDeleteTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: number }>(
    deleteTopic, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(topicsKeys.getMyTopics(20, 1));
        toast.success("Topic deleted successfully!");
      },
      onError: (error) => {
        toast.error("Error while deleting topic!");
      },
    }
  );
};
