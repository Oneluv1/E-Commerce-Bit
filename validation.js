const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
});

module.exports = schema