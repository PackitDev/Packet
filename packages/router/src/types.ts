export interface Route {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  handler: (req: Request, context: RouteContext) => Promise<unknown>;
}

export interface RouteContext {
  params: Record<string, string>;
  query: Record<string, string>;
}

export interface RouterConfig {
  dir: string;
}
