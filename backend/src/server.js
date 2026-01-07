import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// Connect Database
connectDB();

const app = express();

// ==========================================
// 1. MANUAL CORS MIDDLEWARE (The "Hammer")
// ==========================================
// We are manually setting the headers to ensure they are 100% correct.
app.use((req, res, next) => {
  // Allow ONLY the frontend URL
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  // Allow Cookies
  res.header("Access-Control-Allow-Credentials", "true");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle Preflight (OPTIONS) requests immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 2. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Always false for localhost
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

// 4. Passport Middleware
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes
app.get("/", (req, res) => {
  res.send("DevLog API (Manual Headers) is running...");
});
app.use("/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 6. Start Server
const PORT = 8002; // Hardcoded to match your frontend API config
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Manual CORS Headers Active for: http://localhost:5173`);
});
