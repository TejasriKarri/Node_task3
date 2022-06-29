const Joi = require('joi');
const validator = (userObj) => {
  const UserSchema = Joi.object({
    Id: Joi.number().integer().required(),
    Login: Joi.string().trim(true).required(),
    Password: Joi.string().regex(/^[0-9]{3}[a-zA-Z]{3}|[0-9]{3}[a-zA-Z]{3}$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  })
  return UserSchema.validate(userObj);
};

const validate = (userObj) => {
  const UserSchemaForAge = Joi.object({
    Login: Joi.string().trim(true),
    Password: Joi.string().regex(/^[0-9]{3}[a-zA-Z]{3}|[0-9]{3}[a-zA-Z]{3}$/),
    age: Joi.number().integer().min(4).max(130),
  })
  return UserSchemaForAge.validate(userObj);
};

module.exports = {
  validator: validator,
  validate: validate,
}