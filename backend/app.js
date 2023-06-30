import express from 'express';
import mainRouter from './src/routers/mainRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * MIDDLEWARE
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, '../public')));

/**
 * ROUTING
 */
app.use('/', mainRouter);

export default app;
