const Application = require("../model/applications");
const Job = require("../model/job");

// Function to gets all applications
const getAllApplications = async (req, res) => {
  const user = req.user;

  try {
    const applications = await Application.aggregate([
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
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "recruiterId",
          foreignField: "userId",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      {
        $sort: {
          dateOfApplication: -1,
        },
      },
    ]);

    // Response with the fetched applications
    res.json({ applications, message: "show all successfully" });
  } catch (err) {
    // Handle errors during applications retrieval
    console.log(err.message);
    res.status(400).json(err.message);
  }

  console.log("User type:", user.type);
  console.log("User ID:", user._id);
};

const getAll = async (req, res) => {
  try {
    const all = await Application.find();

    // const allUsers = [...allRecruiter, ...allJobApplicant];

    res.status(200).json({ all, message: "show all user successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// Function to update status of application
const updateStatusApplication = async (req, res) => {
  // Get the authenticated user and application ID from the request
  const user = req.user;
  const id = req.params.id;
  const status = req.body.status;

  try {
    // Check if the user is a recruiter
    if (user.type === "recruiter") {
      // Check the status of the application
      if (status === "accepted") {
        // If the status is "accepted," process the acceptance logic
        const application = await Application.findOne({
          _id: id,
          recruiterId: user._id,
        });

        // Ensure the application is found
        if (!application) {
          return res.status(400).json({ message: "Application not found" });
        }

        // Find the corresponding job
        const job = await Job.findOne({
          _id: application.jobId,
          userId: user._id,
        });

        // Ensure the job exists
        if (!job) {
          return res.status(404).json({ message: "Job does not exist" });
        }

        // Count accepted applications for the job
        const activeApplicationCount = await Application.countDocuments({
          recruiterId: user._id,
          jobId: job._id,
          status: "accepted",
        });

        // Check if there are available positions
        if (activeApplicationCount < job.maxPositions) {
          // Update application status to "accepted" and set the date of joining
          application.status = status;
          application.dateOfJoining = req.body.dateOfJoining;
          await application.save();

          // Update other applications for the same user to "cancelled"
          await Application.updateMany(
            {
              _id: {
                $ne: application._id,
              },
              userId: application.userId,
              status: {
                $nin: [
                  "rejected",
                  "deleted",
                  "cancelled",
                  "accepted",
                  "finished",
                ],
              },
            },
            {
              $set: {
                status: "cancelled",
              },
            },
            { multi: true }
          );

          // If status is "accepted," update the job with the increased accepted candidates count
          if (status === "accepted") {
            await Job.findOneAndUpdate(
              {
                _id: job._id,
                userId: user._id,
              },
              {
                $set: {
                  acceptedCandidates: activeApplicationCount + 1,
                },
              }
            );
          }

          // Respond with success message
          return res.json({
            message: `Application ${status} successfully`,
          });
        } else {
          // Respond with an error if all positions are filled
          return res.status(400).json({
            message: "All positions for this job are already filled",
          });
        }
      } else {
        // If the status is not "accepted," update the application status
        const application = await Application.findOneAndUpdate(
          {
            _id: id,
            recruiterId: user._id,
            status: {
              $nin: ["rejected", "deleted", "cancelled"],
            },
          },
          {
            $set: {
              status: status,
            },
          }
        );

        // Check if the application status was updated
        if (!application) {
          return res.status(400).json({
            message: "Application status cannot be updated",
          });
        }

        if (
          status === "rejected" ||
          status === "cancelled" ||
          status === "delete"
        ) {
          await Application.deleteOne({
            _id: application._id,
          });
        }

        // Respond with success message
        return res.json({
          message:
            status === "finished"
              ? `Job ${status} successfully`
              : `Application ${status} successfully`,
        });
      }
    } else {
      // If the user is not a recruiter, handle the scenario
      if (status === "cancelled") {
        // If the status is "cancelled," update the application status
        const application = await Application.findOneAndUpdate(
          {
            _id: id,
            userId: user._id,
          },
          {
            $set: {
              status: status,
            },
          }
        );

        // Check if the application status was updated
        if (!application) {
          return res.status(400).json({
            message: "Application status cannot be updated",
          });
        }

        // Respond with success message
        return res.json({
          message: `Application ${status} successfully`,
        });
      } else {
        // If the status is not "cancelled," respond with an error
        return res.status(401).json({
          message: "You don't have permissions to update job status",
        });
      }
    }
  } catch (err) {
    // Handle errors during application status update
    console.log(err.message);
    return res.status(400).json(err.message);
  }
};

module.exports = {
  getAllApplications,
  updateStatusApplication,
};
