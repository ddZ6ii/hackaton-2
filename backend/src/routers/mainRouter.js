import express from 'express';

import homeRouter from './homeRouter.js';

const router = express.Router();

router.use('/', homeRouter);

export default router;
