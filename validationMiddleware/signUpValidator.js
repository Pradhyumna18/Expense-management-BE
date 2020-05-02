
const Joi = require('joi');
const logger=require('../log')
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
    res.status(400).json({
      success: false,
      message: error.details[0].message
    })
  }

}

module.exports = signUpValidation;