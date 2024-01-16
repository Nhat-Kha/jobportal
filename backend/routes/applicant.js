const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");

const userCtrl = require("../controller/user");

const router = express.Router();

router.get("/", jwtAuth, userCtrl.getAList);

module.exports = router;
