const Joi = require('joi');
const logger=require('../log')
const response=require('../helper/response')
const addAccountValidation = async (req, res, next) => {

    try {
        const addAccountDataSchema = Joi.object({
            accountName: Joi.string().alphanum().required(),
            accountBalance: Joi.number().min(0),
        })

        const value = await addAccountDataSchema.validate({ accountName: req.body.accountName, accountBalance: req.body.accountBalance });
        next();

    }
    catch (error) {
        logger.error(error.details[0].message)
        response(res,400,error.details[0].message)
      
    }
}

module.exports = addAccountValidation;