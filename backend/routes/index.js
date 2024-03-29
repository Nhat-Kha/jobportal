const authRouter = require("./auth");
const userRouter = require("./user");
const jobRouter = require("./job");
const applicationRouter = require("./applications");
const ratingRouter = require("./rating");
const uploadRouter = require("./uploadImage");
const ResumeRouter = require("./uploadResume");
const downloadRouter = require("./download");
const applicantRouter = require("./applicant");

const initRouter = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/jobs", jobRouter);
  app.use("/api/applications", applicationRouter);
  app.use("/api/rating", ratingRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/uploadResume", ResumeRouter);
  app.use("/api/download", downloadRouter);
  app.use("/api/applicants", applicantRouter);
};

module.exports = initRouter;
