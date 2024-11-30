"use client";

import { useState, useEffect } from "react";
import { useMyTopics } from "@/app/hooks/topics/useMyTopics";
import TopicCard from "./TopicCard";
import { Topic } from "@/app/lib/definitions";
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import TopicModal from "./TopicModal";
import ConfirmationModal from "./../ConfirmationModal"; // Adjust the import path based on where your modal is located
import { useCreateTopicMutation } from "@/app/hooks/topics/createTopic";
import { useRouter } from "next/navigation";
import { useDeleteTopicMutation } from "@/app/hooks/topics/deleteTopic";

const TopicsPage = () => {
  const [page, setPage] = useState(1); // Start from the first page
  const pageSize = 20; // Set the number of topics to fetch per page
  const router = useRouter();
  const [allTopics, setAllTopics] = useState<Topic[]>([]); // Store all fetched topics
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State to control the confirmation modal
  const [topicToDelete, setTopicToDelete] = useState<number | null>(null); // Store the topic being deleted
  const { mutate: createTopic, isLoading: isPosting } =
    useCreateTopicMutation();
  const { mutate: deleteTopic } = useDeleteTopicMutation();

  //   const { mutate: deleteTopic } = useDeleteCommentMutation();

  const { data, error, isLoading, isFetching, refetch } = useMyTopics(
    page,
    pageSize
  ); // Fetch topics data

  // Append new topics to allTopics when data changes
  useEffect(() => {
    if (data?.data) {
      setAllTopics((prevTopics) => {
        const newTopics = data.data.filter(
          (topic: Topic) => !prevTopics.find((t) => t.id === topic.id)
        );
        return [...prevTopics, ...newTopics];
      });
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };
  const handleCreate = () => {
    setEditingTopic(null); // Ensure no topic is set for editing
    setIsModalOpen(true);
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic); // Set the topic to edit
    setIsModalOpen(true);
  };
  const handleDelete = (topicId: number) => {
    setTopicToDelete(topicId); // Store the topic to delete
    setIsConfirmationModalOpen(true); // Open the confirmation modal
  };
  const handleDeleteConfirm = () => {
    if (topicToDelete) {
      // Perform the delete operation (e.g., call your API to delete the topic)
      deleteTopic({ id: topicToDelete as number });
      // After deletion, close the confirmation modal
      setIsConfirmationModalOpen(false);
      setTopicToDelete(null); // Reset the topic to delete
    }
  };

  const handleSave = (title: string, category: string, description: string) => {
    if (editingTopic) {
      // Save the edited topic (you can update your API here)
      createTopic({
        id: editingTopic.id as number,
        data: { title, category, description },
      });
      refetch();
    } else {
      createTopic({
        id: 0,
        data: { title, category, description },
      });
      refetch();
      // Create a new topic (you can call an API here to save it)
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6 p-8">
      {/* Create New Topic Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New
        </button>
      </div>
      {allTopics.map((topic: Topic) => (
        <div key={topic.id} className="flex flex-col sm:flex-row">
          <TopicCard key={topic.id} topic={topic} />
          {/* Edit and Delete Buttons */}
          <div className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-2 sm:ml-4 mt-4 sm:mt-0  justify-evenly">
            <button
              onClick={() => handleEdit(topic)}
              className="text-blue-600 hover:text-blue-800 flex items-center justify-center w-full sm:w-auto"
            >
              <PencilSquareIcon className="w-6 h-6 mr-1" />
              <span className="sm:hidden ml-2">Edit</span>
            </button>
            <button
              onClick={() => handleDelete(topic.id)}
              className="text-red-600 hover:text-red-800 flex items-center justify-center w-full sm:w-auto"
            >
              <TrashIcon className="h-6 w-6" />
              <span className="sm:hidden ml-2">Delete</span>
            </button>
          </div>
        </div>
      ))}
      {/* Load More Button */}
      {data?.count > page * pageSize && ( // Show button if more topics are available
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={isFetching} // Disable while fetching
            className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-400 transition duration-200"
          >
            {isFetching ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
      {/* Modal for creating or editing a topic */}
      <TopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={
          editingTopic
            ? {
                title: editingTopic.title,
                category: editingTopic.category as string,
                description: editingTopic.description,
              }
            : undefined
        }
      />
      {/* Confirmation Modal for deletion */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmationModalOpen(false)}
        message="Are you sure you want to delete this topic?"
      />
    </div>
  );
};

export default TopicsPage;
