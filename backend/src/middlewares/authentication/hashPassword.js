/**
 * @desc hash user password using argon2 (prior writing to database)
 */

import argon2 from 'argon2';

/**
 * Use OWSP minimum recommendations for argon2id:
 *    - memoryCost (memory size m): 19 MiB (2^14.28)
 *    - timeCost (iteration count t): 2
 *    - parallelism (degree of parallelism p): 1
 */
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 14.28,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;

  try {
    // hash the password using argon2 then call next()
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // remove clear password from request body
    delete req.body.password;

    // add hashed password to request body
    req.body.password = hashedPassword;

    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send('une erreur est servenue durant le hashage du mot de passe...');
  }
};

export default hashPassword;
