const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");

const userCtrl = require("../controller/user");

const router = express.Router();

router.get("/all", userCtrl.getAllUser);
router.get("/allApplicant", userCtrl.getAllUserApplicant);
router.get("/", jwtAuth, userCtrl.getUser);
router.get("/:id", userCtrl.getUserId);
router.put("/", jwtAuth, userCtrl.updateUser);

module.exports = router;
