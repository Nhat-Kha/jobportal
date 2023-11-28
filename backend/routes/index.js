const authRouter = require("./auth");
const userRouter = require("./user");
const jobRouter = require("./job");

const initRouter = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/job", jobRouter);
};

module.exports = initRouter;
