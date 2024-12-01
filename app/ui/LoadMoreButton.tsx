"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

const LoadMoreButton = ({ currentPage }: { currentPage: number }) => {
  const router = useRouter();

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    router.push(`?page=${nextPage}`); // Update the query parameter to fetch the next page
  };

  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={handleLoadMore}
        className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
      >
        Load More
      </Button>
    </div>
  );
};

export default LoadMoreButton;
