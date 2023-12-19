const express = require("express");
const userController = require("../controllers/userControllers");
const multer = require("multer");
const path = require('path');

const router = express.Router();
const storage = multer.diskStorage({
    destination:'./uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage });

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user/add", userController.addUser);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);
router.post("/signup", userController.signUpUser);
router.post("/signin", userController.signInUser);
router.post("/upload", upload.single("profile"), userController.uploadFile);

module.exports = router;
