const mongoose = require("mongoose");
const Rating = require("../model/rating");
const Application = require("../model/applications");
const JobApplicant = require("../model/jobApplicant");
const Job = require("../model/job");

const addRating = async (req, res) => {
  const user = req.user;
  const data = req.body;
  const isRecruiter = user.type === "recruiter";

  try {
    let rating = await Rating.findOne({
      senderId: user._id,
      receiverId: isRecruiter ? data.applicantId : data.jobId,
      category: isRecruiter ? "applicant" : "job",
    });

    if (!rating) {
      const queryCriteria = isRecruiter
        ? { userId: data.applicantId, recruiterId: user._id }
        : { userId: user._id, jobId: data.jobId };

      const acceptedApplicant = await Application.countDocuments({
        ...queryCriteria,
        status: { $in: ["accepted", "finished"] },
      });

      if (acceptedApplicant === 0) {
        return res.status(400).json({
          message: isRecruiter
            ? "Applicant didn't work under you. Hence you cannot give a rating."
            : "You haven't worked for this job. Hence you cannot give a rating.",
        });
      }

      // Create new rating
      rating = new Rating({
        category: isRecruiter ? "applicant" : "job",
        receiverId: isRecruiter ? data.applicantId : data.jobId,
        senderId: user._id,
        rating: data.rating,
      });

      await rating.save();
    } else {
      // Update existing rating
      rating.rating = data.rating;
      await rating.save();
    }

    // Calculate and update average rating
    const aggregatePipeline = [
      {
        $match: {
          receiverId: new mongoose.Types.ObjectId(rating.receiverId),
          category: rating.category,
        },
      },
      { $group: { _id: null, average: { $avg: "$rating" } } },
    ];

    const result = await Rating.aggregate(aggregatePipeline);
    let avg = result[0]?.average || 0;

    // Round the average rating to the nearest integer
    avg = Math.round(avg);

    if (isRecruiter) {
      await JobApplicant.updateOne(
        { userId: rating.receiverId },
        { rating: avg }
      );
    } else {
      await Job.updateOne({ _id: rating.receiverId }, { rating: avg });
    }

    res.json({ message: "Rating added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
