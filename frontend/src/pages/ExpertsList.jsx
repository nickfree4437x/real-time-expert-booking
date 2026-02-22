import { useEffect, useState } from "react";
import axios from "../api/axios";
import ExpertCard from "../components/ExpertCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const ExpertsList = () => {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/experts", {
        params: {
          page,
          limit: 6,
          search,
          category,
        },
      });

      setExperts(res.data.experts);
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (err) {
      setError("Failed to load experts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [page, search, category]);

  const handleRetry = () => {
    fetchExperts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Find Your Expert
          </h1>
          <p className="text-gray-500 mt-2">
            Connect with professionals across different domains
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search expert by name..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full md:w-1/2 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
              className="w-full md:w-1/3 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="Tech">Tech</option>
              <option value="Career">Career</option>
              <option value="Fitness">Fitness</option>
            </select>
          </div>
        </div>

        {/* States */}
        {loading && <Loader />}
        {error && <ErrorState message={error} onRetry={handleRetry} />}

        {!loading && !error && experts.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            No experts found. Try a different search.
          </div>
        )}

        {/* Experts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            experts.map((expert) => (
              <ExpertCard key={expert._id} expert={expert} />
            ))}
        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2 rounded-lg border text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Prev
            </button>

            <span className="text-sm font-medium text-gray-600">
              Page <span className="text-gray-900">{page}</span> of{" "}
              <span className="text-gray-900">{totalPages}</span>
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-lg border text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertsList;