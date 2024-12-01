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
import ConfirmationModal from "./../ConfirmationModal";
import { useCreateTopicMutation } from "@/app/hooks/topics/createTopic";

import { useDeleteTopicMutation } from "@/app/hooks/topics/deleteTopic";

const TopicsPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<number | null>(null);
  const { mutate: createTopic } = useCreateTopicMutation();
  const { mutate: deleteTopic } = useDeleteTopicMutation();

  const { data, error, isLoading, isFetching, refetch } = useMyTopics(
    page,
    pageSize
  );

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleCreate = () => {
    setEditingTopic(null);
    setIsModalOpen(true);
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setIsModalOpen(true);
  };
  const handleDelete = (topicId: number) => {
    setTopicToDelete(topicId);
    setIsConfirmationModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (topicToDelete) {
      deleteTopic({ id: topicToDelete as number });

      setIsConfirmationModalOpen(false);
      setTopicToDelete(null);
    }
  };

  const handleSave = (title: string, category: string, description: string) => {
    if (editingTopic) {
      createTopic({
        id: editingTopic.id as number,
        data: { title, category, description },
      });
    } else {
      createTopic({
        id: 0,
        data: { title, category, description },
      });
    }
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New
        </button>
      </div>
      {data?.data?.map((topic: Topic) => (
        <div key={topic.id} className="flex flex-col sm:flex-row">
          <TopicCard key={topic.id} topic={topic} />

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
