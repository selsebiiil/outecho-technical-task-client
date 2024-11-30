"use client";

import { User } from "@/app/lib/definitions";
import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import EditProfile from "./EditProfile";
import { useSession } from "next-auth/react";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      <img
        src={user.avatarUrl}
        alt={`${user.firstName} ${user.lastName}'s Avatar`}
        className="w-32 h-32 rounded-full shadow-lg"
      />
      <h1 className="mt-4 text-3xl font-bold text-gray-800">
        {user.firstName} {user.lastName}
      </h1>

      {session &&
        (session.user.id as string) === (user.id as unknown as string) && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 text-gray-800 hover:text-gray-600 flex items-center"
          >
            <PencilSquareIcon className="w-6 h-6 mr-1" /> Edit
          </button>
        )}

      {isEditing && (
        <EditProfile user={user} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default UserDetails;
