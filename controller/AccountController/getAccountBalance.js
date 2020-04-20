const models = require('../../models')
async function getAccountBalance(req, res, next) {
    try {
        const account = await models.Accounts.findAll({
            where: {
                userId: req.params.userId,
                accountName:req.params.accountName
            }
        })
        obj = [...JSON.parse(JSON.stringify(account, null, 4))]
        balance=obj[0].accountBalance
        res.status(200).json({
            success:true,
           balance
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = getAccountBalance;