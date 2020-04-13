const models = require('../../models')
const jwt = require('jsonwebtoken')
async function addAccount(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const user = await models.Users.findOne({
            where: {
                userName: payload.userName
            }
        })
        const account = await models.Accounts.findOne({
            where: {
                accountName: req.body.accountName
            }
        })
        if (!account) {
            const obj = { ...req.body, userId: user.id }
            console.log(req.body)
            const account = await models.Accounts.create(obj)
            res.status(200).json({
                account
            })
        }
        else {
            res.status(400).json({
                message: "account name already exists"
            })
        }
    }

    catch (err) {
        next(err)
    }
}
module.exports = addAccount;