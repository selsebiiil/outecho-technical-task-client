import { PlusIcon } from "@heroicons/react/20/solid";
import MyTopics from "../ui/topics/MyTopics";

export default async function MyTopicsPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white p-6 mb-8">
        <h1 className="text-4xl font-extrabold text-center">My Topics</h1>
      </div>

      {/* Render Topics */}

      <MyTopics />
    </div>
  );
}
