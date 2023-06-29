/**
 * @desc handles all database (read/write) interactions related to phones
 * directly called by the controller
 */
import { database } from '../database/config.js';

const table = `phone`;

const findAll = (
  sql = `SELECT * FROM ${table} LEFT JOIN feature ON feature.phone_id = phone.id_phone`,
  sqlValues = []
) => {
  return database.query(sql, sqlValues);
};

const findOne = (id) => {
  const SQL = `SELECT p.*, f.* FROM ${table} AS p LEFT JOIN feature AS f ON f.phone_id = p.id_phone WHERE p.id_phone = ?`;
  return database.query(SQL, [id]);
};

const addPhone = (body) => {
  return database.query(
    `INSERT INTO ${table} (brand, creation_date, model, thumbnail_1, thumbnail_2, thumbnail_3) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      body.brand,
      body.creation_date,
      body.model,
      body.thumbnail_1,
      body.thumbnail_2,
      body.thumbnail_3,
    ]
  );
};

const addFeature = (body, idPhone) => {
  return database.query(
    'INSERT INTO feature (`category`, `color`, `has_charger`, `network`, `OS`, `price`, `RAM`, `screen`, `state`, `storage`, `phone_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      body.category,
      body.color,
      body.has_charger,
      body.network,
      body.OS,
      body.price,
      body.RAM,
      body.screen,
      body.state,
      body.storage,
      idPhone,
    ]
  );
};

const remove = (id) => {
  const SQL = `DELETE ${table}, feature FROM phone LEFT JOIN feature ON feature.phone_id = ${table}.id_phone WHERE ${table}.id_phone = ?`;
  return database.query(SQL, [id]);
};

export { findAll, findOne, addPhone, addFeature, remove };
