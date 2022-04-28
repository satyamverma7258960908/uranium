const mongoose = require('mongoose');
const authorModel = require('../Models/authorModel');
//const authorModel = require("../Models/AuthorModel")
const blogModel = require('../Models/BlogModel')


//CREATE BLOG THIRD API---------------------2
const createBlog = async function (req, res) {
    try {
         const requestBody = req.body;

        // FIND AUTHORID BY AUTHOR MODEL
        const author = await authorModel.findById(requestBody.authorId);
        // NOT VALID AUTHOR ID
        if (!author) {
            res.status(400).send({ status: false, message: `Author does not exit` })
            return
        }
                // CREATE BLOG
                const newBlog = await blogModel.create(requestBody)
                res.status(201).send({ status: true, message: 'New blog created successfully', data: newBlog })
            } catch (error) {
                console.log(error)
                res.status(500).send({ status: false, message: error.message });
            }
        }


   const getBlogs = async (req,res) => {
    try{
        req.query.isDeleted = false
        req.query.isPublished = true
        let filter = await blogModel.find(req.query)
        if(!(filter.length>0))
        return res.status(404).send({status: false, msg: "No such documents found"})
        res.status(200).send({status: true, data: filter})
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({status: false, msg: err.message})
    }
}




let updateBlog = async function(req,res){
  let blogId=req.params.blogId
  let content = req.body
  let blog = await blogModel.findOne({$and:[{_id:blogId},{isDeleted:false}]})
  if(!blog){
    res.status(404).send({msg:"sorry dear we dont have such blog in our record"})
  }
  let updatedBlog=await blogModel.findOneAndUpdate({_id:blogId},{$set:content},{returnDocument:"after"})
  res.status(200).send({data:updatedBlog}) 
}

let deleteBlogByBlogId = async function(req,res){
  try{
  let blogId = req.params.blogId
  let blog = await blogModel.findOne({$and:[{_id:blogId},{isDeleted:false}]})
  if(!blog){
    return res.status(404).send("no such blog in our record")
  }
  await blogModel.findOneAndUpdate({_id:blogId},{$set:{"isDeleted":true}})
  res.sendStatus(200);
}catch(error){
  res.status(500).send({ msg: "Error", error: error.message })
}
}

// req.query.isDeleted = false
// let deletedData = (await blogModel.find(req.query))
// if(!deletedData.legth) return res.send({status: false, msg: "No document found."})

let deleteBlogByParam = async function(req,res){
  let criteria = req.query
  let blog = await blogModel.findOne({isDeleted: false} &&criteria)
  if(!blog){
    res.status(404).send({msg:"no such blog"})
  }
   //await blogModel.remove(criteria) 
   await blogModel.updateMany(criteria,{$set: {"isDeleted": true}}) 
   res.status(200).send({msg:"blog successfully deleted"})
}

// const deleteBlogByParam = async function (req, res) {
//   try {
//       //Delete blog documents by category, authorid, tag name, subcategory name, unpublished
//       let { blogId, authorId, category, tags, subcategory, isPublished } = req.query
//       if (!req.query) {
//           return res.status(400).send({ status: false, msg: "bad request" })
//       }
//       let multipleDeletes = await blogModel.find({ $and: [{ isDeleted: false, authorId: authorId }, { $or: [{ authorId: authorId }, { blogId: blogId }, { category: category }, { tags: tags }, { subcategory: subcategory }, { isPublished: isPublished }] }] })
     
//       if (multipleDeletes.length <= 0) {
//   return res.status(404).send({ status: false, msg: "data not found" })
// }

// //console.log(multipleDeletes)
// for (let i = 0; i < multipleDeletes.length; i++) {
//   let blogId = multipleDeletes[i]._id

//   const result = await blogModel.findByIdAndUpdate(blogId, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
//   return res.status(200).send({status:true , blogdata:result })

// }

// } catch (error) {
//   res.status(500).send({ msg: "Error", error: error.message })
// }
// }



module.exports.createBlog=createBlog
//module.exports.createBlogs=createBlogs
module.exports.getBlogs=getBlogs
module.exports.updateBlog =  updateBlog
module.exports.deleteBlogByBlogId = deleteBlogByBlogId
module.exports.deleteBlogByParam = deleteBlogByParam


        