const models = require('../../models')
let passwordHash = require('password-hash')
const logger=require('../../log')
/** @description creates a new user with username and password.
 * @param {object} req - Request object containing username and password.
 * @param {object} res - Response object with a boolean variable success and user if request is success else  error message .
 * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function SignUp(req, res, next) {
    try {
        logger.info(req.url)
        const user = await models.Users.findOne({
            where: {
                userName: req.body.userName
            }
        })
        if (!user) {
            const p = req.body.password;
            let hashedPassword = passwordHash.generate(p);
            req.body.password = hashedPassword;
            const user = await models.Users.create(req.body);
            res.status(201).json(
                {
                    success: true,
                    user
                }
            );
            logger.info("signup.successful")
        }
        else {
            res.status(400).json(
                {
                    success: false,
                    message: "User already exist!"
                }
            );
            logger.warn("signup.request.failed.as.user.already.exist")
        }
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
       next(err)
    }
}
module.exports = SignUp;
