const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller");
const bookController = require("../controller/Bookscontroller");
const middleware = require("../Middleware/middleware");
const reviewcontroller=require("../controller/reviewcontroller")


//user Register
router.post("/register",userController.createuser)
router.post('/login',userController.login) //login Phase 2
router.post("/books",middleware.authentication,bookController.createBook)
router.get('/books',bookController.getbooks)
router.get('/books/:bookId',bookController.getbooksbyId)
router.put("/books/:bookId",bookController.updateBooksById)
router.delete("/books/:bookId",bookController.deleteBooksById)

router.post('/books/:bookId/review',reviewcontroller.createReview)





router.post("*", (req,res) =>{
    
    return res.status(404).send({ msg:"Page Not Found"})
})
router.get("*", (req,res) =>{
    return res.status(404).send({ msg:"Page Not Found"})
})
router.put("*", (req,res) =>{
    return res.status(404).send({ msg:"Page Not Found"})
})

router.delete("*", (req,res) =>{
    return res.status(404).send({ msg:"Page Not Found"})
})

module.exports = router;