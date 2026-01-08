// fetchLeetCodeHistory.js

async function getLeetCodeHistory(username) {
  // Increased limit to 50 to try and catch more history
  const query = `
    query getRecentSubmissions($username: String!) {
      recentAcSubmissionList(username: $username, limit: 50) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: query,
        variables: { username: username },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("LeetCode Error:", data.errors);
      return [];
    }

    const submissions = data.data.recentAcSubmissionList;

    // --- CHANGED LOGIC HERE ---
    // Calculate timestamp for 1 year ago (365 days)
    const oneYearAgo = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60;

    // Filter submissions from the last year
    const recentWork = submissions.filter(
      (sub) => parseInt(sub.timestamp) > oneYearAgo
    );

    return recentWork;
  } catch (error) {
    console.error("Network Error:", error);
    return [];
  }
}

// --- TEST IT ---
// Replace 'your_username' with your actual LeetCode username
// Example: 'neal_wu' or your own handle
getLeetCodeHistory("prithvi_312").then((results) => {
  console.log(`Found ${results.length} submissions from the last year:`);
  console.log(JSON.stringify(results, null, 2));
});
