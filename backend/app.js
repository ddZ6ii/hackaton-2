import express from 'express';
import mainRouter from './src/routers/mainRouter.js';

const app = express();

/**
 * ROUTING
 */
app.use(express.json());
app.use('/', mainRouter);

export default app;
