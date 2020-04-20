const models = require('../../models')
const jwt = require('jsonwebtoken')
async function addTransaction(req, res, next) {
    try {

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
    }
    catch (err) {
        next(err)
    }
}
module.exports = addTransaction;