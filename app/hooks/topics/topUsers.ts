import { useQuery } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";

const fetchTopUsers = async () => {
  const session = await getSession();
  const response = await apiClient.get("/user/top-commenters", {});
  return response.data;
};

export const useTopUsers = () => {
  return useQuery(["users"], () => fetchTopUsers(), {
    onSuccess: (data) => {
      console.log("Data fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching topics:", error);
    },
    enabled: true,
    keepPreviousData: true,
  });
};
