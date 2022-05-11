const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller");
const bookController = require("../controller/Bookscontroller");
const middleware = require("../Middleware/middleware");


//user Register
router.post("/register",userController.createuser)

router.post('/login',userController.login) //login Phase 2

router.post("/books",middleware.authentication,bookController.createBook)
router.get('/books',bookController.getbooks)
router.get('/books/:bookId',bookController.getbooksbyId)

module.exports = router;