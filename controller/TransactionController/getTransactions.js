const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getTransactions(req, res, next) {
    try {
        const transactions = await models.Transactions.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.status(200).json({
            transactions
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = getTransactions