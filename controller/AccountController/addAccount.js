const models = require('../../models')
const logger = require('../../log')
const { decodeToken, response } = require('../../helper/helper')
/** @description Adds a new account with accountName and startingBalance.
 * @param {object} req - Request object with accountName and startingBalance.
 * @param {object} res - Response object with a boolean variable success  if request is success else  error message.
 * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function addAccount(req, res, next) {
    try {
       
        logger.info(req.url)
        const payload = decodeToken(req.body.token)
        const account = await models.Accounts.findOne({
            where: {
                accountName: req.body.accountName,
                userId: payload.userId
            }
        })
        if (!account) {
            req.body = { ...req.body, userId: payload.userId }
            const account = await models.Accounts.create(req.body)
            res.status(201).json({
                success: true,
                account
            })
            logger.info("addAccount.successful")
        }
        else {
            logger.error("addAccount.failed.as.accountName.already.exist")
            response(res, 400, "Account already exist!")
        }
    }

    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = addAccount;
