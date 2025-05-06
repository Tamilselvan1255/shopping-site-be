const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`)
  }
});


const fileFilter = (req, file, cb) => {
  const mimeType = ["image/jpg", "image/jpeg", "image/png"]
 const isValidImage = mimeType.includes(file.mimetype);

 if(isValidImage){
  cb(null, true)
 } else {
  cb("Only image files are allowed!", false)
 }
}
const upload = multer({ storage, fileFilter });

module.exports = upload;
