const models = require('../../models')
/** @description gets account details based on the userId.
 * @param {object} req - Request object with userId.
 * @param {object} res - Reponse object with a boolean variable success and required accounts if request is success else error message.
 * @param {function next(error) {   
}} next - calls the global error handler.
*/
async function getAccountsByUserId(req, res, next) {
    try {

        const accounts = await models.Accounts.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.status(200).json({
            success: true,
            accounts
        })
    }

    catch (err) {
        next(err)
    }
}
module.exports = getAccountsByUserId;