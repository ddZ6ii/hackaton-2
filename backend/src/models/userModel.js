/**
 * @desc directly called by the controller, the model handles all database (read/write) interactions
 */

import { database } from '../database/config.js';

function findAll() {
  return database.query('SELECT `id_user`, `email`, `is_admin` FROM `user`');
}

function findByMail(email) {
  return database.query('SELECT * FROM `user` WHERE `email` = ?', [email]);
}

function add(body) {
  const { email, password, is_admin } = body;
  const SQL =
    'INSERT INTO `user` (`email`, `password`, `is_admin`) VALUES (?, ?, ?)';
  return database.query(SQL, [email, password, is_admin]);
}

function modify(body, id) {
  const { email, password } = body;
  const SQL = 'UPDATE `user` SET `email` = ?, `password` = ? WHERE id = ?';
  return database.query(SQL, [email, password, id]);
}

function remove(id) {
  return database.query('DELETE FROM `user` WHERE `id_user` = ?', [id]);
}

export { findAll, findByMail, add, modify, remove };
