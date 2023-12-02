const express = require("express");
const jobCtrl = require("../controller/job");

// Middleware for JWT authentication
const jwtAuth = require("../middleware/jwtAuth");

// Create a router object from Express
const router = express.Router();

// Get, post công việc, yêu cầu xác thực JWT
router.post("/", jwtAuth, jobCtrl.addJob);
router.get("/", jwtAuth, jobCtrl.getJobList);
router.get("/:id", jwtAuth, jobCtrl.getJobId);
router.get("/:id/applications", jwtAuth, jobCtrl.getApplications);
router.put("/", jwtAuth, jobCtrl.updateJobDetails);
router.post("/:id/applications", jwtAuth, jobCtrl.applyJob);

module.exports = router;
