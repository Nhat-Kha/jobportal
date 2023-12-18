const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./middleware/passportConfig");
const cors = require("cors");

const initRouter = require("./routes");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/job-portal")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

// Create an Express application, set port for server
const app = express();
const port = 4444;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize()); // Initialize Passport.js for authentication

// Initialize routes
initRouter(app);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
