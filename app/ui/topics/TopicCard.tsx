import { Topic } from "@/app/lib/definitions";
import React from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link"; // Import Link from Next.js

interface TopicCardProps {
  topic: Topic;
  showLikes?: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, showLikes = true }) => {
  // Helper function to generate initials
  const getInitials = (firstName: string, lastName: string) => {
    let initials = "";

    if (firstName && firstName.length > 0) {
      initials += firstName[0].toUpperCase() + ".";
    }

    if (lastName && lastName.length > 0) {
      initials += lastName[0].toUpperCase() + ".";
    }

    // If neither firstName nor lastName is provided, fallback to a default value
    initials = initials || "N/A.";
    return initials;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-100 flex flex-col w-full">
      {/* Topic Title - Wrap with Link */}
      <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">
        <Link href={`/topics/${topic.id}`}>{topic.title}</Link>
      </h2>

      {/* Topic Description (No Link) */}
      <p className="text-gray-600 mb-3 line-clamp-2 flex-grow">
        {topic.description}
      </p>

      {/* Posted By and Likes/Dislikes */}
      <div className="flex items-center justify-between mt-auto">
        {/* Posted By */}
        <div className="flex items-center">
          <img
            src={topic.postedBy ? topic.postedBy.avatarUrl : topic.avatarUrl}
            alt={`${topic.firstName} ${topic.lastName}`}
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            {topic.postedBy
              ? getInitials(topic.postedBy.firstName, topic.postedBy.lastName)
              : getInitials(topic.firstName, topic.lastName)}
          </span>
        </div>

        {showLikes && (
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <HandThumbUpIcon
                className={`h-6 w-6 ${
                  topic.userLikeStatus === "LIKE"
                    ? "text-green-500"
                    : "text-gray-400"
                } cursor-pointer`}
              />
              <span className="text-sm text-gray-700">{topic.likes}</span>
            </div>
            <div className="flex flex-col items-center">
              <HandThumbDownIcon
                className={`h-6 w-6 ${
                  topic.userLikeStatus === "DISLIKE"
                    ? "text-red-500"
                    : "text-gray-400"
                } cursor-pointer`}
              />
              <span className="text-sm text-gray-700">{topic.dislikes}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicCard;
