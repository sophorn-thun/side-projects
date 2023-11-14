import Joi from 'joi'

const schema = Joi.object({
  name: Joi.any(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'))
    .required()
}).unknown(false)

export default schema;