export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Route {
  path: string;
  filePath: string;
  handlers: Partial<Record<HttpMethod, RouteHandler>>;
  middleware?: RouteHandler[];
}

export type RouteHandler = (req: any, res: any) => Promise<any> | any;

export interface RouterConfig {
  dir: string;
}

export interface Router {
  routes: Route[];
  getRoutes(): Route[];
}
