const User = require("../model/user");
const Recruiter = require("../model/recruiter");
const JobApplicant = require("../model/jobApplicant");

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();

    // const allUsers = [...allRecruiter, ...allJobApplicant];

    res.status(200).json({ allUser, message: "show all user successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// get user's personal details
const getUser = (req, res) => {
  try {
    const user = req.user;
    if (user.type === "recruiter") {
      Recruiter.findOne({ userId: user._id })
        .then((recruiter) => {
          if (recruiter == null) {
            res.status(404).json({
              message: "User does not exist",
            });
            return;
          }
          res.json(recruiter);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      JobApplicant.findOne({ userId: user._id })
        .then((jobApplicant) => {
          if (jobApplicant == null) {
            res.status(404).json({
              message: "User does not exist",
            });
            return;
          }
          res.json(jobApplicant);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// get user details from id
const getUserId = async (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((userData) => {
      if (userData === null) {
        res.status(404).json({
          message: "User data does not exist",
        });
        return;
      }

      if (userData.type === "recruiter") {
        Recruiter.findOne({ userId: userData._id })
          .then((recruiter) => {
            if (recruiter === null) {
              res.status(404).json({
                message: "User recruiter does not exist",
              });
              return;
            }
            res.json(recruiter);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        JobApplicant.findOne({ userId: userData._id })
          .then((jobApplicant) => {
            if (jobApplicant === null) {
              res.status(404).json({
                message: "User job applicant does not exist",
              });
              return;
            }
            res.json(jobApplicant);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update user details
const updateUser = async (req, res) => {
  const user = req.user;
  const data = req.body;
  if (user.type == "recruiter") {
    Recruiter.findOne({ userId: user._id })
      .then((recruiter) => {
        if (recruiter == null) {
          res.status(404).json({
            message: "User does not exist",
          });
          return;
        }
        if (data.name) {
          recruiter.name = data.name;
        }
        if (data.contactNumber) {
          recruiter.contactNumber = data.contactNumber;
        }
        if (data.bio) {
          recruiter.bio = data.bio;
        }
        recruiter
          .save()
          .then(() => {
            res.json({
              message: "User information updated successfully",
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    JobApplicant.findOne({ userId: user._id })
      .then((jobApplicant) => {
        if (jobApplicant == null) {
          res.status(404).json({
            message: "User does not exist",
          });
          return;
        }
        if (data.name) {
          jobApplicant.name = data.name;
        }
        if (data.education) {
          jobApplicant.education = data.education;
        }
        if (data.skills) {
          jobApplicant.skills = data.skills;
        }
        if (data.resume) {
          jobApplicant.resume = data.resume;
        }
        if (data.profile) {
          jobApplicant.profile = data.profile;
        }
        console.log(jobApplicant);
        jobApplicant
          .save()
          .then(() => {
            res.json({
              message: "User information updated successfully",
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports = {
  getUser,
  getAllUser,
  getUserId,
  updateUser,
};
