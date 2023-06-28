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
  return database.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
};

export { findAll, findOne };
