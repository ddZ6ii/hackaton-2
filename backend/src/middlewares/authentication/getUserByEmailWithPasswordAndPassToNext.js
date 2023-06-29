/**
 * @desc middleware for checking user already exists in the database, and if so, pass along user credentials to the next middleware
 * hash user password using argon2 prior writing to database
 */

import * as userModel from '../../models/userModel.js';

const getUserByEmailWithPasswordAndPassToNext = async (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).send('bad request: empty body');

  try {
    const [[user]] = await userModel.findByMail(req.body.email);
    if (!user)
      return res
        .status(401)
        .send(
          'aucun compte utilisateur enregistré! veuillez vérifier votre email'
        );
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

export default getUserByEmailWithPasswordAndPassToNext;
