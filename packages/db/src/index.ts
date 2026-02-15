export * from './types.js';
export * from './model.js';

import type { DatabaseConfig, Schema, Model } from './types.js';
import { createModel } from './model.js';

export function db(config: DatabaseConfig) {
  return {
    model: <T extends Record<string, unknown>>(name: string, schema: Schema): Model<T> => {
      return createModel<T>(name, schema);
    },
  };
}
