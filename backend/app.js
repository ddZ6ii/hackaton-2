import express from 'express';
import mainRouter from './src/routers/mainRouter.js';
import cors from 'cors';

const app = express();

/**
 * MIDDLEWARE
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

/**
 * ROUTING
 */
app.use('/', mainRouter);

export default app;
