const express = require("express");
const userController = require("../controllers/userControllers");
const multer = require("multer");
const path = require("path");
const { stringify } = require("querystring");

const router = express.Router();
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 },
  fileFilter: (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg" && ext !== ".PNG" && ext !== ".JPG" && ext !== ".GIF" && ext !== ".JPEG") {
      return callback(JSON.stringify({message:"Only images are allowed"}));
    }
    callback(null,true);
  },
});


router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user/add", userController.addUser);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);
router.post("/signup", userController.signUpUser);
router.post("/signin", userController.signInUser);
router.post("/upload", upload.single("profile"), userController.uploadFile);

module.exports = router;
