const models = require('../../models')
const jwt = require('jsonwebtoken')
async function addAccount(req, res, next) {
    try {
        const account = await models.Accounts.findOne({
            where: {
                accountName: req.body.accountName,
                userId: req.body.userId
            }
        })
        if (!account) {
            console.log(req.body)
            const account = await models.Accounts.create(req.body)
            res.status(200).json({
                account
            })
        }
        else {
            res.json({
                message: "account name already exists"
            })
        }
    }

    catch (err) {
        next(err)
    }
}
module.exports = addAccount;