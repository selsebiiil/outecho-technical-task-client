"use client";

import React, { useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useLikeOrDislikeTopicMutation } from "@/app/hooks/topics/likeTopic";

interface LikeDislikeProps {
  topicId: number;
  initialLikes: string;
  initialDislikes: string;
  initialUserLikeStatus: "LIKE" | "DISLIKE" | null;
}

const LikeDislike: React.FC<LikeDislikeProps> = ({
  topicId,
  initialLikes,
  initialDislikes,
  initialUserLikeStatus,
}) => {
  const { data: session } = useSession();

  const [likes, setLikes] = useState(Number(initialLikes));
  const [dislikes, setDislikes] = useState(Number(initialDislikes));
  const [userLikeStatus, setUserLikeStatus] = useState(initialUserLikeStatus);
  const { mutate: mutateLikeDislike } = useLikeOrDislikeTopicMutation();

  const handleReaction = async (likeStatus: "LIKE" | "DISLIKE") => {
    if (!session?.user?.id) {
      alert("You need to be logged in to react to topics.");
      return;
    }

    try {
      mutateLikeDislike({ id: topicId, data: { likeStatus } });

      // for some reason revalidateTag implemented in actions.ts doesnt work, so refetch and revalidatePath doesn't work
      if (likeStatus === "LIKE") {
        if (userLikeStatus === "LIKE") {
          setLikes(likes - 1);
          setUserLikeStatus(null);
        } else {
          setLikes(likes + 1);
          setDislikes(dislikes - (userLikeStatus === "DISLIKE" ? 1 : 0));
          setUserLikeStatus("LIKE");
        }
      } else if (likeStatus === "DISLIKE") {
        if (userLikeStatus === "DISLIKE") {
          setDislikes(dislikes - 1);
          setUserLikeStatus(null);
        } else {
          setDislikes(dislikes + 1);
          setLikes(likes - (userLikeStatus === "LIKE" ? 1 : 0));
          setUserLikeStatus("DISLIKE");
        }
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleReaction("LIKE")}
      >
        <HandThumbUpIcon className={`h-6 w-6 text-gray-400`} />
        <span className="text-sm text-gray-700">{likes}</span>
      </div>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleReaction("DISLIKE")}
      >
        <HandThumbDownIcon className={`h-6 w-6 text-gray-400`} />
        <span className="text-sm text-gray-700">{dislikes}</span>
      </div>
    </div>
  );
};

export default LikeDislike;
