const mongoose = require("mongoose");
const userModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum : ['Mr', 'Mrs', 'Miss'],
      trim: true,
      toLowerCase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      toLowerCase: true,
    },

    phone: {
        type:String,
        required: true,
        unique: true,
        trim: true,
      },

    email: {
        type:String,
        required: true,
        unique: true,
        trime:true
      },

    password : {
        type : String,
        maxlength:15,
        minlength:8,
        required : true,
        trim : true,
    },

    address:{
        street:{type:String,trim:true},
        city:{type:String,trim:true},
        pincode:{type:String,trim:true},
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userModel);
