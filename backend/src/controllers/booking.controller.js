const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Expert = require("../models/Expert");

const createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

    // 🔎 Validation
    if (!expertId || !name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({
        message: "All required fields are mandatory",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(expertId)) {
      return res.status(400).json({ message: "Invalid expert id" });
    }

    // 🔎 Check expert exists
    const expert = await Expert.findById(expertId);
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    // 🧠 Create booking (race-condition safe via unique index)
    const booking = await Booking.create({
      expert: expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes: notes || "",
      status: "Pending",
    });

    // 🔌 Real-time slot update
    const io = req.app.get("io");
    if (io) {
      io.emit("slotBooked", {
        expertId,
        date,
        timeSlot,
      });
    }

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    // 🔥 Duplicate key error = slot already booked
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This slot is already booked",
      });
    }

    console.error("Create booking error:", error);
    return res.status(500).json({
      message: "Failed to create booking",
    });
  }
};

// GET /bookings?email=
const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const bookings = await Booking.find({ email: email.toLowerCase() })
      .populate("expert", "name category")
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// PATCH /bookings/:id/status
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const allowedStatuses = ["Pending", "Confirmed", "Completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    return res.status(500).json({ message: "Failed to update booking status" });
  }
};

module.exports = {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
};