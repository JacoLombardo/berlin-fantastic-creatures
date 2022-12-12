import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "../model/userModel.js";
import * as dotenv from 'dotenv';

dotenv.config();

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};

const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      console.log("err :>> ", err);
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
