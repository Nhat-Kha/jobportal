const multer = require("multer");
const express = require("express");
const { default: mongoose } = require("mongoose");
const ApplicantSchema = mongoose.model("JobApplicantInfo");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
  },
});

const upload = multer({ storage: storage });

router.post("/resume", upload.single("resume"), async (req, res) => {
  const fileName = req.file.filename;
  const id = req.body.userId;

  try {
    const applicant = await ApplicantSchema.findOne({
      userId: id,
    });
    if (!applicant) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    if (fileName) {
      applicant.resume = fileName;
    }

    await applicant.save();
    console.log(fileName);
    console.log(newFile);

    res.send({ status: "upload oke" });
  } catch (error) {
    res.json({ status: error });
  }

  console.log(storage);
});



module.exports = router;
