"use client"; // components/HotTopics.tsx
import { useHotTopics } from "@/app/hooks/topics/useHotTopics";
import { Topic } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import React from "react";
import Slider from "react-slick"; // Import the slider component from react-slick

const HotTopics: React.FC = () => {
  const { data, error, isLoading, isFetching } = useHotTopics(); // Fetch topics data
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 topics at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Speed up autoplay for smoother experience
    centerMode: true, // Centers the active slide
    focusOnSelect: true, // Focuses on selected slide
    responsive: [
      {
        breakpoint: 1024, // When the screen width is 1024px or less
        settings: {
          slidesToShow: 2, // Show 2 topics at a time
        },
      },
      {
        breakpoint: 768, // When the screen width is 768px or less
        settings: {
          slidesToShow: 1, // Show 1 topic at a time
        },
      },
    ],
  };
  const handleTopicClick = (topicId: number) => {
    router.push(`/topics/${topicId}`); // Navigate to the topic page using its ID
  };
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-6  shadow-lg cursor-pointer">
      <h2 className="text-2xl font-bold mb-6 text-center">Hot Topics</h2>

      <Slider {...settings}>
        {data?.slice(0, 10).map((topic: Topic) => (
          <div
            key={topic.id}
            className="bg-gray-300 p-6 rounded-lg shadow-xl transition-transform duration-300 transform scale-90 hover:scale-100"
            onClick={() => handleTopicClick(topic.id)}
          >
            <h3 className="font-semibold  h-16 text-2xl text-gray-800 overflow-hidden truncate">
              {topic.title}
            </h3>
            <p className="text-gray-700 text-lg h-16 overflow-hidden truncate">
              {topic.description}
            </p>{" "}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HotTopics;
