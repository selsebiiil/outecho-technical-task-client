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
  return response.data; // Assuming the response contains topics data
};

export const useTopics = (page: number, pageSize: number) => {
  return useQuery(
    ["topics", page, pageSize], // Query key with pagination parameters
    () => fetchTopics({ page, pageSize }), // Query function
    {
      onSuccess: (data) => {
        console.log("Data fetched successfully:", data);
      },
      onError: (error) => {
        console.error("Error fetching topics:", error);
      },
      enabled: true, // You can conditionally enable or disable the query based on certain conditions
      keepPreviousData: true, // Keep previous data while new data is being fetched
    }
  );
};
