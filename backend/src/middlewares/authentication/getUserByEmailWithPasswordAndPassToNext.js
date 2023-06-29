/**
 * @desc middleware for checking user already exists in the database, and if so, pass along user credentials to the next middleware
 * hash user password using argon2 prior writing to database
 */

import * as userModel from '../../models/userModel.js';

const getUserByEmailWithPasswordAndPassToNext = async (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).send('bad request: empty body');

  try {
    const [[user]] = await getByEmail(req.body.email);
    if (!user) return res.status(401).send('invalid credentials');
    // if user credentials are valid, pass user info along with the request to the next middleware
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('error retrieving user from database');
  }
};

// const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
//   const { email } = req.body;

//   database
//     .query('SELECT * FROM users WHERE email = ?', [email])
//     .then(([users]) => {
//       if (users[0] != null) {
//         req.user = users[0];

//         next();
//       } else {
//         res.sendStatus(401);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error retrieving data from database');
//     });
// };

export default getUserByEmailWithPasswordAndPassToNext;
