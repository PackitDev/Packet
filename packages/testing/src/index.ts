export type { TestAppConfig, TestApp } from './types.js';
export { APITester, createAPITester } from './api.js';
export type { RequestOptions, TestResponse } from './api.js';
export { DatabaseTester, createDatabaseTester, createFixture } from './db.js';
export { AuthTester, createAuthTester, createMockUser } from './auth.js';
export { FixtureManager, fixtures, buildUser, buildPost, buildMany } from './fixtures.js';

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
