import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport"; // Import the library
import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js"; // Import our function
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// Connect Database
connectDB();

const app = express();

// ... (Your CORS and Express JSON middleware stays here) ...
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... (Your Session middleware stays here) ...
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// --- PASSPORT SETUP (UPDATED) ---
// 1. Configure the strategy explicitly
configurePassport(passport);

// 2. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello from devlog");
});

// Routes
app.use("/auth", authRoutes);
app.use("/api/posts", postRoutes);

// ... (Rest of the file) ...
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
