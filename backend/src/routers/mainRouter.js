import express from 'express';

import homeRouter from './homeRouter.js';
import phoneRouter from './phoneRouter.js';

const router = express.Router();

router.use('/', homeRouter);
router.use('/smartphones', phoneRouter);

export default router;
