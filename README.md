# DevPostGen: Turn Code into Content 🚀

**DevPostGen** is a comprehensive ecosystem designed for developers to effortlessly track their daily progress and transform their coding activity into engaging social media content. Whether it's a GitHub commit or a LeetCode problem solved, DevPostGen uses AI to help you build your personal brand with zero friction.

---

## 🏗️ Project Architecture

The project is split into three main components:

### 1. [Backend](./backend) (The Brain)

A robust Node.js & Express API that handles the heavy lifting.

- **AI Integration:** Powered by Google Gemini to analyze code changes and generate creative drafts.
- **Authentication:** Secure GitHub OAuth integration via Passport.js.
- **Data Fetching:** Custom services for real-time GitHub activity and LeetCode progression.
- **Database:** MongoDB for persistent storage of users and logs.

### 2. [Frontend](./frontend) (The Hub)

A high-performance React 19 dashboard for managing your DevPostGen presence.

- **Tech:** Vite, Tailwind CSS 4, Radix UI, and Motion.
- **Features:** A sleek landing page, protected dashboard, and detailed activity tracking.
- **UX:** Premium dark-mode aesthetics with smooth micro-animations.

### 3. [Extension](./extension) (The Companion)

A Chrome Extension that lives in your browser for instant updates.

- **Workflow:** One-click sync of your latest work directly from the browser popup.
- **Social Ready:** Select items, choose your tone (Hype, Technical, Casual), and generate platform-optimized drafts for Twitter and LinkedIn.
- **Persistence:** Remembers your drafts even after closing the popup.

---

## 🛠️ Tech Stack

| Layer            | Technologies                                                    |
| :--------------- | :-------------------------------------------------------------- |
| **Frontend**     | React 19, Vite, Tailwind CSS 4, Motion, React Router 7          |
| **Backend**      | Node.js, Express 5, MongoDB, Passport.js, Google Gemini AI      |
| **Extension**    | Manifest V3, React 19, Vite, Tailwind CSS 4, Chrome Storage API |
| **Integrations** | GitHub API, LeetCode API                                        |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/DevPostGen.git
cd DevPostGen
```

### 2. Setup the Backend

1. Go to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with `MONGO_URI`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GEMINI_API_KEY`, and `SESSION_SECRET`.
4. Start the server: `npm run dev` (Runs on port 8002)

### 3. Setup the Frontend

1. Go to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev` (Runs on port 5173)

### 4. Setup the Extension

1. Go to the extension folder: `cd extension`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Load the `dist` folder into Chrome via `chrome://extensions/` (Enable Developer Mode -> Load Unpacked).

---

## ✨ Key Features

- **Automated Logging:** Stops the "what did I do today?" struggle by pulling data directly from your sources.
- **Tone Personalization:** Let the AI match your voice, from professional technical breakdowns to high-energy "hype" posts.
- **Developer First:** Built with a "dark-mode first" philosophy and a focus on speed and minimal friction.
- **Cross-Platform:** Write once, publish everywhere (Twitter, LinkedIn, and the DevPostGen Dashboard).

---

## 📁 Repository Structure

```text
DevPostGen/
├── backend/    # Express API, AI logic, and Database models
├── frontend/   # Main web application dashboard
└── extension/  # Chrome Extension for quick-access drafting
```
