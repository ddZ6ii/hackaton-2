import express from 'express';

// controllers
import * as phoneController from '../controllers/phoneController.js';
import * as userController from '../controllers/userController.js';

// middlewares
import validateUser from '../middlewares/validators/userValidator.js';
import validatePhone from '../middlewares/validators/phoneValidator.js';
import hashPassword from '../middlewares/authentication/hashPassword.js';
import addOnlyIfNotAlreadyExists from '../middlewares/authentication/addOnlyIfNotAlreadyExists.js';
import getUserByEmailWithPasswordAndPassToNext from '../middlewares/authentication/getUserByEmailWithPasswordAndPassToNext.js';
import verifyPassword from '../middlewares/authentication/verifyPassword.js';
import verifyToken from '../middlewares/authentication/verifyToken.js';

const router = express.Router();

router.post('/login', getUserByEmailWithPasswordAndPassToNext, verifyPassword);

// authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

router.get('/smartphones', phoneController.getPhones);
router.get('/smartphones/:id', phoneController.getPhone);

router.post('/smartphones', validatePhone, phoneController.postPhone);
router.delete('/smartphones/:id', phoneController.deletePhone);

// routes for administration
router.get('/users', userController.getAllUsers);
router.post(
  '/users',
  validateUser,
  addOnlyIfNotAlreadyExists,
  hashPassword,
  userController.postUser
);
router.delete('/users/:id', userController.deleteUser);

export default router;

// TO DO:
// 5- reflechir comment:
//   - determiner un prix en fonction de la categorie d'un telephone
// 7- upload fichier depuis le front
