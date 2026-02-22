const ErrorState = ({ message, onRetry }) => (
  <div className="w-full flex flex-col items-center justify-center py-16 text-center">
    <div className="bg-white border rounded-2xl px-6 py-8 shadow-sm max-w-md w-full">
      <p className="text-red-600 font-medium mb-4">
        {message || "Something went wrong"}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

export default ErrorState;