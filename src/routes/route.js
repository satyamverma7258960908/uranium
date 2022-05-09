const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller");


//user Register
router.post("/register",userController.createuser)

router.post('/login', userController.login) //login Phase 2



module.exports = router;