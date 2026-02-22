const express = require("express");
const cors = require("cors");

const app = express();

const expertRoutes = require("./routes/expert.routes");
const bookingRoutes = require("./routes/booking.routes");

// ✅ Allowed Origins (Dev + Prod)
const allowedOrigins = [
  "http://localhost:5173",
  "https://real-time-expert-booking.vercel.app",
];

// ✅ CORS Setup (Production Ready)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
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

// ✅ Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running 🚀" });
});

module.exports = app;
