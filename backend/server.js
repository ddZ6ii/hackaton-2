/**
 * @desc start and run a local server on the dedicated SERVER_PORT (env. variable)
 */

import * as dotenv from 'dotenv';
import app from './app.js';
dotenv.config();

const SERVER_PORT = process.env.APP_PORT || 3000;

/**
 * START LOCAL SERVER
 */
app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.error('oops... could not establish connection to the local server');
  } else {
    console.log(`server is listening on ${SERVER_PORT}...`);
  }
});
