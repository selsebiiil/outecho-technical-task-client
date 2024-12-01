import { useTopUsers } from "@/app/hooks/topics/topUsers";
import { User } from "@/app/lib/definitions";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import TopUsersSkeleton from "../skeletons";
import Link from "next/link";
import { revalidateTag } from "next/cache";

// Fetch data on the server
const fetchTopUsers = async (): Promise<User[]> => {
  const response = await fetch(`${process.env.API_URL}/user/top-commenters`, {
    next: { tags: ["TOP_USERS"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch top users");
  }

  return response.json();
};
export default async function TopUsers() {
  const data = await fetchTopUsers();

  return (
    <Suspense fallback={<TopUsersSkeleton />}>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-l font-semibold mb-2">Top Users</h2>
        <div className="max-h-[500px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {data.map((user: User) => (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
