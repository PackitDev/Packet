import { createApp } from '@effec-t/core';
import { db } from '@effec-t/db';
import config from '../effec-t.config.js';

// Initialize database connection
if (config.database) {
  await db.connect({
    type: config.database.type,
    url: config.database.url,
  });
}

// Create and start the application
const app = createApp(config);

await app.start();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await app.stop();
  await db.getConnection().disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await app.stop();
  await db.getConnection().disconnect();
  process.exit(0);
});
