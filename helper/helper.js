const jwt = require('jsonwebtoken')

const response = (res, statusCode, message) => {
    console.log(statusCode, message)
    res.status(statusCode).json({
        success: false,
        message: message
    })

}
const decodeToken = (token) => {
    return jwt.decode(token)
}
module.exports =
    { decodeToken, response }
