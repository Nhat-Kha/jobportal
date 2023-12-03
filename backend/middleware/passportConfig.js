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
  // Iterate through keys of the object, check if the key is unwanted
  Object.keys(obj).forEach((key) => {
    if (unwantedKeys.indexOf(key) === -1) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

// Local authenication Strategy
passport.use(
  new Strategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },

    // Callback function for local authentication
    (req, email, password, done, res) => {
      // console.log(email, password);
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "User does not exist",
          });
        }

        // Try to log in the user with the provided password
        user
          .login(password)
          .then(() => {
            // let userSecure = {};
            // const unwantedKeys = ["password", "__v"];
            // Object.keys(user["_doc"]).forEach((key) => {
            //   if (unwantedKeys.indexOf(key) === -1) {
            //     userSecure[key] = user[key];
            //   }
            // });

            // Filter sensitive information from the user object
            user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
            return done(null, user);
          })
          .catch((err) => {
            return done(err, false, {
              message: "Password is incorrect.",
            });
          });
      });
    }
  )
);

// JWT Authentication Strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: authKeys.jwtSecretKey,
    },
    // Callback function for JWT authentication
    (jwt_payload, done) => {
      // Find a user, check if the user does not exists
      User.findById(jwt_payload._id)
        .then((user) => {
          console.log(Object.keys(jwt_payload));
          if (!user) {
            return done(null, false, {
              message: "JWT Token does not exist",
            });
          }

          // Filter sensitive information from the user object
          user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
          return done(null, user);
        })
        .catch((err) => {
          // If there's an error or the token is incorrect
          return done(err, false, {
            message: "Incorrect Token",
          });
        });
    }
  )
);

module.exports = passport;
