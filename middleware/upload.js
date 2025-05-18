const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/")
  },
  filename: (req, file, cb) => {
    const ext = file.originalname;
    cb(null, `${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const mimeType = ["image/jpg", "image/jpeg", "image/png"];
  const validImage = mimeType.includes(file.mimetype);

  if(validImage){
    cb(null, true)
  } else {
    cb("Image files only allowed!", false)
  }
};

const upload = multer({storage, fileFilter});
module.exports = upload;
