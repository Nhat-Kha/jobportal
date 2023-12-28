const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../middleware/authKeys");
const crypto = require("crypto");

const User = require("../model/user");
const Recruiter = require("../model/recruiter");
const JobApplicant = require("../model/jobApplicant");
const sendMail = require("../utils/sendMail");

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing Email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();
  const html = `
    <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; font-size: 14px">
      Bạn nhận được email này vì bạn hoặc ai đó đã yêu cầu lấy lại mật khẩu
    </p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; font-size: 14px">
      Chọn vào đây để lấy lại mật khẩu, yêu cầu này sẽ mất hiệu lực sau 15 phút:
    </p>
    <button style="padding: 14px; background-color: #1E90FF; border-radius: 5px; border-style: none; cursor: pointer">
      <a href=${process.env.CLIENT_URL}/password/reset/${resetToken}
        style="color:white; text-decoration-line: none; font-size: 14px; font-weight: 700">
          Reset Password
      </a>
    </button>
    <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 500; font-size: 14px">Nếu bạn không yêu cầu đặt lại mật khẩu, 
    thì có thể bỏ qua email này</p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 900; font-size: 14px">Cảm ơn bạn, </p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-weight: 900; font-size: 14px">JobPortal Support Team!</p>
    <img src="https://res.cloudinary.com/dkmkutpxp/image/upload/v1703743129/a4qjcagbhc7juqqjlpir.jpg" style="width: 20rem" alt="thumbnail">
  `;

  const data = {
    email,
    html,
    subject: "[JobPortal] Password Reset E-Mail",
  };

  const result = await sendMail(data);
  return res.status(200).json({
    success: true,
    result,
  });
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing Input");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // if (!user) throw new Error("Invalid Reset Token");
  if (!user) {
    return res.status(400).json({ error: "Invalid Reset Token" });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).json({
    success: user ? true : false,
    msg: user ? "Update Password" : "Something went wrong",
  });
};

module.exports = {
  SignUp,
  Login,
  forgotPassword,
  resetPassword,
};
