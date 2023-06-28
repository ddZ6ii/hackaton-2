import express from 'express';
import mainRouter from './src/routers/mainRouter.js';
import cors from 'cors';
import multer from 'multer';

const app = express();
const upload = multer({ dest: './public/uploads/' });
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

// Serve the public folder for public resources
// app.use(express.static(path.join(__dirname, '../public')));

/**
 * ROUTING
 */
app.use('/', mainRouter);

export default app;
