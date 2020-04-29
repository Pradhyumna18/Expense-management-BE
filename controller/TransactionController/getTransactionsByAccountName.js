const models = require('../../models')
const jwt = require('jsonwebtoken')

/** @description Gets transactions based on the account name.
 * @param {object} req - Request object with userId and accountName.
 * @param {object} res - Response object with a boolean variable success and array of transactions if request is success else error.
 * @param {function next(error) {   
}} next - calls the global error handler function. 
*/

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