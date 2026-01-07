//src/routes/postRoutes.js

import express from "express";
import { getUserActivity, createPost } from "../controllers/postController.js"; // Import createPost

const router = express.Router();

router.get("/activity", getUserActivity);
router.post("/generate", createPost); // <--- Add this

export default router;
