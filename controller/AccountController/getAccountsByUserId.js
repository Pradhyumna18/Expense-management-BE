const models = require('../../models')
const logger = require('../../log')
const { decodeToken } = require('../../helper/helper')
/** @description gets account details based on the userId.
 * @param {object} req - Request object with userId.
 * @param {object} res - Response object with a boolean variable success and required accounts if request is success else error message.
 * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function getAccountsByUserId(req, res, next) {
    try {
        logger.info(req.url)
        const payload = decodeToken(req.params.token)
        const accounts = await models.Accounts.findAll({
            where: {
                userId: payload.userId
            }
        })
        res.status(200).json({
            success: true,
            accounts
        })
        logger.info("getAccountsByUserId.successful")
    }

    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = getAccountsByUserId;