import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

const BookingForm = () => {
  const navigate = useNavigate();
  const { expertId } = useParams();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date");
  const timeSlot = searchParams.get("timeSlot");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: date || "",
    timeSlot: timeSlot || "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🛡️ Guard: URL missing params
  if (!expertId || !date || !timeSlot) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500 text-center px-4">
        Invalid booking session. Please go back and select a slot again.
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone } = form;

    if (!name || !email || !phone) {
      setError("All required fields are mandatory");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/bookings", {
        expertId,
        name,
        email,
        phone,
        date,
        timeSlot,
        notes: form.notes,
      });

      setSuccess("Booking successful 🎉");
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("This slot is already booked. Please select another slot.");
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid input");
      } else {
        setError("Failed to create booking");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
            Book Your Session
          </h1>
          <p className="text-gray-500 mb-6">
            Fill in your details to confirm the booking
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-600 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div> 
              <input
                name="name"
                placeholder="Enter your full name"
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                name="phone"
                placeholder="Enter your phone number"
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* Locked fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  name="date"
                  type="date"
                  disabled
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-600"
                  value={form.date}
                />
              </div>

              <div>
                <input
                  name="timeSlot"
                  disabled
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-600"
                  value={form.timeSlot}
                />
              </div>
            </div>

            <div>
              <textarea
                name="notes"
                rows={3}
                placeholder="Any special request...(optional)"
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-indigo-600 text-white py-2.5 text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;