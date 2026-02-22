import { useState } from "react";
import axios from "../api/axios";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const fetchBookings = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/bookings", {
        params: { email },
      });

      setBookings(res.data.bookings || []);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchBookings();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            My Bookings
          </h1>
          <p className="text-gray-500 mt-1">
            View all your scheduled sessions in one place
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* States */}
        {loading && <Loader />}
        {error && <ErrorState message={error} />}

        {!loading && !error && bookings.length === 0 && (
          <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
            No bookings found for this email.
          </div>
        )}

        {/* Bookings List */}
        <div className="space-y-4">
          {!loading &&
            !error &&
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {booking.expert?.name}{" "}
                    <span className="text-gray-500 text-sm">
                      ({booking.expert?.category})
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.date} • {booking.timeSlot}
                  </p>
                </div>

                <span
                  className={`mt-3 sm:mt-0 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;