import { Topic } from "@/app/lib/definitions";
import React from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getInitials } from "@/app/lib/helpers";

interface TopicCardProps {
  topic: Topic;
  showLikes?: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, showLikes = true }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-100 flex flex-col w-full">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">
        <Link href={`/topics/${topic.id}`}>{topic.title}</Link>
      </h2>

      <p className="text-gray-600 mb-3 line-clamp-2 flex-grow">
        {topic.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
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
              <HandThumbUpIcon className={`h-6 w-6 text-gray-400`} />
              <span className="text-sm text-gray-700">{topic.likes}</span>
            </div>
            <div className="flex flex-col items-center">
              <HandThumbDownIcon className={`h-6 w-6 text-gray-400`} />
              <span className="text-sm text-gray-700">{topic.dislikes}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicCard;
