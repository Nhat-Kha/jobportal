const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3,4}$/.test(v);
        },
        msg: "Phone number is invalid!",
      },
    },

    bio: {
      type: String,
    },
    profile: {
      type: String,
    },
    banner: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("RecruiterInfo", schema);
