const express = require("express");
const fs = require("fs");
const path = require("path");
const { default: mongoose } = require("mongoose");
const ApplicantSchema = mongoose.model("JobApplicantInfo");

const router = express.Router();

// router.get("/resume/:id", (req, res) => {
//   const fileResume = req.params.id;
//   const filePath = path.join(__dirname, "./files", fileResume);
//   try {
//     fs.access(filePath, fs.F_OK, (err) => {
//       if (err) {
//         res.status(404).json({
//           message: "File not found",
//         });
//         return;
//       }
//       res.download(filePath, (err) => {
//         if (err) {
//           console.log(err);
//           res.status(400).json({ message: "Don't download file PDF" });
//         }
//       });
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json(error.message);
//   }
// });
router.get("/resume/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id:", id);

  try {
    const applicant = await ApplicantSchema.findById({
      _id: id,
    });

    console.log("user:", applicant.resume);

    if (!applicant) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    if (!applicant.resume) {
      return res
        .status(404)
        .json({ message: "Resume not found for this applicant" });
    }
    const filePath = path.join(__dirname, "../files", applicant.resume);
    console.log("filePath:", filePath);
    fs.access(filePath, fs.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: "Resume file not found" });
      }

      res.download(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Failed to download resume" });
        }
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
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
