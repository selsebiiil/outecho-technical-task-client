"use client";

import { useState, useEffect } from "react";
import { useTopics } from "../../hooks/topics/useTopics";
import TopicCard from "./TopicCard";
import { Topic } from "@/app/lib/definitions";
import { useRouter } from "next/router";

const TopicsPage = () => {
  const [page, setPage] = useState(1); // Start from the first page
  const pageSize = 20; // Set the number of topics to fetch per page
  const [allTopics, setAllTopics] = useState<Topic[]>([]); // Store all fetched topics

  const { data, error, isLoading, isFetching } = useTopics(page, pageSize); // Fetch topics data

  // Append new topics to allTopics when data changes
  useEffect(() => {
    if (data?.data) {
      setAllTopics((prevTopics) => {
        const newTopics = data.data.filter(
          (topic: Topic) => !prevTopics.find((t) => t.id === topic.id)
        );
        return [...prevTopics, ...newTopics];
      });
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      {/* Grid for displaying topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTopics.map((topic: Topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Load More Button */}
      {data?.count > page * pageSize && ( // Show button if more topics are available
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={isFetching} // Disable while fetching
            className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-400 transition duration-200"
          >
            {isFetching ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicsPage;
