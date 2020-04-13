const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getAccountsByUserId(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const accounts = await models.Accounts.findAll({
            where: {
                userId: payload.userId
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