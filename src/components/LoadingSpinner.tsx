const LoadingSpinner: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
    {text && (
      <span className="text-gray-600 text-center whitespace-pre-line">
        {text}
      </span>
    )}
  </div>
);

export default LoadingSpinner;
