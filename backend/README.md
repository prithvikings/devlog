# DevLog Backend

A robust Node.js API serving as the backbone for the DevLog ecosystem, handling authentication, data persistence, and AI-powered insights.

## 🚀 Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express 5](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication:** [Passport.js](https://www.passportjs.org/) (GitHub Strategy)
- **AI Integration:** [Google Generative AI](https://ai.google.dev/) (Gemini API)
- **Session Management:** [express-session](https://github.com/expressjs/session)
- **External APIs:** GitHub API, LeetCode API (via custom services)

## ✨ Core Features

- **GitHub OAuth:** Secure authentication using GitHub credentials via Passport.js.
- **AI-Powered Insights:** Integration with Google Gemini for automated code analysis and logging.
- **External Integrations:** Seamlessly fetches data from GitHub and LeetCode to track developer progress.
- **Persistent Sessions:** Cookie-based session tracking with secure manual CORS configuration.
- **Scalable Architecture:** Clean separation of concerns with Controllers, Services, and Models.

## 📁 Project Structure

```text
backend/
├── src/
│   ├── config/         # Database and Passport configurations
│   ├── controllers/    # Request handlers and business logic
│   ├── middleware/     # Custom auth and validation middleware
│   ├── models/         # Mongoose schemas (User, Post)
│   ├── routes/         # Express API routes (Auth, Posts)
│   ├── services/       # External API integrations (AI, GitHub, LeetCode)
│   ├── utils/          # Helper functions and constants
│   ├── server.js       # Main server entry point
│   └── app.js          # App initialization (if applicable)
├── .env                # Environment variables (Sensitive)
└── package.json        # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)
- GitHub OAuth Credentials
- Google Gemini API Key

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `backend/` root with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   GITHUB_CLIENT_ID=your_id
   GITHUB_CLIENT_SECRET=your_secret
   GEMINI_API_KEY=your_key
   SESSION_SECRET=your_secret
   ```

### Running Locally

To start the server in development mode (with nodemon):

```bash
npm run dev
```

The server defaults to port `8002`.

## 📡 API Endpoints

### Auth

- `GET /auth/github`: Initiates GitHub OAuth login.
- `GET /auth/github/callback`: GitHub OAuth callback URL.
- `GET /auth/logout`: Destroys the user session.
- `GET /auth/user`: Returns the current authenticated user.

### Posts

- `GET /api/posts`: Fetch all devlogs.
- `POST /api/posts`: Create a new devlog entry.
- `DELETE /api/posts/:id`: Delete a specific devlog.
