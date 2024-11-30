"use client";

import { useCreateMutation } from "@/app/hooks/comments/createComment";
import { useLikeOrDislikeCommentMutation } from "@/app/hooks/comments/likeComment";
import { useComments } from "@/app/hooks/comments/useComments";
import { Comment } from "@/app/lib/definitions";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import EditCommentModal from "./EditCommentModal";
import { useDeleteCommentMutation } from "@/app/hooks/comments/deleteComment";

interface CommentSectionProps {
  topicId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ topicId }) => {
  const { data: session } = useSession();
  const { data, error, isLoading } = useComments(topicId); // Fetch comments data
  const [comment, setComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] =
    useState<string>("");

  const { mutate: postComment, isLoading: isPosting } = useCreateMutation();
  const { mutate: mutateLikeDislike } = useLikeOrDislikeCommentMutation();
  const { mutate: deleteComment } = useDeleteCommentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handlePostComment = async () => {
    if (!comment.trim()) return;

    try {
      const data = { topicId, content: comment };
      postComment({ id: 0, data });
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleLikeOrDislike = async (
    id: number,
    likeStatus: "LIKE" | "DISLIKE"
  ) => {
    if (!session) return;
    try {
      mutateLikeDislike({ id, data: { likeStatus } });
    } catch (error) {
      console.error(`Error handling like/dislike for comment ${id}:`, error);
    }
  };

  const handleDelete = (commentId: number) => {
    setEditingCommentId(commentId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      deleteComment({ id: editingCommentId as number });
    } catch (error) {
      console.error(`Error deleting  comment ${editingCommentId}:`, error);
    }
    setIsModalOpen(false);
    setEditingCommentId(null);
  };

  const handleEdit = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(currentContent);
  };

  const handleSaveEdit = async (editedContent: string) => {
    if (editedContent.trim()) {
      try {
        const data = { topicId, content: editedContent };
        await postComment({ id: editingCommentId as number, data });
        setEditingCommentId(null);
        setEditingCommentContent("");
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  const renderCommentActions = (comment: Comment) => {
    if (
      (session?.user?.id as string) !== (comment.authorId as unknown as string)
    )
      return null;
    return (
      <div className="flex justify-start space-x-4">
        <button
          onClick={(e) => {
            handleEdit(comment.id, comment.content);
            e.stopPropagation();
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            handleDelete(comment.id);
            e.stopPropagation();
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-6">
      <h3 className="text-2xl font-semibold text-gray-800">Comments</h3>

      {/* Comment input */}
      {session && (
        <div className="mt-4">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-2 border rounded-md text-sm text-gray-700"
            placeholder="Add a comment..."
          />
          <button
            onClick={handlePostComment}
            className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer"
            disabled={!comment.trim() || isPosting}
          >
            Post Comment
          </button>
        </div>
      )}

      {/* List of comments */}
      <div className="mt-6 space-y-4">
        {data?.length === 0 ? (
          <div>No comments yet. Be the first to comment!</div>
        ) : (
          data?.map((comment: Comment) => (
            <div
              key={comment.id}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
            >
              {/* Row 1: Avatar, name, content, like/dislike */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={comment.avatarUrl}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-semibold">
                    {comment.firstName} {comment.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                </div>

                {/* Like and Dislike Icons */}
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex flex-col items-center">
                    <HandThumbUpIcon
                      className={`h-5 w-5 ${
                        comment.userLikeStatus === "LIKE"
                          ? "text-green-500"
                          : "text-gray-400"
                      } ${session ? "cursor-pointer" : ""}`}
                      onClick={() => handleLikeOrDislike(comment.id, "LIKE")}
                    />
                    <span className="text-sm text-gray-700">
                      {comment.likes}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <HandThumbDownIcon
                      className={`h-5 w-5 ${
                        comment.userLikeStatus === "DISLIKE"
                          ? "text-red-500"
                          : "text-gray-400"
                      } ${session ? "cursor-pointer" : ""}`}
                      onClick={() => handleLikeOrDislike(comment.id, "DISLIKE")}
                    />
                    <span className="text-sm text-gray-700">
                      {comment.dislikes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Edit and Delete Icons */}
              {renderCommentActions(comment)}
            </div>
          ))
        )}
      </div>

      {/* Edit Comment Modal */}
      <EditCommentModal
        isOpen={editingCommentId !== null}
        commentId={editingCommentId}
        currentContent={editingCommentContent}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
          message="Are you sure you want to delete this comment?"
        />
      )}
    </div>
  );
};

export default CommentSection;
