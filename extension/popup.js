const BASE_URL = "http://localhost:8002";

const setStatus = (msg, type = "neutral") => {
  const el = document.getElementById("message");
  el.textContent = msg;
  el.className = type === "error" ? "text-red" : "text-green";
  el.style.display = "block";
};

// 1. INIT
document.addEventListener("DOMContentLoaded", async () => {
  const userStatus = document.getElementById("user-status");
  const commitCount = document.getElementById("commit-count");
  const generateBtn = document.getElementById("generateBtn");

  try {
    const authRes = await fetch(`${BASE_URL}/auth/me`, {
      credentials: "include",
    });

    if (!authRes.ok) {
      userStatus.textContent = "Not logged in";
      commitCount.textContent = "--";
      generateBtn.disabled = true;
      setStatus("Please log in on the website.", "error");
      return;
    }

    const user = await authRes.json();
    userStatus.textContent = `Logged in as ${user.username}`;

    const activityRes = await fetch(`${BASE_URL}/api/posts/activity`, {
      credentials: "include",
    });
    if (activityRes.ok) {
      const data = await activityRes.json();
      commitCount.textContent = data.count || "0";
    }
  } catch (err) {
    userStatus.textContent = "Server Error";
  }
});

// 2. GENERATE
document.getElementById("generateBtn").addEventListener("click", async () => {
  const tone = document.getElementById("tone").value;
  const platform = document.getElementById("platform").value;
  const btn = document.getElementById("generateBtn");
  const resultContainer = document.getElementById("result-container");
  const textArea = document.getElementById("generated-text");

  // UI Reset
  btn.disabled = true;
  btn.textContent = "Generating...";
  setStatus("");
  resultContainer.classList.add("hidden"); // Hide previous result while loading

  try {
    const response = await fetch(`${BASE_URL}/api/posts/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ tone, platform }),
    });

    const data = await response.json();

    if (response.ok) {
      // SHOW RESULT
      textArea.value = data.content; // 'content' comes from your DB/Schema
      resultContainer.classList.remove("hidden");

      setStatus("Generated!", "success");
      btn.textContent = "✨ Generate Again";
    } else {
      throw new Error(data.message || "Generation failed");
    }
  } catch (error) {
    setStatus(error.message, "error");
    btn.textContent = "✨ Generate Post";
  } finally {
    btn.disabled = false;
  }
});

// 3. COPY FUNCTIONALITY
document.getElementById("copyBtn").addEventListener("click", () => {
  const textArea = document.getElementById("generated-text");
  const copyBtn = document.getElementById("copyBtn");

  if (!textArea.value) return;

  navigator.clipboard
    .writeText(textArea.value)
    .then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied! ✅";
      copyBtn.style.color = "#4ade80"; // Green text
      copyBtn.style.borderColor = "#4ade80";

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.color = "";
        copyBtn.style.borderColor = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      setStatus("Failed to copy", "error");
    });
});
