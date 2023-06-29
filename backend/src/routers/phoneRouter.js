import express from 'express';
import * as phoneController from '../controllers/phoneController.js';

const router = express.Router();

router.get('/', phoneController.getAllPhones);
router.get('/:id', phoneController.getPhone);

export default router;
