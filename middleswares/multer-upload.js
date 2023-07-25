const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
// error handling incorrect file formats
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    // if (file.mimetype) {
    cb(null, true);
  } else {
    cb(new Error("invalid file type"), false);
  }
};

const upload = multer({ storage: storage });

module.exports = upload;
