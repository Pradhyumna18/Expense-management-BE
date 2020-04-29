const models = require('../../models')
const jwt = require('jsonwebtoken')
/** @description gives account name based on the accountId.
 * @param {object} req - Request object with userId and accountId.
 * @param {object} res - Reponse object with a boolean variable success and account name if request is success else error message.
 * @param {function next(error) {   
}} next - calls the global error handler.
*/
async function getAccountNameById(req, res, next) {
    try {

        const account = await models.Accounts.findAll({
            where: {
                userId: req.params.userId,
                id: req.params.accountId
            }
        })
        obj = [...JSON.parse(JSON.stringify(account, null, 4))]
        accountName = obj[0].accountName
        res.status(200).json({
            success: true,
            accountName
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = getAccountNameById;