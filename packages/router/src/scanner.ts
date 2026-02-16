import { readdir, stat } from 'fs/promises';
import { join, relative, resolve } from 'path';
import { pathToFileURL } from 'url';
import type { Route, HttpMethod } from './types.js';

export async function scanRoutes(dir: string): Promise<Route[]> {
  const routes: Route[] = [];
  const absoluteDir = resolve(dir);

  async function scan(currentDir: string): Promise<void> {
    try {
      const entries = await readdir(currentDir);

      for (const entry of entries) {
        const fullPath = join(currentDir, entry);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
          await scan(fullPath);
        } else if (entry.endsWith('.ts') || entry.endsWith('.js')) {
          const relativePath = relative(absoluteDir, fullPath);
          const routePath = filePathToRoutePath(relativePath);

          try {
            // Use file URL for proper ESM import
            const fileUrl = pathToFileURL(fullPath).href;
            const module = await import(fileUrl);

            const handlers: Partial<Record<HttpMethod, any>> = {};
            const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

            // Check for HTTP method exports
            for (const method of methods) {
              if (module[method] && typeof module[method] === 'function') {
                handlers[method] = module[method];
              }
            }

            // Only add route if it has at least one handler
            if (Object.keys(handlers).length > 0) {
              const route: Route = {
                path: routePath,
                filePath: fullPath,
                handlers,
              };

              // Check for middleware export
              if (module.middleware && Array.isArray(module.middleware)) {
                route.middleware = module.middleware;
              }

              routes.push(route);
            }
          } catch (error) {
            console.warn(`Failed to load route ${fullPath}:`, error);
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
      throw error;
    }
  }

  await scan(absoluteDir);
  return routes;
}

function filePathToRoutePath(filePath: string): string {
  // Convert file path to route path
  // Examples:
  //   api/users.ts -> /api/users
  //   api/users/[id].ts -> /api/users/:id
  //   api/[...slug].ts -> /api/*
  //   api/index.ts -> /api
  //   index.ts -> /

  let path = filePath
    .replace(/\\/g, '/')
    .replace(/\.(ts|js)$/, '')
    .replace(/\/index$/, '')
    .replace(/\[\.\.\.([^\]]+)\]/g, '*') // [...slug] -> *
    .replace(/\[([^\]]+)\]/g, ':$1'); // [id] -> :id

  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // Handle root index
  if (path === '/') {
    return '/';
  }

  return path;
}
