import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { commentKeys } from "./commentKeys";

interface CommentData {
  likeStatus: "LIKE" | "DISLIKE";
}

const likeOrDislikeComment = async ({
  id,
  data,
}: {
  id: number;
  data: CommentData;
}) => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const response = await apiClient.post(`/comments/${id}/like`, {
    ...data, // Pass topicId and content from the `data` parameter
  });

  return response.data; // Assuming the API returns the created/updated comment
};

export const useLikeOrDislikeCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: number; data: CommentData }>(
    likeOrDislikeComment, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(commentKeys.getAll());
      },
      onError: (error) => {
        console.error("Error liking/disliking comment:", error);
      },
    }
  );
};
