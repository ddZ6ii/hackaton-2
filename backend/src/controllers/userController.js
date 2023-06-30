/**
 * @desc handle all response/requests related to users
 * directly called by the router, the controller handles all client/server interactions
 */
import * as userModel from '../models/userModel.js';

const getAllUsers = async (req, res) => {
  try {
    const [users] = await userModel.findAll();
    if (!users.length) return res.send('aucun utilisateur dans la table');
    res.json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        'une erreur est survenue en récupérant les utilisateurs depuis la base de données...'
      );
  }
};

const postUser = async (req, res) => {
  try {
    const [user] = await userModel.add(req.body);
    if (user.affectedRows === 0) {
      return res.status(404).send(`requete non valide!`);
    }
    res.json({ email: req.body.email, is_admin: req.body.is_admin });
  } catch (err) {
    console.error(err);
    res.status(500).send('error saving user to database');
  }
};

const deleteUser = async (req, res) => {
  try {
    const [result] = await userModel.remove(req.params.id);
    // id not found or invalid
    if (result.affectedRows === 0) {
      return res.status(404).send(`utilisateur ${req.params.id} non trouvé`);
    }
    res.status(204).send('Utilisateur supprimé');
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "une erreur est survenue en supprimant l'utilisateur de la base de données..."
      );
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('appjwt').status(200).json({ message: 'user logged out' });
};

export { getAllUsers, postUser, deleteUser, logoutUser };
