require("dotenv").config();
const mongoose = require("mongoose");
const Expert = require("../models/Expert");
const connectDB = require("../config/db");

const seedExperts = async () => {
  try {
    await connectDB();

    // Optional: clear old data for clean demo
    await Expert.deleteMany();

    const experts = [
      {
        name: "Rahul Sharma",
        category: "Fitness",
        experience: 5,
        rating: 4.6,
        bio: "Certified fitness coach with 5+ years experience.",
        slots: [
          { date: "2026-02-23", times: ["10:00 AM", "11:00 AM", "12:00 PM"] },
          { date: "2026-02-24", times: ["02:00 PM", "03:00 PM"] },
        ],
      },
      {
        name: "Anita Verma",
        category: "Career",
        experience: 8,
        rating: 4.8,
        bio: "Career mentor for IT & management students.",
        slots: [
          { date: "2026-02-23", times: ["09:00 AM", "10:30 AM"] },
          { date: "2026-02-25", times: ["01:00 PM", "03:00 PM"] },
        ],
      },
      {
        name: "Dr. Mohit Jain",
        category: "Health",
        experience: 12,
        rating: 4.7,
        bio: "General physician & wellness coach.",
        slots: [
          { date: "2026-02-24", times: ["11:00 AM", "01:00 PM"] },
        ],
      },
      {
        name: "Neha Kapoor",
        category: "Mental Health",
        experience: 6,
        rating: 4.9,
        bio: "Certified therapist for stress & anxiety management.",
        slots: [
          { date: "2026-02-25", times: ["10:00 AM", "12:00 PM"] },
        ],
      },
      {
        name: "Arjun Mehta",
        category: "Finance",
        experience: 7,
        rating: 4.5,
        bio: "Personal finance advisor & investment planner.",
        slots: [
          { date: "2026-02-26", times: ["11:30 AM", "02:30 PM"] },
        ],
      },
      {
        name: "Pooja Nair",
        category: "Nutrition",
        experience: 4,
        rating: 4.4,
        bio: "Dietician & nutrition coach for weight management.",
        slots: [
          { date: "2026-02-23", times: ["08:00 AM", "09:30 AM"] },
        ],
      },
      {
        name: "Sandeep Kulkarni",
        category: "Startup Mentorship",
        experience: 10,
        rating: 4.7,
        bio: "Startup mentor helping founders scale products.",
        slots: [
          { date: "2026-02-27", times: ["10:00 AM", "11:30 AM"] },
        ],
      },
      {
        name: "Ritika Malhotra",
        category: "Design",
        experience: 6,
        rating: 4.6,
        bio: "UI/UX designer with product design experience.",
        slots: [
          { date: "2026-02-26", times: ["03:00 PM", "04:30 PM"] },
        ],
      },
      {
        name: "Amit Bansal",
        category: "Software Engineering",
        experience: 9,
        rating: 4.8,
        bio: "Full-stack engineer mentoring developers.",
        slots: [
          { date: "2026-02-28", times: ["10:00 AM", "12:00 PM"] },
        ],
      },
      {
        name: "Kavita Joshi",
        category: "HR",
        experience: 11,
        rating: 4.5,
        bio: "HR professional for interview & career guidance.",
        slots: [
          { date: "2026-02-27", times: ["01:00 PM", "03:00 PM"] },
        ],
      },
      {
        name: "Rohit Singh",
        category: "Marketing",
        experience: 5,
        rating: 4.3,
        bio: "Digital marketing consultant & growth hacker.",
        slots: [
          { date: "2026-02-28", times: ["11:00 AM", "01:00 PM"] },
        ],
      },
      {
        name: "Simran Kaur",
        category: "Communication Skills",
        experience: 6,
        rating: 4.7,
        bio: "Public speaking & communication coach.",
        slots: [
          { date: "2026-02-29", times: ["10:00 AM", "12:00 PM"] },
        ],
      },
    ];

    await Expert.insertMany(experts);

    console.log("✅ 12 Experts seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding experts:", error);
    process.exit(1);
  }
};

seedExperts();