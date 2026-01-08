// src/services/leetcodeService.js
import axios from "axios";

const LEETCODE_API_URL = "https://leetcode.com/graphql";

export const getLeetCodeActivity = async (username) => {
  const query = `
    query getRecentSubmissions($username: String!) {
      recentAcSubmissionList(username: $username, limit: 20) {
        id
        title
        titleSlug
        timestamp
      }
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      LEETCODE_API_URL,
      {
        query,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Sometimes LeetCode blocks requests without a User-Agent
          "User-Agent": "Mozilla/5.0 (Node.js fetcher)",
        },
      }
    );

    const data = response.data.data;

    if (!data.matchedUser) {
      throw new Error("LeetCode user not found");
    }

    // 1. Filter for submissions in the last 24 hours
    const oneDayAgo = Date.now() / 1000 - 24 * 60 * 60;
    const recentActivity = data.recentAcSubmissionList.filter(
      (sub) => sub.timestamp > oneDayAgo
    );

    // 2. Format the data for our AI or Frontend
    return {
      username: username,
      totalSolved: data.matchedUser.submitStats.acSubmissionNum,
      recentSubmissions: recentActivity.map((sub) => ({
        title: sub.title,
        timestamp: new Date(sub.timestamp * 1000).toISOString(),
        url: `https://leetcode.com/problems/${sub.titleSlug}/`,
      })),
    };
  } catch (error) {
    console.error("LeetCode Fetch Error:", error.message);
    throw new Error("Failed to fetch LeetCode data");
  }
};
