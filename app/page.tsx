// pages/index.tsx
import React from "react";
import Topics from "./ui/topics/Topics";
import HotTopics from "./ui/topics/HotTopics";
import TopUsers from "./ui/topics/TopUsers";

const HomePage = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white p-6 mb-8">
        <h1 className="text-4xl font-extrabold text-center">
          Welcome to <span className="text-yellow-300">BotTalk</span> – Your
          Daily Dose of Trending Conversations
        </h1>
        <p className="text-xl text-center mt-2">
          Stay updated with the latest topics, discussions, and top users from
          our community.
        </p>
      </div>

      {/* Hot Topics */}
      <div className="mt-6">
        <HotTopics />
      </div>
      <h1 className="text-4xl font-extrabold mt-8 text-center">
        Latest Topics
      </h1>
      {/* Main Content */}
      <div className="p-8 flex flex-col lg:flex-row">
        <div className="flex-1 lg:w-4/5 mb-6 lg:mb-0 mr-6">
          <Topics />
        </div>
        <div className="lg:w-1/5 space-y-4">
          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
