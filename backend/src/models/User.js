import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    leetcodeUsername: {
      type: String,
      default: null, // User needs to set this manually once
    },
    avatarUrl: String,
    accessToken: String, // We need this to fetch their repos later
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    // Store user preferences here so they persist across sessions
    preferences: {
      defaultTone: {
        type: String,
        default: "casual", // 'casual', 'technical', 'ship_it'
      },
      defaultPlatform: {
        type: String,
        default: "twitter", // 'twitter', 'linkedin'
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
