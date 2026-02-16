import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import licensesRouter from './api/licenses.js';
import versionsRouter from './api/versions.js';
import webhooksRouter from './api/webhooks.js';
import authRouter from './api/auth.js';

// Load environment variables
config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());

// Stripe webhooks need raw body
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// JSON body parser for other routes
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/licenses', licensesRouter);
app.use('/api/versions', versionsRouter);
app.use('/api/webhooks', webhooksRouter);

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`License server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
