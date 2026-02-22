const mongoose = require("mongoose");
const Expert = require("../models/Expert");

// GET /experts?search=&category=&page=&limit=
const getExperts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const [experts, totalExperts] = await Promise.all([
      Expert.find(query).skip(skip).limit(limitNumber).sort({ createdAt: -1 }),
      Expert.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalExperts / limitNumber);

    return res.status(200).json({
      experts,
      pagination: {
        totalExperts,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching experts:", error);
    return res.status(500).json({
      message: "Failed to fetch experts",
    });
  }
};

// GET /experts/:id
const getExpertById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expert id" });
    }

    const expert = await Expert.findById(id);

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    return res.status(200).json({ expert });
  } catch (error) {
    console.error("Error fetching expert:", error);
    return res.status(500).json({
      message: "Failed to fetch expert",
    });
  }
};

// POST /experts
// expert.controller.js (createExpert)
const createExpert = async (req, res) => {
  try {
    console.log("REQ HEADERS:", req.headers["content-type"]);
    console.log("REQ BODY:", req.body); // 👈 debug

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing. Send JSON with Content-Type: application/json",
      });
    }

    const { name, category, experience, rating, slots } = req.body;

    if (!name || !category || !experience) {
      return res.status(400).json({
        message: "Name, category and experience are required",
      });
    }

    const expert = await Expert.create({
      name,
      category,
      experience,
      rating: rating || 4.5,
      slots: slots || [],
    });

    return res.status(201).json({
      message: "Expert created successfully",
      expert,
    });
  } catch (error) {
    console.error("Error creating expert:", error);
    return res.status(500).json({ message: "Failed to create expert" });
  }
};

module.exports = {
  getExperts,
  getExpertById,
  createExpert,
};