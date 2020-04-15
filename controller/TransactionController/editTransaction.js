const models = require('../../models')
const jwt = require('jsonwebtoken')
async function editTransaction(req, res, next) {
    try {
       
        const account = await models.Accounts.findOne({
            where: {
                userId: req.body.userId,
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
            transaction
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = editTransaction;