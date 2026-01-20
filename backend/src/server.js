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
const PORT = process.env.PORT || 8002;

const app = express();

// --- FIX 1: Trust Proxy ---
// Required for Render/Heroku/Vercel so 'secure: true' cookies work correctly
app.set("trust proxy", 1);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Define allowed origins
  const allowedOrigins = [
    process.env.CLIENT_URL, // e.g., https://dev-post-gen.vercel.app
    "http://localhost:5173", // Always allow local dev
    "chrome-extension://gbbpmhbollojfkenpkdbpbafcgnkneei",
  ];

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

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
