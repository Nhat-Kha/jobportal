const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");

const userCtrl = require("../controller/user");

const router = express.Router();

router.get("/all", userCtrl.getAllUser);
router.get("/allApplicant", userCtrl.getAllUserApplicant);
router.get("/allRecruiter", userCtrl.getAllUserRecruiter);
router.get("/", jwtAuth, userCtrl.getUser);
router.get("/:id", userCtrl.getUserId);
router.get("/allRecruiter/:id", userCtrl.getIdRecruiter);
router.put("/", jwtAuth, userCtrl.updateUser);

module.exports = router;
