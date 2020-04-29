const models = require('../../models')

/** @description Adds a new account with accountName and startingBalance.
 * @param {object} req - Request object with accountName and startingBalance.
 * @param {object} res - Reponse object with a boolean variable success  if request is success else  error message.
 * @param {function next(error) {   
}} next - calls the global error handler function.
*/
async function addAccount(req, res, next) {
    try {
        const account = await models.Accounts.findOne({
            where: {
                accountName: req.body.accountName,
                userId: req.body.userId
            }
        })
        if (!account) {
            const account = await models.Accounts.create(req.body)
            res.status(201).json({
                success: true,
                account
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Account already exist!"
            })
        }
    }

    catch (err) {
        next(err)
    }
}
module.exports = addAccount;
