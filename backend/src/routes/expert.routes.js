const express = require("express");
const router = express.Router();
const {
  getExperts,
  getExpertById,
  createExpert,   // 👈 add this
} = require("../controllers/expert.controller");

router.get("/", getExperts);
router.get("/:id", getExpertById);

// ✅ Add expert (for testing/admin)
router.post("/", createExpert);

module.exports = router;