const express = require("express");
const authCtrl = require("../controller/auth");

// Create a router object from Express
const router = express.Router();
// Create Login,SignUp for user
router.post("/signup", authCtrl.SignUp);
router.post("/login", authCtrl.Login);
router.post("/password/forgot", authCtrl.forgotPassword);
router.put("/password/reset", authCtrl.resetPassword);
router.post("/send_recovery_email", authCtrl.sendEmail);
router.post("/verify_otp", authCtrl.VerifyEmail);

module.exports = router;
