import express from 'express';
import mainRouter from './routers/mainRouter.js';

/**
 * CONSTANTS
 */
// start a server application by creating an instance of Express
const app = express();

/**
 * ROUTING
 */
// express built-in middleware: allow Express to read JSON request body (mandatory for POST and PUT requests)
app.use(express.json());
// routes definition
app.use('/api', mainRouter);

// export Express instance to create a local server in server.js
export default app;
