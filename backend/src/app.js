const express = require("express");
const cors = require("cors");

const app = express();

const expertRoutes = require("./routes/expert.routes");
const bookingRoutes = require("./routes/booking.routes");

// ✅ CORS (dev setup)
app.use(
  cors({
    origin: "https://real-time-expert-booking.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Body parser (MUST be before routes)
app.use(express.json());

// ✅ Routes
app.use("/experts", expertRoutes);
app.use("/bookings", bookingRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running 🚀" });
});

module.exports = app;
