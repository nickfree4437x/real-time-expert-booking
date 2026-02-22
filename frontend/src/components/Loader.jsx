const Loader = () => (
  <div className="w-full flex flex-col items-center justify-center py-16">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
    <p className="mt-3 text-sm text-gray-500">Loading, please wait...</p>
  </div>
);

export default Loader;