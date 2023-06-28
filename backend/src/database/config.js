/**
 * @desc configure and create connection to database via mysql client (mysql2 0package on the dedicated DB_PORT (env. variable)
 */

import * as dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = mysql.createPool({
  host: DB_HOST, // host name
  port: DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

database
  .getConnection()
  .then(() => {
    console.log('connection to database established!');
  })
  .catch((err) => {
    console.error(err);
  });

export { database };

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('oops... could not establish connection to the database');
//   } else {
//     console.log(`connection to database on port ${DB_PORT}...`);
//   }
// });

// export default connection;
