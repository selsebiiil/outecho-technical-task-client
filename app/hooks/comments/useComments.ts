import { useQuery } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";
interface FetchCommentParams {
  id: number;
}

const fetchComments = async ({ id }: FetchCommentParams) => {
  const session = await getSession();

  const response = await apiClient.get(
    `/comments/all/${id}?userId=${session?.user?.id}`,
    {}
  );
  return response.data;
};

export const useComments = (id: number) => {
  return useQuery(
    ["COMMENTS", id],
    () => fetchComments({ id }),

    {
      onSuccess: (data) => {
        console.log("Data fetched successfully:", data);
      },
      onError: (error) => {
        console.error("Error fetching topics:", error);
      },
      enabled: true,
      keepPreviousData: true,
    }
  );
};
