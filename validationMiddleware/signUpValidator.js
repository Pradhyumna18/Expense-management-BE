
const Joi = require('joi');
const logger=require('../log')
const response=require('../helper/response')
const signUpValidation = async (req, res, next) => {

  try {
    const signupDataSchema = Joi.object({
      userName: Joi.string().email().required(),
      password: Joi.string().min(3).max(30).required(),
    })

    const value = await signupDataSchema.validate({ userName: req.body.userName, password: req.body.password });

    next();

  }
  catch (error) {
    logger.error(error.details[0].message)
    response(res,400,error.details[0].message)
  }

}

module.exports = signUpValidation;