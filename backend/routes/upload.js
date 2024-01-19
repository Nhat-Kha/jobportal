const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const path = require("path");

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});
router.post("/resume", upload.single("file"), async (req, res) => {
  const { file } = req;

  if (!file.stream) {
    return res.status(400).json({
      message: "Invalid file stream",
    });
  }

  // Use path module to get the file extension
  const fileExtension = path.extname(file.originalname);

  if (fileExtension !== ".pdf") {
    return res.status(400).json({
      message: "Invalid format. Only PDF files are allowed.",
    });
  }

  const filename = `${uuidv4()}${fileExtension}`;

  try {
    const resumePath = path.join(__dirname, "..", "public", "resume");

    if (!fs.existsSync(resumePath)) {
      fs.mkdirSync(resumePath, { recursive: true });
    }

    // Log values for troubleshooting
    console.log("__dirname:", __dirname);
    console.log("Resume Path:", resumePath);
    console.log("File Originalname:", file.originalname);
    console.log("Filename:", filename);

    await pipeline(
      file.stream,
      fs.createWriteStream(path.join(resumePath, filename))
    );

    res.json({
      message: "File uploaded successfully",
      url: `/host/resume/${filename}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/profile", upload.single("file"), (req, res) => {
  const { file } = req;

  if (
    file.detectedFileExtension != ".jpg" &&
    file.detectedFileExtension != ".png" &&
    file.detectedFileExtension != ".jpeg"
  ) {
    res.status(400).json({ message: "invalid format" });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
    )
      .then(() => {
        res.send({
          message: "Profile image uploaded successfully",
          url: `/host/profile/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: "Error while uploading" });
      });
  }
});

module.exports = router;
