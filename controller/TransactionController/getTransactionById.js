const models = require('../../models')
const jwt = require('jsonwebtoken')
/** @description Gets transaction based on transaction id.
 * @param {object} req - Request object with transaction id.
 * @param {object} res - Response object with a boolean variable success and object containing transaction details  if request is success else error.
 * @param {function next(error) {   
}} next - calls the error handling middleware.
*/
async function getTransactionById(req, res, next) {
    try {
        console.log(req.params.transactionId)
        const transaction = await models.Transactions.findOne({
            where: {
                id: req.params.transactionId
            }
        })
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