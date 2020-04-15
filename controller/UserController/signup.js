const models = require('../../models')
let passwordHash = require('password-hash')
async function SignUp(req, res, next) {
    try {
        const user = await models.Users.findOne({
            where: {
                userName: req.body.userName
            }
        })
        if (!user) {
            const p = req.body.password;
            let hashedPassword = passwordHash.generate(p);
            req.body.password = hashedPassword;
            const user = await models.Users.create(req.body);
            res.status(200).json(
                user
            );
        }
        else {
            res.status(409).json(
                { message: "username already exists" }
            );
        }
    }
    catch (err) {
        res.status(400).json(
            { message: "error" }
        );
    }
}
module.exports = SignUp;