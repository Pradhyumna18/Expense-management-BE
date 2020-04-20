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
            res.status(201).json(
                {
                    success: true,
                    user
                }
            );
        }
        else {
            res.status(400).json(
                {
                    success: false,
                    message: "User already exist!"
                }
            );
        }
    }
    catch (err) {
        res.status(500).json(
            {
                success: false,
                message: "error"
            }
        );
    }
}
module.exports = SignUp;