import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../config/config'; // Make sure to use your config

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID!,
      clientSecret: config.GOOGLE_CLIENT_SECRET!,
      callbackURL: config.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          email: profile.emails?.[0].value,
          name: profile.displayName,
          picture: profile.photos?.[0].value, // Include profile picture
        };
        // Pass the user object to the callback
        return done(null, user);
      } catch (error) {
        return done(error, "");
      }
    }
  )
);

// Serialize and deserialize user (not strictly required if you're not using sessions)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
