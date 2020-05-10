const models = require('../../models')
const logger=require('../../log')
const {decodeToken}=require('../../helper/helper')
/** @description Gets transaction based on user id.
 * @param {object} req - Request object with transaction id.
 * @param {object} res - Response object with a boolean variable success and object containing transactions   if request is success else error.
  * @param {function} - callback function which calls the global error handler
 * @returns {Promise}.
*/
async function getTransactions(req, res, next) {
    try {
        logger.info(req.url)
        const payload=decodeToken(req.headers.authorization)
        const transactions = await models.Transactions.findAll({
            where: {
                userId: payload.userId
            }
        })
        res.status(200).json({
            success:true,
            transactions
        })
        logger.info("getTransactionsByUserId.successful")
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = getTransactions