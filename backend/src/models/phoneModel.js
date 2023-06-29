/**
 * @desc handles all database (read/write) interactions related to phones
 * directly called by the controller
 */
import { database } from '../database/config.js';

const table = `phone`;

const findAll = (sql = `SELECT * FROM ${table}`, sqlValues = []) => {
  return database.query(sql, sqlValues);
};

const findOne = (id) => {
  const SQL = `SELECT * FROM ${table} INNER JOIN feature ON feature.id = ${table}.id WHERE ${table}.id = ?`;
  return database.query(SQL, [id]);
};

export { findAll, findOne };
