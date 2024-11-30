import { Categories } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { z } from "zod";

const categories = [
  "GENERAL",
  "TECHNOLOGY",
  "SPORTS",
  "ENTERTAINMENT",
  "HEALTH",
  "EDUCATION",
];

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, category: string, description: string) => void;
  initialData?: { title: string; category: string; description: string };
};

const topicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(
    ["GENERAL", "TECHNOLOGY", "SPORTS", "ENTERTAINMENT", "HEALTH", "EDUCATION"],
    {
      errorMap: () => ({ message: "Category is required" }),
    }
  ),
  description: z.string().min(1, "Description is required"),
});

const TopicModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "GENERAL");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Store validation errors

  // Reset the form when the modal opens and when initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setDescription(initialData.description);
    } else {
      // Reset to empty values when opening for "Create" mode
      setTitle("");
      setCategory("GENERAL");
      setDescription("");
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    // Validate form using Zod schema
    const result = topicSchema.safeParse({ title, category, description });

    if (!result.success) {
      // If validation fails, set error messages
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      onSave(title, category, description);
      onClose(); // Close the modal after saving
    }
  };

  if (!isOpen) return null; // Don't render the modal if not open

  return (
    <div className="w-full fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Topic" : "Create Topic"}
        </h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title}</span>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-xs">{errors.category}</span>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            rows={4}
          />
          {errors.description && (
            <span className="text-red-500 text-xs">{errors.description}</span>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            {initialData ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
