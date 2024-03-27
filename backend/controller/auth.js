const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../middleware/authKeys");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("../model/user");
const Recruiter = require("../model/recruiter");
const JobApplicant = require("../model/jobApplicant");
const sendMail = require("../utils/sendMail");

// const generateOTP = () => {
//   const min = 1000;
//   const max = 9999;
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const sendVerificationEmail = async (email, otp) => {
//   try {
//     // Gọi hàm sendEmail để gửi email với mã OTP
//     const result = await sendEmail(email, otp); // Pass email and otp directly

//     return result;
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error("Error sending verification email");
//   }
// };

const SignUp = async (req, res) => {
  try {
    // Extract data from the request body
    const data = req.body;

    // create a new user
    let user = new User({
      email: data.email,
      password: data.password,
      type: data.type,
      _id: data._id,
    });

    // Create user details based on user type
    user
      .save()
      .then(() => {
        const userDetails =
          user.type == "recruiter"
            ? new Recruiter({
                userId: user._id,
                name: data.name,
                contactNumber: data.contactNumber,
                bio: data.bio,
                profile: data.profile,
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

        userDetails
          .save()
          .then(() => {
            // Token
            const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
            res.json({
              token: token,
              type: user.type,
              _id: user._id,
            });
          })
          .catch((err) => {
            user
              .delete()
              .then(() => {
                res.status(400).json(err);
              })
              .catch((err) => {
                res.json({ error: err });
              });
            err;
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    // Handle errors during user creation or user details creation
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const sendEmail = (recipient_email, OTP) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>CodePen - OTP Email Template</title>
              

            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Koding 101 Inc</p>
                  <p>1600 Amphitheatre Parkway</p>
                  <p>California</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
};

const VerifyEmail = async (req, res) => {
  console.log("Received OTP verification request");
  const { email, enteredOTP } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = generateOTP();

    await sendVerificationEmail(user.email, otp);

    // save the user to the database
    await user.save();

    if (
      Array.isArray(enteredOTP) &&
      user.otp !== undefined &&
      user.otp.trim() === enteredOTP.map((digit) => digit.trim()).join("")
    ) {
      console.log("Stored OTP: ", user.otp.trim());
      user.otp = null;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "OTP verify successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verify OTP: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
        _id: user._id,
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
  try {
    const { password, token } = req.body;
    if (!password || !token) {
      return res.status(400).json({ error: "Missing Input" });
    }

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Reset Token" });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  SignUp,
  Login,
  forgotPassword,
  resetPassword,
  sendEmail,
  VerifyEmail,
};
