export * from './types.js';
export * from './model.js';

import type { Schema, Model } from './types.js';
import { createModel } from './model.js';

export const db = {
  model: <T extends Record<string, unknown>>(name: string, schema: Schema): Model<T> => {
    return createModel<T>(name, schema);
  },
};
