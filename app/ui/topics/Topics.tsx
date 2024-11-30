"use client";

import { useState, useEffect } from "react";
import { useTopics } from "../../hooks/topics/useTopics";
import TopicCard from "./TopicCard";
import { Topic } from "@/app/lib/definitions";
import { useRouter } from "next/router";
import { TopicsSkeleton } from "../skeletons";

const TopicsPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [allTopics, setAllTopics] = useState<Topic[]>([]);

  const { data, error, isLoading, isFetching } = useTopics(page, pageSize);

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
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) return <TopicsSkeleton />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTopics.map((topic: Topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {data?.count > page * pageSize && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
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
