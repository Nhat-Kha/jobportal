const User = require("../model/user");
const Recruiter = require("../model/recruiter");
const JobApplicant = require("../model/jobApplicant");
const mongoose = require("mongoose");
const Application = require("../model/applications");

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
      } else if (userData.type === "applicant") {
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
      } else {
        res.json({ message: "Admin" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// update user details
const updateUser = async (req, res) => {
  try {
    console.log("Received Update Request");

    const user = req.user;
    const data = req.body;

    console.log("User:", user);
    console.log("Update Data:", data);

    if (user.type == "recruiter") {
      const recruiter = await Recruiter.findOne({ userId: user._id });

      if (!recruiter) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }

      if (data.contactNumber) {
        recruiter.contactNumber = data.contactNumber;
      }

      if (data.profile) {
        recruiter.profile = data.profile;
      }

      if (data.bio) {
        recruiter.bio = data.bio;
      }

      if (data.banner) {
        recruiter.banner = data.banner;
      }

      await recruiter.save();

      console.log("Recruiter Updated Successfully");
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
          if (data.education && Array.isArray(data.education)) {
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
          if (data.dateOfBirth) {
            jobApplicant.dateOfBirth = data.dateOfBirth;
          }

          return jobApplicant.save();
        })
        .then(() => {
          console.log("Job Applicant Updated Successfully");
        })
        .catch((err) => {
          console.error("Error updating job applicant:", err);
          res.status(400).json(err);
        });
    }

    console.log("User Updated Successfully");
    console.log(data.resume);

    res.json({
      message: "User information updated successfully",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllUserApplicant = async (req, res) => {
  try {
    const allUser = await JobApplicant.find();

    // const allUsers = [...allRecruiter, ...allJobApplicant];

    res.status(200).json({ allUser, message: "show all user successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const getIdApplicant = async (req, res) => {
  const { _id } = req.params;

  JobApplicant.findOne(_id)
    .then((jobapplicant) => {
      if (jobapplicant === null) {
        res.status(404).json({
          message: "User recruiter does not exist",
        });
        return;
      }
      res.json(jobapplicant);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getAllUserRecruiter = async (req, res) => {
  try {
    const allUser = await Recruiter.find();

    // const allUsers = [...allRecruiter, ...allJobApplicant];

    res.status(200).json({ allUser, message: "show all user successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const getIdRecruiter = async (req, res) => {
  let userId = req.params.userId; // Ensure userId is a string
  Recruiter.findOne({ userId: userId })
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
};

// get a list of final applicants for current job : recruiter
// get a list of final applicants for all his jobs : recuiter

const getAList = async (req, res) => {
  const user = req.user;
  if (user.type === "recruiter") {
    let findParams = {
      recruiterId: user._id,
    };
    if (req.query.jobId) {
      findParams = {
        ...findParams,
        jobId: new mongoose.Types.ObjectId(req.query.jobId),
      };
    }
    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        findParams = {
          ...findParams,
          status: { $in: req.query.status },
        };
      } else {
        findParams = {
          ...findParams,
          status: req.query.status,
        };
      }
    }
    let sortParams = {};

    if (!req.query.asc && !req.query.desc) {
      sortParams = { _id: 1 };
    }

    if (req.query.asc) {
      if (Array.isArray(req.query.asc)) {
        req.query.asc.map((key) => {
          sortParams = {
            ...sortParams,
            [key]: 1,
          };
        });
      } else {
        sortParams = {
          ...sortParams,
          [req.query.asc]: 1,
        };
      }
    }

    if (req.query.desc) {
      if (Array.isArray(req.query.desc)) {
        req.query.desc.map((key) => {
          sortParams = {
            ...sortParams,
            [key]: -1,
          };
        });
      } else {
        sortParams = {
          ...sortParams,
          [req.query.desc]: -1,
        };
      }
    }

    Application.aggregate([
      {
        $lookup: {
          from: "jobapplicantinfos",
          localField: "userId",
          foreignField: "userId",
          as: "jobApplicant",
        },
      },
      { $unwind: "$jobApplicant" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      { $match: findParams },
      { $sort: sortParams },
    ])
      .then((applications) => {
        if (applications.length === 0) {
          res.status(404).json({
            message: "No applicants found",
          });
          return;
        }
        res.json(applications);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json({
      message: "You are not allowed to access applicants list",
    });
  }
};

const deleteUser = async (req, res) => {
  const user = req.user;
  if (user.type !== "admin") {
    return res.status(401).json({
      message: "You don't have permissions to delete users",
    });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    console.log("Deleted user from UserAuth:", deletedUser);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const deletedJobApplicant = await JobApplicant.findOneAndDelete({
      userId: deletedUser._id,
    });
    console.log("Deleted job applicant:", deletedJobApplicant);

    res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getUser,
  getAList,
  getAllUser,
  getUserId,
  getIdRecruiter,
  getIdApplicant,
  updateUser,
  deleteUser,
  getAllUserApplicant,
  getAllUserRecruiter,
};
