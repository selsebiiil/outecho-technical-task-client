import { Topic } from "@/app/lib/definitions";
import React from "react";
import CommentSection from "./CommentSection";

interface TopicDetailProps {
  topic: Topic;
}

const TopicDetailPage: React.FC<TopicDetailProps> = ({ topic }) => {
  // Helper function to generate initials
  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}.`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      {/* Title and Category Section */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {topic.category}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
      {/* Description */}
      <p className="text-lg text-gray-700">{topic.description}</p>

      {/* Posted By and Date Created Section */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        {/* Posted By */}
        <div className="flex items-center space-x-4">
          <img
            src={topic.avatarUrl}
            alt={`${topic.firstName} ${topic.lastName}`}
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
          />
          <span className="font-medium text-gray-700">
            {getInitials(topic.firstName, topic.lastName)}
          </span>
        </div>

        {/* Date Created */}
        <div>
          <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <CommentSection topicId={topic.id} />
    </div>
  );
};

export default TopicDetailPage;
