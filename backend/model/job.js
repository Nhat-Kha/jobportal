const mongoose = require("mongoose");

// Define a Schema for the "jobs" collections
let schema = new mongoose.Schema(
  {
    // userID associanted with the jobs
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // title of the job
    title: {
      type: String,
      required: true,
    },
    // Maxium number of applicant allowed for the job
    maxApplicants: {
      type: Number,
      validate: [
        {
          // Validator to check if the value is an integer
          validator: Number.isInteger,
          msg: "maxApplicants should be an integer",
        },
        {
          // Validator to check if the value is greater than 0
          validator: function (value) {
            return value > 0;
          },
          msg: "maxApplicants should greater than 0",
        },
      ],
    },
    // Maximum number of positions available for the job
    maxPositions: {
      type: Number,
      validate: [
        {
          // Validator to check if the value is an integer
          validator: Number.isInteger,
          msg: "maxPostions should be an integer",
        },
        {
          // Validator to check if the value is greater than 0
          validator: function (value) {
            return value > 0;
          },
          msg: "maxPositions should greater than 0",
        },
      ],
    },
    // Number of active applications for the job (default is 0)
    activeApplications: {
      type: Number,
      default: 0,
      validate: [
        {
          // Validator to check if the value is an integer
          validator: Number.isInteger,
          msg: "activeApplications should be an integer",
        },
        {
          // Validator to check if the value is greater than 0
          validator: function (value) {
            return value >= 0;
          },
          msg: "activeApplications should greater than equal to 0",
        },
      ],
    },
    acceptedCandidates: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "acceptedCandidates should be an integer",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "acceptedCandidates should greater than equal to 0",
        },
      ],
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfPosting < value;
          },
          msg: "deadline should be greater than dateOfPosting",
        },
      ],
    },
    skillsets: [String],
    jobType: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Duration should be an integer",
        },
      ],
    },
    salary: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Salary should be an integer",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "Salary should be positive",
        },
      ],
    },
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("jobs", schema);
