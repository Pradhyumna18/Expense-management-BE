const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getTransactionById(req, res, next) {
    try {
        const transaction = await models.Transactions.findOne({
            where: {
                id: req.body.transactionId
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
module.exports = getTransactionById;