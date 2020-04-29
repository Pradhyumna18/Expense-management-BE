
const Joi = require('joi');
const signUpValidation = async (req, res, next) => {

    try {
        const signupDataSchema = Joi.object({
            userName: Joi.string().email().required(),
            password: Joi.string().alphanum().min(5).max(30).required(),
        })

        const value = await signupDataSchema.validate({ userName: req.body.userName, password: req.body.password });

        next();

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.details[0].message   
        })
    }

}

module.exports = signUpValidation;