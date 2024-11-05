const express = require("express");
const router = express.Router();
const { homepageController, registerController, postRegisterController,loginController,logoutController,profileController }= require("../controllers/homepageController");
const { isLoggedIn, redirectIfLoggedIn } = require("../middlewares/auth-middlewares");

router.get("/",redirectIfLoggedIn, homepageController);
router.get("/register", registerController);
router.get("/logout",logoutController)
router.get("/profile",isLoggedIn,profileController)

router.post("/register",postRegisterController)
router.post("/login",loginController)

 
module.exports=router;