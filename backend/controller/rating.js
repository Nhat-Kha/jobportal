const mongoose = require("mongoose");
const Rating = require("../model/rating");
const Application = require("../model/applications");
const JobApplicant = require("../model/jobApplicant");
const Job = require("../model/job");

const addRating = async (req, res) => {
  const user = req.user;
  const data = req.body;
  console.log("Authenticated User:", user);
  console.log("Request Data:", data);

  try {
    if (user.type === "recruiter") {
      // Logic for recruiter rating
      const rating = await Rating.findOne({
        senderId: user._id,
        receiverId: new mongoose.Types.ObjectId(data.applicantId),
        category: "applicant",
      });

      if (!rating) {
        const acceptedApplicant = await Application.countDocuments({
          userId: new mongoose.Types.ObjectId(data.applicantId),
          recruiterId: user._id,
          status: { $in: ["accepted", "finished"] },
        });

        if (acceptedApplicant > 0) {
          const newRating = new Rating({
            category: "applicant",
            receiverId: new mongoose.Types.ObjectId(data.applicantId),
            senderId: user._id,
            rating: data.rating,
          });

          await newRating.save();

          const result = await Rating.aggregate([
            {
              $match: {
                receiverId: new mongoose.Types.ObjectId(data.applicantId),
                category: "applicant",
              },
            },
            {
              $group: {
                _id: {},
                average: { $avg: "$rating" },
              },
            },
          ]);

          if (!result || result.length === 0) {
            throw new Error("Error while calculating rating");
          }

          const avg = result[0].average;

          await JobApplicant.findOneAndUpdate(
            { userId: mongoose.Types.ObjectId(data.applicantId) },
            { $set: { rating: avg } }
          );

          return res.json({ message: "Rating added successfully" });
        } else {
          return res.status(400).json({
            message:
              "Applicant didn't work under you. Hence you cannot give a rating.",
          });
        }
      } else {
        rating.rating = data.rating;
        await rating.save();

        const result = await Rating.aggregate([
          {
            $match: {
              receiverId: new mongoose.Types.ObjectId(data.applicantId),
              category: "applicant",
            },
          },
          {
            $group: {
              _id: {},
              average: { $avg: "$rating" },
            },
          },
        ]);

        if (!result || result.length === 0) {
          throw new Error("Error while calculating rating");
        }

        const avg = result[0].average;

        await JobApplicant.findOneAndUpdate(
          { userId: mongoose.Types.ObjectId(data.applicantId) },
          { $set: { rating: avg } }
        );

        return res.json({ message: "Rating updated successfully" });
      }
    } else {
      // Logic for applicant rating
      const rating = await Rating.findOne({
        senderId: user._id,
        receiverId: new mongoose.Types.ObjectId(data.jobId),
        category: "job",
      });

      if (!rating) {
        const acceptedApplicationCount = await Application.countDocuments({
          userId: user._id,
          jobId: new mongoose.Types.ObjectId(data.jobId),
          status: { $in: ["accepted", "finished"] },
        });

        if (acceptedApplicationCount > 0) {
          const newRating = new Rating({
            category: "job",
            receiverId: new mongoose.Types.ObjectId(data.jobId),
            senderId: user._id,
            rating: data.rating,
          });

          await newRating.save();

          const result = await Rating.aggregate([
            {
              $match: {
                receiverId: new mongoose.Types.ObjectId(data.jobId),
                category: "job",
              },
            },
            {
              $group: {
                _id: {},
                average: { $avg: "$rating" },
              },
            },
          ]);

          if (!result || result.length === 0) {
            throw new Error("Error while calculating rating");
          }

          const avgRating = result[0].average;

          await Job.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(data.jobId) },
            { $set: { rating: avgRating } }
          );

          return res.json({ message: "Rating added successfully" });
        } else {
          return res.status(400).json({
            message:
              "You haven't worked for this job. Hence you cannot give a rating.",
          });
        }
      } else {
        rating.rating = data.rating;
        await rating.save();

        const result = await Rating.aggregate([
          {
            $match: {
              receiverId: new mongoose.Types.ObjectId(data.jobId),
              category: "job",
            },
          },
          {
            $group: {
              _id: {},
              average: { $avg: "$rating" },
            },
          },
        ]);

        if (!result || result.length === 0) {
          throw new Error("Error while calculating rating");
        }

        const avgRating = result[0].average;

        await Job.findOneAndUpdate(
          { _id: new mongoose.Types.ObjectId(data.jobId) },
          { $set: { rating: avgRating } }
        );

        return res.json({ message: "Rating updated successfully" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPersonalRating = async (req, res) => {
  const user = req.user;
  Rating.findOne({
    senderId: user._id,
    receiverId: req.query.id,
    category: user.type === "recruiter" ? "applicant" : "job",
  }).then((rating) => {
    if (rating === null) {
      res.json({ rating: -1 });
      return;
    }
    res.json({ rating: rating.rating });
  });
};

module.exports = {
  addRating,
  getPersonalRating,
};
