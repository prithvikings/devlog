import { getDailyActivity } from "../services/githubService.js";
import { generateSocialPost } from "../services/aiService.js"; // <--- Import this
import Post from "../models/Post.js"; // <--- Import Model
// @desc    Get raw GitHub activity for the last 24h
// @route   GET /api/posts/activity
export const getUserActivity = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.user || !req.user.accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in with GitHub" });
    }

    const activity = await getDailyActivity(
      req.user.accessToken,
      req.user.username
    );

    res.json({
      count: activity.length,
      date: new Date().toISOString().split("T")[0],
      activity: activity,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: "Server Error fetching activity" });
  }
};

// @desc    Generate a post from recent activity
// @route   POST /api/posts/generate
export const createPost = async (req, res) => {
  const { platform, tone } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1. Fetch fresh data (Or we could pass it from frontend, but fetching is safer)
    const activity = await getDailyActivity(
      req.user.accessToken,
      req.user.username
    );

    if (!activity || activity.length === 0) {
      return res
        .status(400)
        .json({
          message: "No activity detected in the last 24h. Go code something.",
        });
    }

    // 2. Generate Content
    const generated = await generateSocialPost(activity, platform, tone);

    // 3. Save to DB (Draft status)
    const newPost = await Post.create({
      user: req.user._id,
      sourceData: {
        commitCount: activity.length,
        summary: generated.summary,
      },
      content: generated.post,
      platform: platform || "twitter",
      tone: tone || "casual",
      date: new Date().toISOString().split("T")[0],
    });

    res.json(newPost);
  } catch (error) {
    console.error("Generation Error:", error);
    res.status(500).json({ message: "Failed to generate post" });
  }
};
