export class APITester {
  public app: unknown;
  public baseURL: string;

  constructor(app: unknown, baseURL = 'http://localhost:3000') {
    this.app = app;
    this.baseURL = baseURL;
  }

  async get(path: string, options: RequestOptions = {}): Promise<TestResponse> {
    return this.request('GET', path, options);
  }

  async post(path: string, options: RequestOptions = {}): Promise<TestResponse> {
    return this.request('POST', path, options);
  }

  async put(path: string, options: RequestOptions = {}): Promise<TestResponse> {
    return this.request('PUT', path, options);
  }

  async delete(path: string, options: RequestOptions = {}): Promise<TestResponse> {
    return this.request('DELETE', path, options);
  }

  private async request(_method: string, _path: string, _options: RequestOptions): Promise<TestResponse> {
    // Simplified mock for now - will use supertest in full implementation
    return {
      status: 200,
      headers: {},
      body: null,
      json: () => null,
    };
  }
}

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, string>;
}

export interface TestResponse {
  status: number;
  headers: Record<string, string>;
  body: unknown;
  json(): unknown;
}

export function createAPITester(app: unknown): APITester {
  return new APITester(app);
}
