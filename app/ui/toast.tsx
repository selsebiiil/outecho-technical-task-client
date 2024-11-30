export const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md flex items-center gap-2">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-sm font-semibold text-yellow-500 hover:text-yellow-600"
      >
        Close
      </button>
    </div>
  );
};
