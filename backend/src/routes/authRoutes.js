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
    // Successful authentication, redirect to frontend.
    // In dev, we redirect to the React app port (usually 5173)
    // In prod, this will be your domain
    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`
    );
  }
);

// @desc    Logout user
// @route   GET /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL || "http://localhost:5173");
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
