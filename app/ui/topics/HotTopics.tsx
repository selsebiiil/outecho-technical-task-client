"use client";
import { useHotTopics } from "@/app/hooks/topics/useHotTopics";
import { Topic } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import Slider from "react-slick";
import { SliderSkeleton } from "../skeletons";

const HotTopics: React.FC = () => {
  const { data, error, isLoading, isFetching } = useHotTopics(); // Fetch topics data
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const handleTopicClick = (topicId: number) => {
    router.push(`/topics/${topicId}`);
  };
  if (isLoading) return <SliderSkeleton />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
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
