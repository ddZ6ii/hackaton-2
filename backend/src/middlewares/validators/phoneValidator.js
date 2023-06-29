/**
 * @desc automated method for server-side data validation (prior to database entry)
 * here the Joi package is used (express-validator is an alternative)
 */
import Joi from "joi";

const phoneSchema = Joi.object({
  brand: Joi.string().max(50).required(),
  creation_date: Joi.date().required(),
  model: Joi.string().max(50).required(),
  thumbnail_1: Joi.string().max(255),
  thumbnail_2: Joi.string().max(255),
  thumbnail_3: Joi.string().max(255),
  category: Joi.string().max(50).required(),
  color: Joi.string().max(20),
  has_charger: Joi.bool().required(),
  network: Joi.string().max(20),
  OS: Joi.string().max(50),
  price: Joi.number().precision(2).required(),
  RAM: Joi.number().integer().required(),
  screen: Joi.number().precision(2),
  state: Joi.string().max(50).required(),
  storage: Joi.number().integer().required(),
});

export default function validatePhone(req, res, next) {
  const {
    brand,
    creation_date,
    model,
    thumbnail_1,
    thumbnail_2,
    thumbnail_3,
    category,
    color,
    has_charger,
    network,
    OS,
    price,
    RAM,
    screen,
    state,
    storage,
  } = req.body;

  const { error } = phoneSchema.validate(
    {
      brand,
      creation_date,
      model,
      thumbnail_1,
      thumbnail_2,
      thumbnail_3,
      category,
      color,
      has_charger,
      network,
      OS,
      price,
      RAM,
      screen,
      state,
      storage,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}
