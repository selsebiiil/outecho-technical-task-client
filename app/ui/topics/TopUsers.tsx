"use client";
import { useTopUsers } from "@/app/hooks/topics/topUsers";
import { User } from "@/app/lib/definitions";
import React from "react";
import { useRouter } from "next/navigation";

const TopUsers: React.FC = () => {
  const router = useRouter();
  const { data, error, isLoading } = useTopUsers(); // Fetch topics data

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-l font-semibold mb-2">Top Users</h2>
      <div className="max-h-[500px] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {data?.map((user: User) => (
            <div
              key={user.id}
              onClick={() => router.push(`/profile/${user.id}`)} // Navigate to the user's profile
              className="bg-white p-4 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-200 transition"
            >
              <img
                src={user.avatarUrl}
                alt={user.firstName || "User Avatar"}
                className="w-12 h-12 rounded-full mr-4"
              />
              <span className="text-lg font-medium">
                {user.firstName || "N/A"} {user.lastName || ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
