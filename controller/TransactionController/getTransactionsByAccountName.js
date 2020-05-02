const models = require('../../models')
const logger=require('../../log')

/** @description Gets transactions based on the account name.
 * @param {object} req - Request object with userId and accountName.
 * @param {object} res - Response object with a boolean variable success and array of transactions if request is success else error.
  * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/

async function getTransactionsByAccountName(req, res, next) {
    try {
        logger.info(req.url)
        const account = await models.Accounts.findOne({
            where: {
                userId: req.params.userId,
                accountName: req.params.accountName
            }
        })

        const transactions = await models.Transactions.findAll({
            where: {
                accountId: account.id
            }
        })
        res.status(200).json({
            success:true,
            transactions
        })
        logger.info("getTransactionsByAccountName.successful")
    }

    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = getTransactionsByAccountName;