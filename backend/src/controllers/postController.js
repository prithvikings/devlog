import { getDailyActivity } from "../services/githubService.js";
import { generateSocialPost } from "../services/aiService.js";
import Post from "../models/Post.js";
import { getLeetCodeActivity } from "../services/leetcodeService.js";
import User from "../models/User.js";

// @desc    Get raw GitHub activity for the last 24h
// @route   GET /api/posts/activity
export const getUserActivity = async (req, res) => {
  try {
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
  // Add 'selectedActivity' to extracted body
  const { platform, tone, selectedActivity } = req.body;

  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    let combinedData;

    // CHECK: Did the frontend send specific selected items?
    if (
      selectedActivity &&
      (selectedActivity.github.length > 0 ||
        selectedActivity.leetcode.length > 0)
    ) {
      // YES: Use the user's selection
      combinedData = selectedActivity;
    } else {
      // NO: Fetch everything fresh (Fallback logic)
      const githubActivity = await getDailyActivity(
        req.user.accessToken,
        req.user.username
      );

      let leetcodeActivity = null;
      const user = await User.findById(req.user._id);
      if (user.leetcodeUsername) {
        try {
          leetcodeActivity = await getLeetCodeActivity(user.leetcodeUsername);
        } catch (e) {
          console.log("Skipping LeetCode (Fetch failed)");
        }
      }

      combinedData = {
        github: githubActivity,
        leetcode: leetcodeActivity ? leetcodeActivity.recentSubmissions : [],
      };
    }

    // Validation: If both sources are empty (after filtering or fetching)
    if (
      (!combinedData.github || combinedData.github.length === 0) &&
      (!combinedData.leetcode || combinedData.leetcode.length === 0)
    ) {
      return res.status(400).json({ message: "No activity selected!" });
    }

    // Generate Content
    const generated = await generateSocialPost(combinedData, platform, tone);

    // Save to DB
    const newPost = await Post.create({
      user: req.user._id,
      sourceData: {
        commitCount: combinedData.github.length + combinedData.leetcode.length,
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

// @desc    Set LeetCode Username (With Validation)
// @route   POST /api/posts/leetcode/user
export const setLeetCodeUser = async (req, res) => {
  const { username } = req.body;

  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // 1. Verify if this user actually exists on LeetCode
    try {
      await getLeetCodeActivity(username);
    } catch (error) {
      return res.status(400).json({
        message: `Could not find user '${username}' on LeetCode. Check spelling.`,
      });
    }

    // 2. If valid, save to DB
    const user = await User.findById(req.user._id);
    user.leetcodeUsername = username;
    await user.save();

    res.json({
      message: "LeetCode username linked successfully",
      leetcodeUsername: username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error setting username" });
  }
};

// @desc    Get LeetCode Activity
// @route   GET /api/posts/leetcode
export const getLeetCodeStats = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user._id);

    if (!user.leetcodeUsername) {
      return res.status(400).json({
        message: "No LeetCode username linked. Please link it in settings.",
        requiresSetup: true,
      });
    }

    const activity = await getLeetCodeActivity(user.leetcodeUsername);

    res.json({
      count: activity.recentSubmissions.length,
      data: activity,
    });
  } catch (error) {
    console.error("LC Controller Error:", error);
    res.status(500).json({ message: "Server Error fetching LeetCode stats" });
  }
};
