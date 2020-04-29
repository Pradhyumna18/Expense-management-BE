const models = require('../../models')
/** @description Gives account balance of a account.
 * @param {object} req - Request object with account name and userId.
 * @param {object} res - Reponse object with a boolean variable success and balance if request is success else error message.
 * @param {function next(error) {   
}} next - calls the global error handler.
*/
async function getAccountBalance(req, res, next) {
    try {
        const account = await models.Accounts.findAll({
            where: {
                userId: req.params.userId,
                accountName: req.params.accountName
            }
        })
        obj = [...JSON.parse(JSON.stringify(account, null, 4))]
        balance = obj[0].accountBalance
        res.status(200).json({
            success: true,
            balance
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = getAccountBalance;