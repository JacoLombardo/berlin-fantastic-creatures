import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/userModel.js";
import * as dotenv from 'dotenv';

dotenv.config();

var opts = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
};

const googleStrategy = new GoogleStrategy(opts, function (accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
});

const passportGoogleConfig = (passport) => {
  passport.use(googleStrategy);
};

export default passportGoogleConfig;
