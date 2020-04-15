const models = require('../../models')
const jwt = require('jsonwebtoken')
async function deleteTransaction(req, res, next) {
    try {

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

            bal =Number( account.accountBalance) -Number( transaction.amount)
            await account.update({ accountBalance: bal })
        }
        else {
            bal = Number(account.accountBalance )+Number( transaction.amount)
            await account.update({ accountBalance: bal })
        }
        await models.Transactions.destroy({
            where: {
                id: req.params.transactionId
            }
        })
        res.status(200).json({
            transaction
        })
    }
    catch (err) {

        next(err)
    }
}
module.exports = deleteTransaction;