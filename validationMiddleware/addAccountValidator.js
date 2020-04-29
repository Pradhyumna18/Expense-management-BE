const Joi = require('joi');

const addAccountValidation = async (req, res, next) => {

    try {
        const addAccountDataSchema = Joi.object({
            accountName: Joi.string().alphanum().required(),
            accountBalance: Joi.number().positive(),
        })

        const value = await addAccountDataSchema.validate({ accountName: req.body.accountName, accountBalance: req.body.accountBalance });
        next();

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
            
        })
    }
}

module.exports = addAccountValidation;