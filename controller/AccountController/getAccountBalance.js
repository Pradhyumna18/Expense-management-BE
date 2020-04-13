const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getAccountBalance(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const account = await models.Accounts.findAll({
            where: {
                userId: payload.userId,
                accountName:req.body.accountName
            }
        })
        obj = [...JSON.parse(JSON.stringify(account, null, 4))]
        balance=obj[0].accountBalance
        res.status(200).json({
           balance
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = getAccountBalance;