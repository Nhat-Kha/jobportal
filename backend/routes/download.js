const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/resume/:id", (req, res) => {
  const address = path.join(__dirname, `../public/resume/${req.params.file}`);
  try {
    fs.access(address, fs.F_OK, (err) => {
      if (err) {
        res.status(404).json({
          message: "File not found",
        });
        return;
      }
      res.sendFile(address);
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

router.get("/profile/:id", (req, res) => {
  const address = path.join(__dirname, `../public/resume/${req.params.file}`);
  try {
    fs.access(address, fs.F_OK, (err) => {
      if (err) {
        res.status(404).json({
          message: "File not found",
        });
        return;
      }
      res.sendFile(address);
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
