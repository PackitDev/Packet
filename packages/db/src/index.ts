export * from './types.js';
export * from './model.js';
export * from './connection.js';
export * from './query-builder.js';

import type { Schema, Model } from './types.js';
import { createModel } from './model.js';
import { initializeDatabase, DatabaseConnection } from './connection.js';

export const db = {
  model: <T extends Record<string, unknown>>(name: string, schema: Schema): Model<T> => {
    return createModel<T>(name, schema);
  },
  
  connect: initializeDatabase,
  
  getConnection: () => DatabaseConnection.getInstance(),
};
