const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getAccountsByUserId(req, res, next) {
    try {
       
        const accounts = await models.Accounts.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.status(200).json({
            accounts
        })
    }

    catch (err) {
        next(err)
    }
}
module.exports = getAccountsByUserId;