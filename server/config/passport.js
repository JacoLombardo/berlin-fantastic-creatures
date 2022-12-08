import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "../model/userModel.js";

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET_KEY
  secretOrKey: "Mondobongo"
};

const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      console.log("err :>> ", err);
      return done(err, false);
    }
    if (user) {
    //   console.log("user in passport>>>>>", user);
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
