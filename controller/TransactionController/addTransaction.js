const models = require('../../models')
const logger=require('../../log')
/** @description Adds transaction with details of the transaction.
 * @param {object} req - Request object with userId,accountName,transactionType,amount,date,description.
 * @param {object} res - Response object with a boolean variable success if request is success else error .
  * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function addTransaction(req, res, next) {
    try {
        logger.info(req.url)

        const account = await models.Accounts.findOne({
            where: {
                userId: req.body.userId,
                accountName: req.body.accountName
            }
        })
        if (req.body.transactionType == "income") {

            bal = Number(account.accountBalance) + Number(req.body.amount)
            await account.update({ accountBalance: bal })
        }
        else {
            bal = Number(account.accountBalance) - Number(req.body.amount)
            await account.update({ accountBalance: bal })
        }
        delete req.body.accountName
        req.body = { ...req.body, accountId: account.id }
        const transaction = await models.Transactions.create(req.body)
        res.status(201).json({
            success: true,
            transaction
        })
        logger.info("addTransaction.successful")
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = addTransaction;