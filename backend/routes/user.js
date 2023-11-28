const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");

const userCtrl = require("../controller/user");

const router = express.Router();

router.get("/", jwtAuth, userCtrl.getUser);
router.get("/:id", jwtAuth, userCtrl.getUserId);
router.put("/", jwtAuth, userCtrl.updateUser);

module.exports = router;
