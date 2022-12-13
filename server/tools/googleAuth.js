import passport from "passport";

const googleAuth = passport.authenticate("google", { session: false });

export default googleAuth;