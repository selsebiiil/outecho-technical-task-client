import React from "react";
import CommentSection from "./CommentSection";
import LikeDislike from "./LikeDislike";
import { Topic } from "@/app/lib/definitions";
import { getInitials } from "@/app/lib/helpers";

interface TopicDetailProps {
  topic: Topic;
}

const TopicDetailPage: React.FC<TopicDetailProps> = ({ topic }) => {
  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {topic.category}
        </span>
        <div className="absolute top-8 right-8">
          <LikeDislike
            topicId={topic.id}
            initialLikes={topic.likes}
            initialDislikes={topic.dislikes}
            initialUserLikeStatus={topic.userLikeStatus}
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>

      <p className="text-lg text-gray-700">{topic.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-600">
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

        <div>
          <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection topicId={topic.id} />
    </div>
  );
};

export default TopicDetailPage;
