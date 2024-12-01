import { useQuery } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";

interface Topic {
  id: number;
  title: string;
}

interface FetchTopicsParams {
  page: number;
  pageSize: number;
}

const fetchMyTopics = async ({ page, pageSize }: FetchTopicsParams) => {
  const session = await getSession();
  const response = await apiClient.get("/topics/my", {
    params: {
      page,
      pageSize,
      userId: session?.user?.id,
    },
  });
  return response.data;
};

export const useMyTopics = (page: number, pageSize: number) => {
  return useQuery(
    ["MYTOPICS", page, pageSize],
    () => fetchMyTopics({ page, pageSize }),
    {
      onSuccess: (data) => {
        console.log("Data fetched successfully:", data);
      },
      onError: (error) => {
        console.error("Error fetching topics:", error);
      },
    }
  );
};
