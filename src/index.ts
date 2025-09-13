// import express from 'express';
// import { registerRoutes } from './routes/index';  // Changed to named import (fixes TS1192)
// import { config } from './config';
// import { loggingMiddleware } from './middleware/logging';

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(loggingMiddleware);

// // Register routes and start server (replaces app.use('/api', router) and app.listen())
// registerRoutes(app);  // Call the function; no need for await since it's sync (see below)
// import express from 'express';

// import { registerRoutes } from './routes/index';  // Changed to named import (fixes TS1192)
// import { loggingMiddleware } from './middleware/logging';
// import { config } from 'dotenv';

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(loggingMiddleware);

// // Register routes and start server (replaces app.use('/api', router) and app.listen())
// registerRoutes(app);  // Call the function; no need for await since it's sync (see below)

// // const port = process.env.PORT || 5000;  // Use env or default
// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });

// app.listen(config.port, () => {
//   console.log(`Server on port ${config.port}`);
// });



/*
import { config } from 'dotenv';
config(); // Load .env first

import express from 'express';
import { registerRoutes } from './routes/index';
import { loggingMiddleware } from './middleware/logging';
import { config as appConfig } from './config/index';

const app = express();

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Register routes
registerRoutes(app);

app.listen(appConfig.port, () => {
  console.log(`Server on port ${appConfig.port}`);
});
*/











import "dotenv/config";  // <-- loads .env before any other module


import express from "express"
//import cors from "cors"
import { registerRoutes } from "./routes/index"
import { loggingMiddleware } from "./middleware/logging"
import { config as appConfig } from "./config/index"
import swaggerUi from 'swagger-ui-express';
import { specs } from './docs/swagger';

const app = express()

//app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//app.use(express.raw({ type: "application/webhook+json" }))
app.use(loggingMiddleware)

registerRoutes(app)
export default app;

const port = appConfig.port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
