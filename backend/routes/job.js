const express = require("express");
const jobCtrl = require("../controller/job");

// Middleware for JWT authentication
const jwtAuth = require("../middleware/jwtAuth");

// Create a router object from Express
const router = express.Router();

// Get, post công việc, yêu cầu xác thực JWT
router.get("/", jwtAuth, jobCtrl.getJobList);
router.post("/", jwtAuth, jobCtrl.addJob);
router.get("/:id", jwtAuth, jobCtrl.getJobId);
router.put("/", jwtAuth, jobCtrl.updateJobDetails);
router.post("/:id/applications", jwtAuth, jobCtrl.applyJob);
router.get("/:id/applications", jwtAuth, jobCtrl.getApplications);

module.exports = router;
