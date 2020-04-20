const Joi = require('joi');
​
const signUpValidation = async (req, res, next) => {
​
    try {
        const signupDataSchema = Joi.object({
            userName: Joi.string().alphanum().min(5).max(30).required(),
            password: Joi.string().alphanum().min(5).max(30).required(),
        })
​
        const value = await signupDataSchema.validate({ userName: req.body.userName, password: req.body.password });
        next();
​
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid user data",
            error
        })
    }
}
​
module.exports = signUpValidation;