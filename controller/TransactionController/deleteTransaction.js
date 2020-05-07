const models = require('../../models')
const logger=require('../../log')
/** @description Deletes a transaction based on the transactionId.
 * @param {object} req - Request object with transactionId.
 * @param {object} res - Response object with a boolean variable success if request is success else error.
  * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function deleteTransaction(req, res, next) {
    try {
        logger.info(req.url)
        const transaction = await models.Transactions.findOne({
            where: {
                id: req.params.transactionId
            }
        })
        const account = await models.Accounts.findOne({
            where: {
                id: transaction.accountId
            }
        })
        if (transaction.transactionType == "income") {

            bal = Number(account.accountBalance) - Number(transaction.amount)
            await account.update({ accountBalance: bal })
        }
        else {
            bal = Number(account.accountBalance) + Number(transaction.amount)
            await account.update({ accountBalance: bal })
        }
        await models.Transactions.destroy({
            where: {
                id: req.params.transactionId
            }
        })
        res.status(200).json({
            success: true,
            transaction
        })
        logger.info("deleteTransaction.successful")
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = deleteTransaction;