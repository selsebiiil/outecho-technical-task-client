import React, { useState, useEffect } from "react";

interface EditCommentModalProps {
  isOpen: boolean;
  commentId: number | null;
  currentContent: string | "";
  onSave: (content: string) => void;
  onCancel: () => void;
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({
  isOpen,
  commentId,
  currentContent,
  onSave,
  onCancel,
}) => {
  const [editedComment, setEditedComment] = useState(currentContent);

  useEffect(() => {
    setEditedComment(currentContent);
  }, [currentContent]);

  const handleSave = () => {
    if (editedComment?.trim()) {
      onSave(editedComment);
    }
  };

  return (
    isOpen &&
    currentContent && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
          <h3 className="text-xl font-semibold text-gray-800">Edit Comment</h3>
          <textarea
            value={editedComment as string}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full p-2 border rounded-md text-sm text-gray-700 mt-4"
          />
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditCommentModal;
