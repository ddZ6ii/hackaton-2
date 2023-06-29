import express from 'express';
import * as phoneController from '../controllers/phoneController.js';
import * as userController from '../controllers/userController.js';
// import validatePhone from '../middleware/validators/phoneValidator.js';
// import verifyToken from '../middleware/authentication/verifyToken.js';
// import getUserByEmailWithPasswordAndPassToNext from '../middleware/authentication/getUserByEmailWithPasswordAndPassToNext.js';
// import verifyPassword from '../middleware/authentication/verifyPassword.js';

const router = express.Router();

router.get('/smartphones', phoneController.getPhones);
router.get('/smartphones/:id', phoneController.getPhone);

router.post('/login', getUserByEmailWithPasswordAndPassToNext, verifyPassword);
// router.post('/login', getUserByEmailWithPasswordAndPassToNext);

// authentication wall : verifyToken is activated for each route after this line
// router.use(verifyToken);
// router.post('smartphones', validatePhone, phoneController.addPhone);
router.post('/smartphones', phoneController.postPhone);
// router.put('/:id', validatePhone, phoneController.modifyPhone);
router.delete('/smartphones/:id', phoneController.deletePhone);

// routes test
router.get('/users', userController.getAllUsers);
router.post('/users', userController.postUser);
// router.post('/users', hashedPassword, userController.postUser);
router.delete('/users/:id', userController.deleteUser);

export default router;

// TO DO:
// 1- ajouter le hashage du pwd lors d'un ajout nouvel utilisateur en BDD
// 2a- verifier au login utilisateur que le compte existe deja
// 2b- verifier que l'atutehtnification (mdp) est valide
// 3a- generation JWT
// 3b- mur authentification pour proteger TOUTES les routes
// 4- reflechir comment calculer:
//   - evaluer categorie produit (liberte utilisateur ou calcul?)
//   - determiner un prix en fonction de la categorie d'un telephone
