import express from "express";
import {
  getUserActivity,
  createPost,
  getLeetCodeStats, // <--- Import
  setLeetCodeUser, // <--- Import
} from "../controllers/postController.js";

const router = express.Router();

router.get("/activity", getUserActivity); // Existing GitHub logic
router.post("/generate", createPost);

// --- NEW LEETCODE ROUTES ---
router.get("/leetcode", getLeetCodeStats);
router.post("/leetcode/user", setLeetCodeUser); // Call this from frontend settings
// ---------------------------

export default router;
