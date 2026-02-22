import { Link } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300">
      {/* Top Info */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition">
          {expert.name}
        </h3>

        <span className="inline-block mt-1 text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
          {expert.category}
        </span>
      </div>

      {/* Meta */}
      <div className="text-sm text-gray-600 space-y-1 mt-2">
        <p>{expert.experience} years experience</p>
        <p className="flex items-center gap-1">
          ⭐ <span className="font-medium text-gray-800">{expert.rating}</span>
        </p>
      </div>

      {/* CTA Button */}
      <Link
        to={`/experts/${expert._id}`}
        className="mt-5 inline-flex items-center justify-center w-full rounded-xl bg-indigo-600 text-white py-2.5 text-sm font-semibold hover:bg-indigo-700 transition"
      >
        View Slots & Book
      </Link>
    </div>
  );
};

export default ExpertCard;