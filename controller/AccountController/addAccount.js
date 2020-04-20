const models = require('../../models')
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