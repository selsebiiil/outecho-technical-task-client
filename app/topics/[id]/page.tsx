import TopicDetailPage from "@/app/ui/topics/TopicDetailPage";
import { notFound } from "next/navigation";

export default async function TopicDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`);

  if (!res.ok) {
    notFound();
  }

  const topic = await res.json();

  // Render topic data using TopicDetailsCard component
  return (
    <div className="py-12 px-6">
      <TopicDetailPage topic={topic[0]} />
    </div>
  );
}
