import { createApp, Request, Response } from '@effect/core';
import { cors, json, logger } from '@effect/middleware';

const app = createApp({ port: 3000 });

// Global middlewares
app.use(cors());
app.use(json());
app.use(logger());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from effec-t!' });
});

app.listen(() => {
  console.log('Server running on http://localhost:3000');
});
