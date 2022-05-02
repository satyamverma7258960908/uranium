const jwt = require('jsonwebtoken')

const tokenValidator = async function (req, res, next) {
    try {
        let token = req.headers["x-Auth-token"]
        if (!token) token = req.headers["x-auth-token"]

        if (!token) return res.status(401).send({ status: false, msg: "Token must be present" })

        let decodedToken = jwt.verify(token, "functionUp-Uranium")
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" })
        }
        
        next()
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = { tokenValidator }