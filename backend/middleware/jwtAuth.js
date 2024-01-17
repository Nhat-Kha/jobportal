const passport = require("passport");

const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      console.error("JWT Auth Error:", err);
      return next(err);
    }
    if (!user) {
      console.error("JWT Auth Failed:", info);
      res.status(401).json(info);
      return;
    }

    console.log("Authenticated User:", user);
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = jwtAuth;
