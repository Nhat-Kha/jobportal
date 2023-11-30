const authRouter = require("./auth");
const userRouter = require("./user");
const jobRouter = require("./job");
const applicationRouter = require("./applications");

const initRouter = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/job", jobRouter);
  app.use("/api/application", applicationRouter);
};

module.exports = initRouter;
