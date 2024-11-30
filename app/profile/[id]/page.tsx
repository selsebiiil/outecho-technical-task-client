import { Topic } from "@/app/lib/definitions";
import ScrollToTop from "@/app/ScrollProvider";
import TopicCard from "@/app/ui/topics/TopicCard";
import UserDetails from "@/app/ui/user/UserDetail";
import { notFound } from "next/navigation";

export default async function ProfileDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);

  if (!res.ok) {
    notFound();
  }

  const user = await res.json();

  return (
    <ScrollToTop>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        {/* User Details */}
        <UserDetails user={user} />

        {/* Topics Section */}
        <div className="w-full max-w-3xl px-6 py-4 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Topics</h2>
          {user.topics.length > 0 ? (
            <ul className="space-y-4">
              {user.topics.map((topic: Topic) => (
                <li key={topic.id}>
                  <TopicCard topic={topic} showLikes={false}></TopicCard>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">This user has no topics yet.</p>
          )}
        </div>
      </div>
    </ScrollToTop>
  );
}
