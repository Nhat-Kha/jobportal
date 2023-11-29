const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../middleware/authKeys");

const User = require("../model/user");
const Recruiter = require("../model/recruiter");
const JobApplicant = require("../model/jobApplicant"); // Add this line if not already imported

const SignUp = async (req, res) => {
  try {
    const data = req.body;
    let user = new User({
      email: data.email,
      password: data.password,
      type: data.type,
    });

    await user.save();

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

    await userDetails.save();

    // Token
    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
    res.json({
      token: token,
      type: user.type,
    });
  } catch (err) {
    // Handle errors during user creation or user details creation
    res.status(400).json({ error: err.message });
  }
};

const Login = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
        if (err) {
          reject(err);
          return;
        }
        if (!user) {
          res.status(401).json(info);
          reject(info);
          return;
        }
        // Token
        const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
        res.json({
          token: token,
          type: user.type,
        });
        resolve();
      }
    )(req, res, next);
  });
};

module.exports = {
  SignUp,
  Login,
};
