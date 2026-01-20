import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

const configurePassport = (passport) => {
  // 1. Serialize User (Session storage)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 2. Deserialize User (Session retrieval)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // 3. Define the GitHub Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL + "/auth/github/callback",
        scope: ["read:user", "repo"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists
          let user = await User.findOne({ githubId: profile.id });

          if (user) {
            user.accessToken = accessToken;
            user.lastLogin = Date.now();
            await user.save();
            return done(null, user);
          }

          // Create new user
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            avatarUrl: profile.photos[0].value,
            accessToken: accessToken,
          });

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      },
    ),
  );
};

export default configurePassport;
