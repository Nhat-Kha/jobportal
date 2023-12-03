const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./middleware/passportConfig");
const cors = require("cors");
const fs = require("fs");

const initRouter = require("./routes");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/job-portal")
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Create an Express application, set port for server
const app = express();
const port = 4444;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors());
app.use(express.json());

// Initialize Passport.js for authentication
app.use(passportConfig.initialize());

// Initialize routes
initRouter(app);

// app.get("/", (req, res) => {
//   res.send({ route: "Welcome to my server" });
// });
// app.use("/upload", require("./routes/"));
// app.use("/host", require("./routes/downloadRoutes"));

// Start server 
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
