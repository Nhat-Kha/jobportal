const Job = require("../model/job");
const Application = require("../model/applications");

// Function to add a new job
const addJob = async (req, res) => {
  const user = req.user;

  // Check if the user is a recruiter
  if (user.type !== "recruiter") {
    res.status(401).json({
      message: "You don't have permissions to add jobs",
    });
    return;
  }

  // Extract job data from the request body
  const data = req.body;

  // Create a new job instance
  let job = new Job({
    userId: user._id,
    profile: user.profile,
    title: data.title,
    maxApplicants: data.maxApplicants,
    maxPositions: data.maxPositions,
    dateOfPosting: data.dateOfPosting,
    deadline: data.deadline,
    skillsets: data.skillsets,
    jobType: data.jobType,
    duration: data.duration,
    salary: data.salary,
    rating: data.rating,
    description: data.description,
    location: data.location,
  });
  console.log(data);

  // Save the job to the database
  job
    .save()
    .then(() => {
      res.json({ message: "Job added successfully to the database" });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

// Function to get list job
const getJobList = async (req, res) => {
  let user = req.user;

  // Define filters and sorting parameters based on query parameters
  let findParams = {};
  let sortParams = {};

  // Filter jobs for recruiters if 'myjobs' query parameter is present
  // if (user.type === "recruiter" && req.query.myjobs) {
  //   findParams = {
  //     ...findParams,
  //     userId: user._id,
  //   };
  // }

  // Filter jobs based on title using 'q' query parameter
  if (req.query.q) {
    findParams = {
      ...findParams,
      title: {
        $regex: new RegExp(req.query.q, "i"),
      },
    };
  }

  // Filter jobs based on job type using 'jobType' query parameter
  if (req.query.jobType) {
    let jobTypes = [];
    if (Array.isArray(req.query.jobType)) {
      jobTypes = req.query.jobType;
    } else {
      jobTypes = [req.query.jobType];
    }
    console.log(jobTypes);
    findParams = {
      ...findParams,
      jobType: {
        $in: jobTypes,
      },
    };
  }

  // Filter jobs based on salary range using 'salaryMin' and 'salaryMax' query parameters
  if (req.query.salaryMin && req.query.salaryMax) {
    findParams = {
      ...findParams,
      $and: [
        {
          salary: {
            $gte: parseInt(req.query.salaryMin),
          },
        },
        {
          salary: {
            $lte: parseInt(req.query.salaryMax),
          },
        },
      ],
    };
  } else if (req.query.salaryMin) {
    findParams = {
      ...findParams,
      salary: {
        $gte: parseInt(req.query.salaryMin),
      },
    };
  } else if (req.query.salaryMax) {
    findParams = {
      ...findParams,
      salary: {
        $lte: parseInt(req.query.salaryMax),
      },
    };
  }

  // Filter jobs based on duration using 'duration' query parameter
  if (req.query.duration) {
    findParams = {
      ...findParams,
      duration: {
        $lt: parseInt(req.query.duration),
      },
    };
  }

  // Define sorting parameters based on 'asc' and 'desc' query parameters
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

    // sortParams = parseSortParameters(req.query.asc, 1);
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

    // sortParams = parseSortParameters(req.query.desc, 1);
  }

  console.log(findParams);
  console.log(sortParams);

  // Aggregate pipeline for querying jobs
  let arr = [
    {
      $lookup: {
        from: "recruiterinfos",
        localField: "userId",
        foreignField: "userId",
        as: "recruiter",
      },
    },
    { $unwind: "$recruiter" },
    { $match: findParams },
  ];

  // Add sorting stage to the pipeline if sorting parameters are present
  if (Object.keys(sortParams).length > 0) {
    arr = [
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "userId",
          foreignField: "userId",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      { $match: findParams },
      {
        $sort: sortParams,
      },
    ];
  }

  console.log(arr);

  // Execute the aggregation query
  Job.aggregate(arr)
    .then((posts) => {
      if (posts == null) {
        res.status(404).json({
          message: "No job found",
        });
        return;
      }
      res.json(posts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Function to get details of a specific job by ID
const getJobId = async (req, res) => {
  Job.findOne({ _id: req.params.id })
    .then((job) => {
      if (job == null) {
        res.status(400).json({
          message: "Job does not exist",
        });
        return;
      }
      res.json(job);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error fetching job",
        error: err.message, // Include the error message for debugging
      });
      1;
      console.log("error: ", err);
    });
};

// Function to update details of a specific job by ID
const updateJobDetails = async (req, res) => {
  const user = req.user;

  // Check if the user is a recruiter
  if (user.type !== "recruiter") {
    res.status(401).json({
      message: "You don't have permissions to change the job details",
    });
    return;
  }

  const jobId = req.params.id;
  const updateData = req.body;

  if (!updateData) {
    res.status(400).json({ message: "No data provided for update" });
    return;
  }

  try {
    // Find the job by ID and user ID, and update it
    const updatedJob = await Job.findByIdAndUpdate(
      {
        _id: jobId,
        userId: user.id,
      },
      updateData
      // { new: true, runValidators: true }
    );

    if (!updatedJob) {
      res.status(404).json({
        message: "Job does not exist",
      });
      return;
    }

    res.json({
      message: "Job details updated successfully",
      updatedJob,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

// Function to allow an applicant to apply for a job
const applyJob = async (req, res) => {
  const user = req.user;

  // Check if the user is an applicant
  if (user.type != "applicant") {
    res.status(401).json({
      message: "You don't have permissions to apply for a job",
    });
    return;
  }

  Application.findOne({
    userId: user._id,
    status: {
      $nin: ["accepted", "finished"],
    },
  })
    .then((acceptedJob) => {
      if (
        (acceptedJob !== null && acceptedJob.status === "finished") ||
        (acceptedJob !== null && acceptedJob.status === "accepted")
      ) {
        res.status(400).json({
          message:
            "You already have an accepted job. Hence you cannot apply for a new one.",
        });
        return;
      }
      const data = req.body;
      const jobId = req.params.id;

      // Check if the user has already applied for the job
      Application.findOne({
        userId: user._id,
        jobId: jobId,
        status: {
          $nin: ["deleted", "cancelled"],
        },
      })
        .then((appliedApplication) => {
          console.log(appliedApplication);
          if (
            appliedApplication !== null &&
            appliedApplication.status === "applied"
          ) {
            res.status(400).json({
              message: "You have already applied for this job",
            });
            return;
          }

          // Check if the job exists
          Job.findOne({ _id: jobId })
            .then((job) => {
              if (job === null) {
                res.status(404).json({
                  message: "Job does not exist",
                });
                return;
              }

              // Count the number active applications for the job
              Application.countDocuments({
                jobId: jobId,
                status: {
                  $nin: ["rejected", "deleted", "cancelled", "finished"],
                },
              })
                .then((activeApplicationCount) => {
                  // Check if the maxium number of appilcant for the job
                  if (activeApplicationCount < job.maxApplicants) {
                    // Count the number of active applications for the applicant
                    Application.countDocuments({
                      userId: user._id,
                      status: {
                        $nin: ["rejected", "deleted", "cancelled", "finished"],
                      },
                    })
                      .then((myActiveApplicationCount) => {
                        // Check if the applicant has not reached the maximum number of active applications
                        if (myActiveApplicationCount < 10) {
                          // Count the number of accepted jobs for the applicant
                          Application.countDocuments({
                            userId: user._id,
                            status: "accepted",
                          }).then((acceptedJobs) => {
                            // Check if the applicant has no accepted jobs
                            if (acceptedJobs === 0) {
                              // Create a new applicant instance
                              const application = new Application({
                                userId: user._id,
                                recruiterId: job.userId,
                                jobId: job._id,
                                status: "applied",
                                sop: data.sop,
                              });

                              // Save the applicant to the database
                              application
                                .save()
                                .then(() => {
                                  res.json({
                                    message: "Job application successful",
                                  });
                                })
                                .catch((err) => {
                                  res.status(400).json(err);
                                });
                            } else {
                              res.status(400).json({
                                message:
                                  "You already have an accepted job. Hence you cannot apply.",
                              });
                            }
                          });
                        } else {
                          res.status(400).json({
                            message:
                              "You have 10 active applications. Hence you cannot apply.",
                          });
                        }
                      })
                      .catch((err) => {
                        res.status(400).json(err);
                      });
                  } else {
                    res.status(400).json({
                      message: "Application limit reached",
                    });
                  }
                })
                .catch((err) => {
                  res.status(400).json(err);
                });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.json(400).json(err);
    });
};

const checkApply = async (req, res) => {
  const user = req.user;

  if (user.type !== "applicant") {
    res.status(400).json({
      message: "You don't have permissions to check for an accepted job",
    });
    return;
  }

  try {
    const acceptedJob = await Application.findOne({
      userId: user._id,
      status: "accepted",
    });

    if (!acceptedJob) {
      const finishedJob = await Application.findOne({
        userId: user._id,
        status: "finished",
      });

      if (finishedJob) {
        res.json({
          hasAcceptedJob: true,
        });
        return;
      }
    }

    res.json({
      hasAcceptedJob: acceptedJob !== null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// recruiter gets applications for a particular job
const getApplications = async (req, res) => {
  const user = req.user;

  // Check if the user is a recruiter
  if (user.type != "recruiter") {
    res.status(401).json({
      message: "You don't have permissions to view job applications",
    });
    return;
  }
  const jobId = req.params.id;

  // const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  // const skip = page - 1 >= 0 ? (page - 1) * limit : 0;

  // Define filtering parameters based on query parameters
  let findParams = {
    jobId: jobId,
    recruiterId: user._id,
  };

  let sortParams = {};

  // Filter applications based on status using 'status' query parameter
  if (req.query.status) {
    findParams = {
      ...findParams,
      status: req.query.status,
    };
  }

  // Retrieve applications from the database
  Application.find(findParams)
    .collation({ locale: "en" })
    .sort(sortParams)
    // .skip(skip)
    // .limit(limit)
    .then((applications) => {
      res.json(applications);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteJob = async (req, res) => {
  const user = req.user;
  if (user.type !== "recruiter" && user.type !== "admin") {
    return res.status(401).json({
      message: "You don't have permissions to delete the job",
    });
  }

  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.json({
      message: "Job deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  addJob,
  getJobList,
  getJobId,
  updateJobDetails,
  applyJob,
  checkApply,
  getApplications,
  deleteJob,
};
