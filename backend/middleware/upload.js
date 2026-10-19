import multer from "multer";

import path from "path";
import fs from "fs";

const uploadDir = "uploads";

const ensureUploadDirectory = () => {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  } catch (error) {
    console.log("Upload directory error:", error.message);
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      ensureUploadDirectory();
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, Date.now() + path.extname(file.originalname));
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage });

export default upload;
