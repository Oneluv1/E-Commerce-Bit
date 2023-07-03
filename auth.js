const Joi = require('joi');
const jwt = require('jsonwebtoken');
const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });
  const validateLogin = (loginData) => {
    const { error } = loginSchema.validate(loginData);
    if (error) {
       new Error(error.details[0].message);
    }
  };
    