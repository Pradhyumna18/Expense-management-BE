const models = require('../../models')
const jwt = require('jsonwebtoken')
const logger=require('../../log')
/** @description gives account name based on the accountId.
 * @param {object} req - Request object with userId and accountId.
 * @param {object} res - Response object with a boolean variable success and account name if request is success else error message.
  * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function getAccountNameById(req, res, next) {
    try {
        logger.info(req.url)
        const account = await models.Accounts.findAll({
            where: {
                userId: req.params.userId,
                id: req.params.accountId
            }
        })
        obj = [...JSON.parse(JSON.stringify(account, null, 4))]
        accountName = obj[0].accountName
        res.status(200).json({
            success: true,
            accountName
        })
        logger.info("getAccountNameById.successful")
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = getAccountNameById;