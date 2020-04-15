const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getAccountNameById(req, res, next) {
    try {
       
        const account = await models.Accounts.findAll({
            where: {
                userId: req.params.userId,
                id:req.params.accountId
            }
        })
        console.log(account)
        obj = [...JSON.parse(JSON.stringify(account, null, 4))]
        accountName=obj[0].accountName
        res.status(200).json({
           accountName
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = getAccountNameById;