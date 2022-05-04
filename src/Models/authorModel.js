const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: 'First name is required', //(sonu)
        trim: true
    },
    lname: {
        type: String,
        required: 'Last name is required',
        trim: true
    },
    title: {
        type: String,
        required: 'Title is required',
        enum: ["Mr","Mrs","Miss","Mast"]
    },
    email: {
        type: String,
        lowercase:true,
        required:'Email address is required',
        unique: true,
        trim: true,
        validate:{
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },message:'Please fill a valid email address', isAsync:false
        }
    },
    password: {
        type: String,
        required: 'Password is required',
        trim: true
    }
},{timestamps: true})

module.exports = mongoose.model('Author',authorSchema)//authors


// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }