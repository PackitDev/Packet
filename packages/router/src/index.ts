export * from './types.js';
export * from './scanner.js';

import type { RouterConfig } from './types.js';
import { scanRoutes } from './scanner.js';

export async function createRouter(config: RouterConfig) {
  const routes = await scanRoutes(config.dir);

  return {
    routes,
    getRoutes: () => routes,
  };
}
