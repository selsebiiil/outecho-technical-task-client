import { useQuery } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";

const fetchHotTopics = async () => {
  const session = await getSession();
  const response = await apiClient.get("/topics/hot", {});
  return response.data; // Assuming the response contains topics data
};

export const useHotTopics = () => {
  return useQuery(
    ["hot-topics"], // Query key with pagination parameters
    () => fetchHotTopics(), // Query function
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
