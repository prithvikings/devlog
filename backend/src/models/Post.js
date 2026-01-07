import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // The raw data from GitHub (snapshot of what happened that day)
    // We store this so we can "Regenerate" without hitting GitHub API again
    sourceData: {
      commitCount: Number,
      reposTouched: [String],
      summary: String, // The intermediate technical summary
    },
    // The final AI output
    content: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["twitter", "linkedin"],
      required: true,
    },
    tone: {
      type: String,
      default: "casual",
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

// Index for fast lookup: "Get me this user's posts for this date"
postSchema.index({ user: 1, date: -1 });

export default mongoose.model("Post", postSchema);
