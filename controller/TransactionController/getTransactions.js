const models = require('../../models')
/** @description Gets transaction based on user id.
 * @param {object} req - Request object with transaction id.
 * @param {object} res - Response object with a boolean variable success and object containing transactions   if request is success else error.
 * @param {function next(error) {   
}} next - calls the global error handler.
*/
async function getTransactions(req, res, next) {
    try {
        const transactions = await models.Transactions.findAll({
            where: {
                userId: req.params.userId
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
module.exports = getTransactions