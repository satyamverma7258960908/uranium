const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller");
const bookController = require("../controller/Bookscontroller");


//user Register
router.post("/register",userController.createuser)

router.post('/login',userController.login) //login Phase 2

router.post("/books",bookController.createBook)

module.exports = router;