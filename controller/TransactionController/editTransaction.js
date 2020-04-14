const models = require('../../models')
const jwt = require('jsonwebtoken')
async function editTransaction(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
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
            bal = account.accountBalance - transaction.amount
        else
            bal = account.accountBalance + transaction.amount
        if (req.body.transactionType == "income") {
            bal = bal + req.body.amount
            await account.update({ accountBalance: bal })
        }
        else {
            bal = bal - req.body.amount
            await account.update({ accountBalance: bal })
        }
        delete req.body.accountName

        transaction.update({
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