/**
 * @desc handle all response/requests related to phones
 * directly called by the router, the controller handles all client/server interactions
 */

import * as phoneModel from '../models/phoneModel.js';
import handlePhoneQueries from '../services/handlePhoneQueries.js';

const getAllPhones = async (req, res) => {
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
        .send(`téléphone avec id ${req.params.id} non trouvé !`);
    res.json(phone);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue en récupérant le téléphone depuis la base de données'
      );
  }
};

export { getAllPhones, getPhone };
