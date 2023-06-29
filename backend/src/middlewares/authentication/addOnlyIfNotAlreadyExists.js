/**
 * @desc middleware for checking if user already exists in the database prior adding it
 */

import * as userModel from '../../models/userModel.js';

const addOnlyIfNotAlreadyExists = async (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).send('bad request: empty body');

  try {
    const [[user]] = await userModel.findByMail(req.body.email);
    if (user)
      return res
        .status(409)
        .send('email déja existant dans la base de données!');
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue lors de la vérification du compte utilisateur depuis la base de données...'
      );
  }
};

export default addOnlyIfNotAlreadyExists;
