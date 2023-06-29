/**
 * @desc middleware to check user token after authentication (POST, PUT and DELETE routes)
 * allow only users with valid token to perform sensitive requests
 */

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
      throw new Error("en-tete d'autorisation manquant!");
    }

    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer') {
      throw new Error("L'entête Autorisation n'a pas le type 'Bearer'");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "l'authentification du token a échoué...",
      error: err.message,
    });
  }
};

export default verifyToken;
