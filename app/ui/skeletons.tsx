// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
export function SliderSkeleton() {
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-6 shadow-lg cursor-pointer">
      <h2 className="text-2xl font-bold mb-6 text-center">Hot Topics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skeleton placeholders */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 p-6 rounded-lg shadow-xl animate-pulse"
          >
            <div className="h-8 bg-gray-400 rounded mb-4"></div>
            <div className="h-6 bg-gray-400 rounded mb-2"></div>
            <div className="h-6 bg-gray-400 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopicsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Skeleton for a single card */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 p-6 rounded-lg shadow-xl animate-pulse"
        >
          <div className="h-8 bg-gray-400 rounded mb-4"></div>{" "}
          {/* Title placeholder */}
          <div className="h-6 bg-gray-400 rounded mb-2"></div>{" "}
          {/* Description line 1 */}
          <div className="h-6 bg-gray-400 rounded"></div>{" "}
          {/* Description line 2 */}
        </div>
      ))}
    </div>
  );
}

export function TopUsersSkeleton() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-l font-semibold mb-2">Top Users</h2>
      <div className="max-h-[500px] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center animate-pulse"
            >
              {/* Placeholder for avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              {/* Placeholder for username */}
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopUsersSkeleton;
