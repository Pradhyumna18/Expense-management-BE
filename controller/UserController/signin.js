const models = require('../../models')
let jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
const logger = require('../../log')
const {response}=require('../../helper/helper')
/** @description logins a user if username and password are correct.
 * @param {object} req - Request object with username and password.
 * @param {object} res - Response object with a boolean variable success and token if request is success or error message if there is an error.
 * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function SignIn(req, res, next) {
    try {
        logger.info(req.url)
        const user = await models.Users.findOne({
            where: {
                userName: req.body.userName
            }
        })
        if (user) {
            const bool = passwordHash.verify(req.body.password, user.password);
            if (!bool) {
                response(res,401,"username or password incorrect")
                logger.error(req.url)
                logger.error("signin.request.failed.as.username.or.password.incorrect")
            }
            else {
                var token = jwt.sign({ userName: req.body.userName, userId: user.id }, "abcd")
                res.status(200).json({
                    success: true,
                    token: token
                })
                logger.info("signin.request.successful")
            }
        }
        else {
            response(res,401,"username or password incorrect")
            logger.error(req.url)
            logger.error("signin.request.failed.as.username.or.password.incorrect")
        }
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = SignIn;
