const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getTransactionById(req, res, next) {
    try {
        console.log(req.params.transactionId)
        const transaction = await models.Transactions.findOne({
            where: {
                id: req.params.transactionId
            }
        })
     //   console.log(req.params.transactionId,transaction)
        res.status(200).json({
            success:true,
            transaction
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = getTransactionById;