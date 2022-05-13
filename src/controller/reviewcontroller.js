const BookModel = require("../Models/BooksModel");
const userModel = require("../Models/usermodel");
const reviewModel = require("../Models/reviewmodel");
const mongoose = require("mongoose");

//STRING VALIDATION BY REJEX
const validatefeild = (shivam) => {
  return String(shivam)
    .trim()
    .match(/^[a-zA-Z]/);
};

const createReview = async (req, res) => {
  try {
    const id=req.params.bookId
    let data=req.body

    if (Object.keys(data).length == 0) {
      return res.status(400).send({status: false,msg: "Feild Can't Empty.Please Enter Some Details",
        });
    }


    const obj = {
      reviewedAt: new Date(),
    };
    const bookId = id;
    const reviewedBy = data.reviewedBy;
    const rating = data.rating;
    const review = data.review;
    const isDeleted = data.isDeleted;
    if (!id)
    {
      return res.status(400).send({ status: false, msg: "Please Give bookId" });
    }
    obj.bookId = id

    let isValidbookId = mongoose.Types.ObjectId.isValid(bookId); //return true or false

    if (!isValidbookId)
    {
      return res.status(400).send({ status: false, msg: "bookId is Not Valid" });
    }

    const findbookId = await BookModel.findOne({_id: bookId,isDeleted: false,});

    if (findbookId)
    {
      if (reviewedBy){

      obj.reviewedBy = reviewedBy;
      if (!validatefeild(reviewedBy)){
        return res.status(400).send({ status: false, msg: "Invalid format of reviewedBy" });
      }}

      let validString = /\d/;
      if (validString.test(reviewedBy.trim()))
      {
        return res.status(400).send({status: false,msg: "reviewedBy must be valid it should not contains numbers",});
      }
      if (!rating)
      {
        return res.status(400).send({ status: false, msg: "Rating is missing" });
      }
      obj.rating = rating;

      if (typeof rating != "number") {
        return res
          .status(400)
          .send({ status: false, message: "Invalid rating Format" });
      }
      if (!(rating > 0 && rating < 5)) {
        return res
          .status(400)
          .send({ status: false, msg: "Rating should be in between 1-5 " });
      }
      if (review) {
        obj.review = review;

        if (!validatefeild(review)) {
          return res
            .status(400)
            .send({ status: false, msg: "Invalid format of review" });
        }
      }

      if (isDeleted) {
        obj.isDeleted = isDeleted;
        if (typeof isDeleted != "boolean") {
          return res
            .status(400)
            .send({
              status: false,
              message: "Invalid Input of isDeleted.It must be true or false ",
            });
        }
        if (isDeleted == true) {
          return res
            .status(400)
            .send({
              status: false,
              message: "isDeleted must be false while giving reviews",
            });
        }
      }

      const reviews = await reviewModel.create(obj);
      return res.status(201).send({ status: true, msg: reviews });
    }

    return res
      .status(400)
      .send({ status: false, msg: "Sorry,This Book Not Exist" });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


module.exports.createReview = createReview;
