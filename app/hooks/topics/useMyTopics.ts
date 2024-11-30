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
  return response.data; // Assuming the response contains topics data
};

export const useMyTopics = (page: number, pageSize: number) => {
  return useQuery(
    ["MY_TOPICS", page, pageSize], // Query key with pagination parameters
    () => fetchMyTopics({ page, pageSize }), // Query function
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
