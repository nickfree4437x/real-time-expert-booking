const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    date: {
      type: String, // e.g. "2026-03-01"
      required: true,
    },
    times: {
      type: [String], // e.g. ["10:00", "11:00", "12:00"]
      required: true,
    },
  },
  { _id: false }
);

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    bio: {
      type: String,
      default: "",
    },
    slots: [slotSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expert", expertSchema);