const models = require('../../models')
const logger=require('../../log')
const {decodeToken}=require('../../helper/helper')
/** @description Edits a transaction based on transactionId.
 * @param {object} req - Request object with userId,accountName,transactionType,amount,date,description,transactionId.
 * @param {object} res - Response object with a boolean variable success if request is success else error.
  * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/

async function editTransaction(req, res, next) {
    try {
        logger.info(req.url)
        const payload=decodeToken(req.body.token)
        const account = await models.Accounts.findOne({
            where: {
                userId: payload.userId,
                accountName: req.body.accountName
            }
        })
        const transaction = await models.Transactions.findOne({
            where: {
                id: req.body.transactionId
            }
        })
        delete req.body.transactionId
        if (transaction.transactionType == "income")
            bal =Number( account.accountBalance )-Number( transaction.amount)
        else
            bal = Number(account.accountBalance )+Number( transaction.amount)
        if (req.body.transactionType == "income") {
            bal = bal +Number( req.body.amount)
            await account.update({ accountBalance: bal })
        }
        else {
            bal = bal -Number( req.body.amount)
            await account.update({ accountBalance: bal })
        }
        delete req.body.accountName

      await  transaction.update({
            transactionType: req.body.transactionType,
            description: req.body.description,
            amount: req.body.amount,
            date: req.body.date,
            accountId: account.id
        })

        res.status(200).json({
            success:true,
            transaction
        })
        logger.info("editTransaction.successful")
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = editTransaction;