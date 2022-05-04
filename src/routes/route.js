const express = require('express');
const router = express.Router();
const authorController = require('../Controller/authorController')
const blogController = require('../Controller/blogController')
const middleWare = require('../middleware/auth')

//Author routes
router.post('/author',authorController.createAuthor)
router.post('/userLogin', authorController.authorLogin)

//Blog routes
router.post("/createBlog", middleWare.tokenValidator, blogController.createBlogs)
router.get("/getBlog", middleWare.tokenValidator, blogController.getBlogs)
router.put("/updateBlog/:blogId",middleWare.tokenValidator, blogController.updateBlog)
router.delete("/deleteBlog/:blogId",middleWare.tokenValidator, blogController.deleteBlogByBlogId)
router.delete("/deleteBlogByParams", middleWare.tokenValidator, blogController.deleteBlogByParam)



module.exports = router;