const models = require('../../models')
const logger = require('../../log')
/** @description Gets transaction based on transaction id.
 * @param {object} req - Request object with transaction id.
 * @param {object} res - Response object with a boolean variable success and object containing transaction details  if request is success else error.
 * @param {function} - callback function which calls the global error handler
 * @returns {Promise}
*/
async function getTransactionById(req, res, next) {
    try {
        logger.info(req.url)
        const transaction = await models.Transactions.findOne({
            where: {
                id: req.params.transactionId
            }
        })
        res.status(200).json({
            success: true,
            transaction
        })
        logger.info("getTransactionById.successful")
    }
    catch (err) {
        logger.error(req.url)
        logger.error(err.name)
        next(err)
    }
}
module.exports = getTransactionById;