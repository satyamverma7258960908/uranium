const AuthorModel = require("../Models/authorModel")
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated ,msg:"Author created successfully"})
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}



const loginAuthor = async function (req, res) {
         let userName=req.body.email
         let password=req.body.password

  
        // FIND AUTHOR DETAIL
        const author = await AuthorModel.findOne({ email:userName, password:password });
        console.log(author)

        if (!author) {
            res.status(401).send({ status: false, message: `Invalid login credentials` });
            return
        }
        // GENERATE JWT TOKEN
        const token = await jwt.sign({
            authorId: author._id,
        }, 'Myprivatekey')

        //res.header('x-api-key', token);
        res.status(200).send({ status: true, message: `Author login successfull`, data: { token } });
}

module.exports.createAuthor=createAuthor
module.exports.loginAuthor=loginAuthor