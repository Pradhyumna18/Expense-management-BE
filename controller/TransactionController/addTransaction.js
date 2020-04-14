const models = require('../../models')
const jwt = require('jsonwebtoken')
async function addTransaction(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const account = await models.Accounts.findOne({
            where: {
                userId: payload.userId,
                accountName: req.body.accountName
            }
        })
        if (req.body.transactionType == "income") {

            bal = account.accountBalance + req.body.amount
            await account.update({ accountBalance: bal })
        }
        else {
            bal = account.accountBalance - req.body.amount
            await account.update({ accountBalance: bal })
        }
        delete req.body.accountName
        req.body = { ...req.body, userId: payload.userId, accountId: account.id }
        const transaction = await models.Transactions.create(req.body)
        res.status(200).json({
            transaction
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = addTransaction;