import TopicCard from "./TopicCard";
import LoadMoreButton from "../LoadMoreButton";
import { useTopics } from "@/app/hooks/topics/useTopics";
import { Topic } from "@/app/lib/definitions";

const TopicsPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const page = parseInt(searchParams?.page || "1", 10);
  const pageSize = 20;
  const response = await fetch(`${process.env.API_URL}/topics/all`);
  const { data: topics, count } = await response.json();

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic: Topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {count > page * pageSize && (
        <LoadMoreButton currentPage={page} /> // Load more handled via client component
      )}
    </div>
  );
};

export default TopicsPage;
