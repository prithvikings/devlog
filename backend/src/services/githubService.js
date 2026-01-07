import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";

/**
 * Helper to make authenticated GitHub requests
 */
const githubRequest = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `GitHub API Error (${url}):`,
      error.response?.data?.message || error.message
    );
    return null; // Return null so we can filter it out later
  }
};

/**
 * Main function to get the "clean" activity log
 */
export const getDailyActivity = async (accessToken, username) => {
  // 1. Calculate time range (Last 24 hours)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const sinceISO = yesterday.toISOString();

  console.log(`Fetching activity for ${username} since ${sinceISO}`);

  // 2. Get recently updated repos (Limit to 10 to save API calls)
  // We only care about repos updated recently
  const reposUrl = `${GITHUB_API_BASE}/user/repos?sort=updated&direction=desc&per_page=10`;
  const repos = await githubRequest(reposUrl, accessToken);

  if (!repos || repos.length === 0) return [];

  let allCommits = [];

  // 3. Iterate through repos and find commits
  for (const repo of repos) {
    // API: Get commits for this repo since yesterday, authored by the user
    const commitsUrl = `${GITHUB_API_BASE}/repos/${repo.owner.login}/${repo.name}/commits?since=${sinceISO}&author=${username}`;
    const commits = await githubRequest(commitsUrl, accessToken);

    if (commits && commits.length > 0) {
      // 4. For each commit, we MUST fetch details to get 'files' and 'stats'
      // The list endpoint doesn't provide file changes, only the specific endpoint does.
      const detailedCommitsPromises = commits.map(async (commit) => {
        // Skip merge commits (usually have > 1 parent)
        if (commit.parents && commit.parents.length > 1) return null;

        const detailsUrl = commit.url; // This is the API URL for the specific commit
        const details = await githubRequest(detailsUrl, accessToken);

        if (!details) return null;

        return {
          repo: repo.name,
          message: details.commit.message,
          url: details.html_url,
          timestamp: details.commit.committer.date,
          stats: details.stats, // { total, additions, deletions }
          files: details.files.map((f) => ({
            filename: f.filename,
            status: f.status, // modified, added, removed
            additions: f.additions,
            deletions: f.deletions,
          })),
        };
      });

      const detailedCommits = await Promise.all(detailedCommitsPromises);
      allCommits = [...allCommits, ...detailedCommits];
    }
  }

  // 5. Final Clean up: Remove nulls (failed reqs or skipped commits)
  const cleanData = allCommits.filter((c) => c !== null);

  return cleanData;
};
