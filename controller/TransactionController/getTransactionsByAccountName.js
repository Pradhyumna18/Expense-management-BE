const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getTransactionsByAccountName(req, res, next) {
    try {

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
    }

    catch (err) {
        next(err)
    }
}
module.exports = getTransactionsByAccountName;