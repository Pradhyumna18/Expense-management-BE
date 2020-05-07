const Joi = require('joi');
const logger=require('../log')
const {response}=require('../helper/helper')
const addTransactionValidation = async (req, res, next) => {

    try {
        const addTransactionDataSchema = Joi.object({
            transactionType: Joi.required(),
            description: Joi.any().required(),
            amount: Joi.number().positive().required(),
            accountName: Joi.string().alphanum().required(),
            date: Joi.date().required(),
        })

        await addTransactionDataSchema.validate({
            transactionType: req.body.transactionType,
            description: req.body.description,
            amount: req.body.amount,
            accountName: req.body.accountName,
            date: req.body.date,
        });
        next();

    }
    catch (error) {
        logger.error(error.details[0].message)
        response(res,400,error.details[0].message)
        
    }
}

module.exports = addTransactionValidation;