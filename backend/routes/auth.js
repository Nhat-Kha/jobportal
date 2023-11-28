const express = require("express");

const authCtrl = require("../controller/auth");

const router = express.Router();

router.post("/signup", authCtrl.SignUp);
router.post("/login", authCtrl.Login);

// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const authKeys = require("../lib/authKeys");

// const User = require("../db/User");
// const JobApplicant = require("../db/JobApplicant");
// const Recruiter = require("../db/Recruiter");

module.exports = router;
