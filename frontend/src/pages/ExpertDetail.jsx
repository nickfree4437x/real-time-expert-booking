import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { socket } from "../sockets/socket";

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert] = useState(null);
  const [slotsState, setSlotsState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`/experts/${id}`);
        const data = res.data.expert;
        setExpert(data);

        const initialState = {};
        if (data?.slots?.length) {
          data.slots.forEach((slot) => {
            initialState[slot.date] = {};
            slot.times.forEach((time) => {
              initialState[slot.date][time] = "available";
            });
          });
        }
        setSlotsState(initialState);
      } catch (err) {
        setError("Failed to load expert details");
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id]);

  useEffect(() => {
    const handleSlotBooked = ({ expertId, date, timeSlot }) => {
      if (expertId !== id) return;

      setSlotsState((prev) => {
        if (!prev[date]) return prev;

        return {
          ...prev,
          [date]: {
            ...prev[date],
            [timeSlot]: "booked",
          },
        };
      });
    };

    socket.on("slotBooked", handleSlotBooked);

    return () => {
      socket.off("slotBooked", handleSlotBooked);
    };
  }, [id]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading expert details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!expert) return null;

  const hasSlots = Object.keys(slotsState).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Expert Header */}
        <div className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            {expert.name}
          </h1>

          <p className="text-gray-600 mt-1">
            {expert.category} • {expert.experience} years experience
          </p>

          <p className="mt-2 text-sm">
            ⭐ <span className="font-semibold">{expert.rating}</span> rating
          </p>
        </div>

        {/* Slots Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Available Slots
          </h2>

          {!hasSlots && (
            <div className="bg-white border rounded-xl p-6 text-gray-500">
              No slots available right now.
            </div>
          )}

          <div className="space-y-6">
            {Object.keys(slotsState).map((date) => (
              <div
                key={date}
                className="bg-white border rounded-xl p-5 shadow-sm"
              >
                <h3 className="font-medium text-slate-700">{date}</h3>

                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.keys(slotsState[date]).map((time) => {
                    const isBooked = slotsState[date][time] === "booked";

                    return (
                      <button
                        key={time}
                        disabled={isBooked}
                        onClick={() =>
                          navigate(
                            `/book/${id}?date=${encodeURIComponent(
                              date
                            )}&timeSlot=${encodeURIComponent(time)}`
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                          ${
                            isBooked
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-200 hover:border-indigo-300"
                          }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetail;