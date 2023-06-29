/**
 * @desc automated method for server-side data validation (prior to database entry)
 * here the Joi package is used (express-validator is an alternative)
 */
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(255).required(),
  is_admin: Joi.bool().required(),
});

export default function validateUser(req, res, next) {
  const { email, password, is_admin } = req.body;

  const { error } = userSchema.validate(
    { email, password, is_admin },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}
