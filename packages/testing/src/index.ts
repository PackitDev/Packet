export * from './types.js';
export * from './api.js';
export * from './db.js';
export * from './auth.js';
export * from './fixtures.js';

import { createAPITester } from './api.js';
import { createDatabaseTester } from './db.js';
import { createAuthTester } from './auth.js';
import { fixtures } from './fixtures.js';

export const testing = {
  api: createAPITester,
  db: createDatabaseTester,
  auth: createAuthTester,
  fixtures,
};
