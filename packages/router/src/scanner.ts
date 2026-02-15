import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import type { Route } from './types.js';

export async function scanRoutes(dir: string): Promise<Route[]> {
  const routes: Route[] = [];

  async function scan(currentDir: string): Promise<void> {
    const entries = await readdir(currentDir);

    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        await scan(fullPath);
      } else if (entry.endsWith('.ts') || entry.endsWith('.js')) {
        const relativePath = relative(dir, fullPath);
        const routePath = filePathToRoutePath(relativePath);

        try {
          const module = await import(fullPath);

          // Check for HTTP method exports
          for (const method of ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']) {
            if (module[method]) {
              routes.push({
                path: routePath,
                method: method as Route['method'],
                handler: module[method],
              });
            }
          }
        } catch (error) {
          console.warn(`Failed to load route ${fullPath}:`, error);
        }
      }
    }
  }

  await scan(dir);
  return routes;
}

function filePathToRoutePath(filePath: string): string {
  // Convert file path to route path
  // e.g., api/users/[id].ts -> /api/users/:id
  let path = filePath
    .replace(/\\/g, '/')
    .replace(/\.(ts|js)$/, '')
    .replace(/\/index$/, '')
    .replace(/\[([^\]]+)\]/g, ':$1');

  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return path;
}
