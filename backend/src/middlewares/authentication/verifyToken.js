/**
 * @desc middleware to check user token after authentication (POST, PUT and DELETE routes)
 * allow only users with valid token to perform sensitive requests
 */

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.appjwt;
    if (!token)
      return res.status(401).json({ message: 'no authentication token' });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
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
