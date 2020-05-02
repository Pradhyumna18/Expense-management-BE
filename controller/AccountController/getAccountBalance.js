const models = require('../../models')
const logger=require('../../log')
/** @description Gives account balance of a account.
 * @param {object} req - Request object with account name and userId.
 * @param {object} res - Response object with a boolean variable success and balance if request is success else error message.
 * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function getAccountBalance(req, res, next) {
    try {
        logger.info(req.url)
        const account = await models.Accounts.findAll({
            where: {
                userId: req.params.userId,
                accountName: req.params.accountName
            }
        })
        obj = [...JSON.parse(JSON.stringify(account, null, 4))]
        balance = obj[0].accountBalance
        res.status(200).json({
            success: true,
            balance
        })
        logger.info("getAccountBalance.successful")
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = getAccountBalance;