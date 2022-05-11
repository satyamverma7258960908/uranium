const jwt = require("jsonwebtoken");
/* const BookModel1 = require("../models/BooksModel");
const UserModel1 = require("../models/usermodel"); */
const mongoose = require("mongoose");


//............................................MIDDLEWARE-FOR AUTHENTICATION..........................................................

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["x-Api-Key"];

    if (!token){
        return res.status(401).send({ status: false, msg: "Token must be Present" });
    }

    let decodedtoken = jwt.verify(token, "group51"); // to verify that signature is valid or not
   next();
  } catch (err) {
    res.status(500).send({ status:false, error: err.message });
  }
};


module.exports.authentication=authentication






























/* //............................................MIDDLEWARE-FOR AUTHORIZATION..........................................................


const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["x-Api-Key"]; //token has jwt token

    const id = req.params.blogId; //blogId is coming from path paramter


    let isValidblogID = mongoose.Types.ObjectId.isValid(id);
    //Check BlogId on the basis of length
    if (!isValidblogID) {
      return res.status(400).send({ status: false, msg: "Blog Id is Not Valid" });
    }

    const blog = await BlogModel.findById(id); //finding Id which is stored in id variable in 3rd line after try block
    if (!blog)
      return res.status(404).send({ status:false,msg: "BlogId dont exist" });

    const decodedtoken = jwt.verify(token, "group11");
   /*  if (!decodedtoken)
      return res.status(401).send({ status: false, msg: "token is invalid" });
 */
    /* if (blog.authorId != decodedtoken.authorId)
      //match token authorId with blogdocument AuthorId
      return res.status(403).send({ status: false, msg: "Sorry,You cannot access" });

    next(); //if match then move the execution to next
  } catch (err) {
    res.status(500).send({status:false, error: err.message });
  }
};

module.exports = { authentication, authorization }; */
