const models = require('../../models')
const jwt = require('jsonwebtoken')
async function getAccountNameById(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const account = await models.Accounts.findAll({
            where: {
                userId: payload.userId,
                id:req.body.id
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