const BookModel = require("../Models/BooksModel")
const userModel = require("../Models/usermodel")
const mongoose = require('mongoose')

//.............................................PHASE (1) Create user........................................................


const createBook = async (req, res) => {
  try {

    //STRING VALIDATION BY REJEX
    const validatefeild= (shivam) => {
     return String(shivam).match(
         /^[a-zA-Z]/);
    };

  //ISBN VALIDATION BY REJEX
    const isValidISBN=(ISBN)=>{
      return String(ISBN).match(/^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/) }




    const data = req.body;
    const a=new Date()

    if (Object.keys(data).length == 0) {
      return res.status(400).send({status:false, msg: "Feild Can't Empty.Please Enter Some Details" });
    }
    const obj = {

        releasedAt:[ a.getFullYear(),a.getMonth()+1,a.getDate()].join('-')
   };
       const title = data.title;
       const excerpt = data.excerpt;
       const userId = data.userId;
       const ISBN = data.ISBN;
       const category = data.category;
       const subcategory = data.subcategory;
       const reviews = data.reviews;
       const isDeleted = data.isDeleted;


     if (!title){
     return res.status(400).send({ status:false,msg:"Title is missing"});
    }
    obj.title=title
     //Title validation by Rejex
    if (!validatefeild( obj.title)) {
      return res.status(400).send({status: false,msg: "Title must contain Alphabet or Number",});
    }

    const findtitle = await BookModel.findOne({ title:title }); //title exist or not

     if(findtitle){
    return res.status(404).send({ status:false,message:  `${title} Already Exist.Please,Give Another Title`})
    }

    if (!excerpt){
      return res.status(400).send({ status:false,msg:"excerpt is missing"});
     }
     obj.excerpt=excerpt

     //Name validation by Rejex
     if (!validatefeild(obj.excerpt)) {
       return res.status(400).send({status: false,msg: "excerpt must contain Alphabet or Number",});
     }

     if (!userId)
     return res.status(400).send({status:false, msg: "userId not given" })
     obj.userId=userId

     let isValiduserId = mongoose.Types.ObjectId.isValid(userId);

     if (!isValiduserId) {
         return res.status(400).send({ status: false, msg: "userId is Not Valid" });
     }

     const finduserId = await userModel.findById(userId)
     if (!finduserId){
         return res.status(404).send({status: false,msg: "userId not found" })
     }
     if (!ISBN)
     return res.status(400).send({status:false, msg: "ISBN not given" })
     obj.ISBN=ISBN


     if (!isValidISBN(ISBN)) {
      return res.status(400).send({status: false,msg: "INVALID ISBN",});
    }
    const findISBN=await BookModel.findOne({ISBN:ISBN})

    if(findISBN){
      return res.status(400).send({status:false, msg: `${ISBN} Already Exist.Please,Give Another ISBN` })

    }

    if (!category){
     return res.status(400).send({status:false, msg: "category not given" })
     }

     obj.category=category

     if (!validatefeild(category)) {
        return res.status(400).send({status: false,msg: "category must contain Alphabet or Number",});
      }

      if (!subcategory){
        return res.status(400).send({status:false, msg: "subcategory not given" })
        }
        obj.subcategory=subcategory
        if (!validatefeild(subcategory)) {
           return res.status(400).send({status: false,msg: "subcategory must contain Alphabet or Number",});
         }

         if(reviews){
            obj.reviews=reviews
         }
        if (typeof(reviews)!="number"){
        return res.status(400).send({status:false,message:"Invalid reviews Format"});
    }

    if (isDeleted){
        obj.isDeleted=isDeleted
        if(typeof(isDeleted)!="boolean"){
            return res.status(400).send({status: false, message: "Invalid Input of isDeleted.It must be true or false "});
        }
        if(isDeleted==true){
        return res.status(400).send({status:false,message:"isDeleted must be false while creating book"});
        }
    }

  const Books = await BookModel.create(obj);
      return res.status(201).send({status:true,msg: Books });

  }
    catch (err) {
      res.status(500).send({ status:false,error: err.message });
    }
  };

module.exports.createBook=createBook