const express = require("express");
const applicationCtrl = require("../controller/applications");

// Middleware xác thực JWT (JSON Web Token)
const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/", jwtAuth, applicationCtrl.getAllApplications);
router.put("/:id", jwtAuth, applicationCtrl.updateStatusApplication);

module.exports = router;
