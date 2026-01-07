// src/routes/authRoutes.js

import express from "express";
import passport from "passport";

const router = express.Router();

// @desc    Auth with GitHub
// @route   GET /auth/github
router.get("/github", passport.authenticate("github"));

// @desc    GitHub auth callback
// @route   GET /auth/github/callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    // CRITICAL FIX: Manually save session before redirecting
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.redirect("/");
      }

      // Only redirect AFTER save is confirmed
      res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`
      );
    });
  }
);

// @desc    Logout user
// @route   GET /auth/logout
// @desc    Logout user
// @route   GET /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    // 1. Destroy the session in the database
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      // 2. Clear the cookie specifically (Crucial for proper cleanup)
      res.clearCookie("connect.sid");

      // 3. Send JSON response. Do NOT redirect.
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});
// @desc    Get current logged in user
// @route   GET /auth/me
router.get("/me", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

export default router;
