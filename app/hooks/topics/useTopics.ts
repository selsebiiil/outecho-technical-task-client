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

const fetchTopics = async ({ page, pageSize }: FetchTopicsParams) => {
  const session = await getSession();
  const response = await apiClient.get("/topics/all", {
    params: {
      page,
      pageSize,
      userId: session?.user?.id,
    },
  });
  return response.data;
};

export const useTopics = (page: number, pageSize: number) => {
  return useQuery(
    ["topics", page, pageSize],
    () => fetchTopics({ page, pageSize }),
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
