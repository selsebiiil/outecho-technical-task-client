import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { topicsKeys } from "./topicsKeys";
import { toast } from "react-toastify";
import { revalidateTagCustom } from "@/app/lib/actions";

const deleteTopic = async ({ id }: { id: number }) => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const response = await apiClient.delete(`/topics/${id}`);

  return response.data;
};

export const useDeleteTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: number }>(deleteTopic, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(topicsKeys.getMyTopics());
      revalidateTagCustom("MY_TOPICS");
      toast.success("Topic deleted successfully!");
    },
    onError: (error) => {
      toast.error("Error while deleting topic!");
    },
  });
};
