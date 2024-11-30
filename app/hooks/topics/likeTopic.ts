import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { customRevalidateTag } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

interface TopicData {
  likeStatus: "LIKE" | "DISLIKE";
}

const likeOrDislikeTopic = async ({
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

  const response = await apiClient.post(`/topics/${id}/like`, {
    ...data,
  });

  return response.data;
};

export const useLikeOrDislikeTopicMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, Error, { id: number; data: TopicData }>(
    likeOrDislikeTopic,
    {
      onSuccess: async (data, { id }) => {
        customRevalidateTag(id);
        router.push(`/topics/${id}`);
      },
      onError: (error) => {
        console.error("Error liking/disliking topic:", error);
      },
    }
  );
};
