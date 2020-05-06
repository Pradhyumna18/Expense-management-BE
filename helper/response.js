const response = (res, statusCode, message) => {
    console.log(statusCode, message)
    res.status(statusCode).json({
        success: false,
        message: message
    })
  
}
module.exports = response