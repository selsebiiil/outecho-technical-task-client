import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { topicsKeys } from "./topicsKeys";
import { Categories } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface TopicData {
  title: string;
  description: string;
  category: string;
}

const createOrUpdateTopic = async ({
  id,
  data,
}: {
  id: number;
  data: TopicData;
}) => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const response = await apiClient.post(`/topics/${id}`, {
    ...data, // Pass topicId and content from the `data` parameter
  });

  return response.data; // Assuming the API returns the created/updated comment
};

export const useCreateTopicMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, Error, { id: number; data: TopicData }>(
    createOrUpdateTopic, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(topicsKeys.getMyTopics(20, 1));
        toast.success("Topic saved successfully!");
        router.refresh();
      },
      onError: (error) => {
        toast.error("Error creating/updating topic");
      },
    }
  );
};
