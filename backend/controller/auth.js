const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../middleware/authKeys");

const User = require("../model/user");
const Recruiter = require("../model/recruiter");
const JobApplicant = require("../model/jobApplicant");

const SignUp = async (req, res) => {
  try {
    // Extract data from the request body
    const data = req.body;

    // create a new user
    let user = new User({
      email: data.email,
      password: data.password,
      type: data.type,
    });

    // save the user to the database
    await user.save();

    // Create user details based on user type
    const userDetails =
      user.type == "recruiter"
        ? new Recruiter({
            userId: user._id,
            name: data.name,
            contactNumber: data.contactNumber,
            bio: data.bio,
          })
        : new JobApplicant({
            userId: user._id,
            name: data.name,
            education: data.education,
            skills: data.skills,
            rating: data.rating,
            resume: data.resume,
            profile: data.profile,
          });

    // Save user details to the database
    await userDetails.save();

    // Token
    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
    // Response with the token and user type
    res.json({
      token: token,
      type: user.type,
    });
  } catch (err) {
    // Handle errors during user creation or user details creation
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// Define a function for user Login
const Login = (req, res, next) => {
  // // return new Promise((resolve, reject) => {
  //   // Use passport for authentication
  //   passport.authenticate(
  //     "local",
  //     { session: false },
  //     function (err, user, info) {
  //       if (err) {
  //         // reject(err);
  //         return next(err);
  //       }

  //       // If authentication fails, Response with an unauthorized status
  //       if (!user) {
  //         res.status(401).json(info);
  //         reject(info);
  //         return;
  //       }

  //       // Token
  //       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
  //       // Response with the token and user type
  //       res.json({
  //         token: token,
  //         type: user.type,
  //       });
  //       resolve();
  //     }
  //   )(req, res, next);
  // // });
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
};

module.exports = {
  SignUp,
  Login,
};
