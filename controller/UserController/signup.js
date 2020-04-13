const models = require('../../models')
let passwordHash = require('password-hash')
async function SignUp(req, res, next) {
    try {
        const user = await models.Users.findOne({
            where: {
                userName: req.body.userName
            }
        })
        if(!user)
        {
        const p = req.body.password;
        let hashedPassword = passwordHash.generate(p);
        req.body.password = hashedPassword;
        const user = await models.Users.create(req.body);
        res.status(200).send(
            user
        );
        }
        else{
            res.status(400).send(
               "username already exists"
            );
        }
    }
    catch (err) {
        next(err)
    }
}
module.exports = SignUp;