/**
 * @desc start and run a local server on the dedicated SERVER_PORT (env. variable)
 */

import * as dotenv from 'dotenv';
import app from './app.js';
dotenv.config();

/**
 * CONSTANTS
 */
// import environment variables
const APP_PORT = process.env.SERVER_PORT || 3000;

/**
 * START LOCAL SERVER
 * open a browser at http://localhost:SERVER_PORT/
 */
app.listen(APP_PORT, (err) => {
  if (err) {
    console.error('oops... could not establish connection to the local server');
  } else {
    console.log(`server is listening on ${APP_PORT}...`);
  }
});
