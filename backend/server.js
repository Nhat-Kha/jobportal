const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./middleware/passportConfig");
const cors = require("cors");
const fs = require("fs");

const initRouter = require("./routes");

mongoose
  .connect("mongodb://127.0.0.1:27017/job-portal")
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const app = express();
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

initRouter(app);

// app.get("/", (req, res) => {
//   res.send({ route: "Welcome to my server" });
// });
// app.use("/upload", require("./routes/"));
// app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
