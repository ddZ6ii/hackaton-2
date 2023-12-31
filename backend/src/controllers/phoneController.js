/**
 * @desc handle all response/requests related to phones
 * directly called by the router, the controller handles all client/server interactions
 */

import * as phoneModel from '../models/phoneModel.js';
import handlePhoneQueries from '../services/handlePhoneQueries.js';

const getPhones = async (req, res) => {
  try {
    // destructure only if the client request contains a query
    const [sql, sqlValues] = handlePhoneQueries(req.query) || [];

    const [phones] = await phoneModel.findAll(sql, sqlValues);

    if (!phones.length)
      return res.send('aucun resultat correspondant dans la base de données!');

    res.json(phones);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue en récupérant les téléphones depuis la base de données'
      );
  }
};

const getPhone = async (req, res) => {
  try {
    const [[phone]] = await phoneModel.findOne(req.params.id);
    if (!phone)
      return res
        .status(400)
        .send(`téléphone avec id ${req.params.id} non trouvé!`);
    res.json(phone);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue en récupérant le téléphone depuis la base de données...'
      );
  }
};

const deletePhone = async (req, res) => {
  try {
    const [result] = await phoneModel.remove(req.params.id);
    // id not found or invalid
    if (result.affectedRows === 0) {
      return res.status(404).send(`téléphone ${req.params.id} non trouvé!`);
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue en tentant de supprimer le téléphone de la base de données...'
      );
  }
};

const postPhone = async (req, res) => {
  try {
    const [phone] = await phoneModel.addPhone(req.body);
    if (phone.affectedRows === 0) {
      return res.status(404).send(`requete non valide!`);
    }

    const [feature] = await phoneModel.addFeature(req.body, phone.insertId);
    if (feature.affectedRows === 0) {
      return res.status(404).send(`requete non valide!`);
    }

    // returns both the status and a location header with link to /api/movies/{id} containing new ID
    res.location(`${req.route.path}/${phone.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue en ajoutant le téléphone dans la base de données...'
      );
  }
};

const postFeature = async (req, res) => {
  try {
    const [phone] = await phoneModel.postPhone(req.body);
    if (phone.affectedRows === 0) {
      return res.status(404).send(`requete non valide!`);
    }
    // returns both the status and a location header with link to /api/movies/{id} containing new ID
    res.location(`${req.route.path}/${phone.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue en ajoutant le téléphone dans la base de données...'
      );
  }
};

export { getPhones, getPhone, deletePhone, postPhone, postFeature };
