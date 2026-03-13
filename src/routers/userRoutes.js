const express = require("express");
const   registerController= require("../controllers/userController");
const   loginController= require("../controllers/userController");
const   auth= require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);


export default router;