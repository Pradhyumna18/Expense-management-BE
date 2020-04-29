const Joi = require('joi');

const addAccountValidation = async (req, res, next) => {

    try {
        console.log("add accoutn")
        const addAccountDataSchema = Joi.object({
            accountName: Joi.string().alphanum().required(),
            accountBalance: Joi.number().min(0),
        })

        const value = await addAccountDataSchema.validate({ accountName: req.body.accountName, accountBalance: req.body.accountBalance });
        next();

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.details[0].message,
            
        })
    }
}

module.exports = addAccountValidation;