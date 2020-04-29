const models = require('../../models')
let passwordHash = require('password-hash')

/** @description creates a new user with username and password.
 * @param {object} req - Request object containing username and password.
 * @param {object} res - Reponse object with a boolean variable success and user if request is success else  error message .
 * @param {function next(error) {   
}} next - calls the global error handler function.
*/
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
       next(err)
    }
}
module.exports = SignUp;
