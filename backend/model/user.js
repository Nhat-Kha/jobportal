const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("mongoose-type-email");
const crypto = require("crypto");

let schema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["recruiter", "applicant", "admin"],
      required: true,
    },

    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

// Password hashing
schema.pre("save", function (next) {
  let user = this;

  // if the data is not modified
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Password verification upon login
// schema.methods.login = function (password) {
//   let user = this;

//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         reject(err);
//       }
//       if (result) {
//         resolve();
//       } else {
//         reject();
//       }
//     });
//   });
// };

schema.methods = {
  login: function (password) {
    let user = this;

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve();
        } else {
          reject();
        }
      });
    });
  },
  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 5 * 60 * 1000;
    return resetToken;
  },
};

module.exports = mongoose.model("UserAuth", schema);
