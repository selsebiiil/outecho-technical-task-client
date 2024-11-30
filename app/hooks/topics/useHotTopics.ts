import { useQuery } from "react-query";
import { apiClient } from "../../lib/api";
import { getSession } from "next-auth/react";

const fetchHotTopics = async () => {
  const session = await getSession();
  const response = await apiClient.get("/topics/hot", {});
  return response.data;
};

export const useHotTopics = () => {
  return useQuery(["hot-topics"], () => fetchHotTopics(), {
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
