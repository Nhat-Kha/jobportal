const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require("../model/user");
const authKeys = require("./authKeys");

// Helper function to filter unwanted keys from a JSON object
const filterJson = (obj, unwantedKeys) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (unwantedKeys.indexOf(key) === -1) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done, res) => {
      // console.log(email, password);
      User.findOne({ email: email })
        .exec()
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "User does not exist",
            });
          }

          user
            .login(password)
            .then(() => {
              user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
              return done(null, user);
            })
            .catch((err) => {
              return done(err, false, {
                message: "Password is incorrect.",
              });
            });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: authKeys.jwtSecretKey,
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .exec()
        .then((user) => {
          console.log(Object.keys(jwt_payload));
          if (!user) {
            return done(null, false, {
              message: "JWT Token does not exist",
            });
          }
          user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, {
            message: "Incorrect Token",
          });
        });
    }
  )
);

module.exports = passport;
