/**
 * @desc configure and create connection to database via mysql client (mysql2 0package on the dedicated DB_PORT (env. variable)
 */

import * as dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

database
  .getConnection()
  .then(() => {
    console.log(`connected to database on port ${DB_PORT}`);
  })
  .catch((err) => {
    console.error(err);
  });

export { database };
