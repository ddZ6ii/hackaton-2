import express from 'express';
import * as phoneController from '../controllers/phoneController.js';
// import validatePhone from '../middleware/validators/phoneValidator.js';
// import verifyToken from '../middleware/authentication/verifyToken.js';

const router = express.Router();

router.get('/smartphones', phoneController.getPhones);
router.get('/smartphones/:id', phoneController.getPhone);

// authentication wall : verifyToken is activated for each route after this line
// router.use(verifyToken);
// router.post('smartphones', validatePhone, phoneController.addPhone);
router.post('/smartphones', phoneController.postPhone);
// router.put('/:id', validatePhone, phoneController.modifyPhone);
router.delete('/smartphones/:id', phoneController.deletePhone);

export default router;
