const authRouter = require("./auth");
const userRouter = require("./user");
const jobRouter = require("./job");
const applicationRouter = require("./applications");
const ratingRouter = require("./rating");
const uploadRouter = require("./upload");
const downloadRouter = require("./download");

/**
 *
 * @param {*} app
 */
const initRouter = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/job", jobRouter);
  app.use("/api/application", applicationRouter);
  app.use("/api/rating", ratingRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/download", downloadRouter);
};

module.exports = initRouter;
