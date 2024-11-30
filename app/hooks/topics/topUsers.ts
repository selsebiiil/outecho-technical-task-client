import { useQuery } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";

const fetchTopUsers = async () => {
  const session = await getSession();
  const response = await apiClient.get("/user/top-commenters", {});
  return response.data; // Assuming the response contains topics data
};

export const useTopUsers = () => {
  return useQuery(
    ["users"], // Query key with pagination parameters
    () => fetchTopUsers(), // Query function
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
