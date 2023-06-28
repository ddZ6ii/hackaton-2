import express from 'express';
import * as phoneController from '../controllers/phoneController.js';

const router = express.Router();

router.get('/smartphones', phoneController.getAllPhones);
router.get('/smartphones/:id', phoneController.getPhone);

export default router;
