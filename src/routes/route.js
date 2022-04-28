
const express = require('express');
const router = express.Router();
const blogController = require("../controller/blogController");
const authorController = require('../controller/authorController');
const authorAuth = require('../middleware/auth')

router.post("/createAuthor",authorController.createAuthor)
router.post("/loginAuthor", authorController.loginAuthor);
router.post("/createBlog",authorAuth.authorAuth, blogController.createBlog)
router.get("/getBlog",authorAuth.authorAuth ,blogController.getBlogs)
router.put("/updateBlog/:blogId",authorAuth.authorAuth ,blogController.updateBlog)
router.delete("/deleteBlog/:blogId",authorAuth.jwtauth2, blogController.deleteBlogByBlogId)
router.delete("/deleteBlogByParams",authorAuth.authorAuth, blogController.deleteBlogByParam)
//router.post("/createBlog",blogController.createBlogs)







module.exports = router;