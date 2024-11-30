import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { commentKeys } from "./commentKeys";

interface CommentData {
  topicId: number;
  content: string;
}

const createOrUpdateComment = async ({
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

  const response = await apiClient.post(`/comments/${id}`, {
    ...data, // Pass topicId and content from the `data` parameter
  });

  return response.data; // Assuming the API returns the created/updated comment
};

export const useCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: number; data: CommentData }>(
    createOrUpdateComment, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(commentKeys.getAll());
      },
      onError: (error) => {
        console.error("Error creating/updating comment:", error);
      },
    }
  );
};
