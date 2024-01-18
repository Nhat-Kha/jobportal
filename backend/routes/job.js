const express = require("express");
const jobCtrl = require("../controller/job");

// Middleware for JWT authentication
const jwtAuth = require("../middleware/jwtAuth");

// Create a router object from Express
const router = express.Router();

// Get, post công việc, yêu cầu xác thực JWT
router.post("/", jwtAuth, jobCtrl.addJob);
router.get("/", jobCtrl.getJobList);
router.get("/:id", jobCtrl.getJobId);
router.get("/:id/applications", jwtAuth, jobCtrl.getApplications);
router.put("/:id", jwtAuth, jobCtrl.updateJobDetails);
router.post("/:id/applications", jwtAuth, jobCtrl.applyJob);
router.get("/:id/check-accepted", jwtAuth, jobCtrl.checkApply);
router.delete("/:id", jwtAuth, jobCtrl.deleteJob);

module.exports = router;
