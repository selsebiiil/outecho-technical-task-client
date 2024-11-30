import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
import { commentKeys } from "./commentKeys";

const deleteComment = async ({ id }: { id: number }) => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const response = await apiClient.delete(`/comments/${id}`);

  return response.data; // Assuming the API returns the created/updated comment
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: number }>(
    deleteComment, // Pass the mutation function directly
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(commentKeys.getAll());
      },
      onError: (error) => {
        console.error("Error deleting comment:", error);
      },
    }
  );
};
