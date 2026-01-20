import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
// Connect Database
connectDB();
const PORT = process.env.PORT || 8002;

const app = express();

// --- FIX 1: Trust Proxy ---
// Required for Render/Heroku/Vercel so 'secure: true' cookies work correctly
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Must match your frontend URL exactly
    credentials: true, // Allows cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// 2. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- FIX 2: Session Configuration ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // Secure is TRUE in production (HTTPS), FALSE in dev (HTTP)
      secure: process.env.NODE_ENV === "production",
      // SameSite must be 'none' to allow cross-site cookies (Vercel <-> Render)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }),
);

// 4. Passport Middleware
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes
app.get("/", (req, res) => {
  res.send("DevPostGen API is running...");
});
app.use("/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 6. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
