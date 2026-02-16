import type { Express } from 'express';

export class APITester {
  private app: Express;
  private baseURL: string;

  constructor(app: Express, baseURL: string = 'http://localhost:3000') {
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

  private async request(method: string, path: string, options: RequestOptions): Promise<TestResponse> {
    // Mock request/response for testing
    const mockReq: any = {
      method,
      path,
      url: path,
      headers: options.headers || {},
      body: options.body,
      query: options.query || {},
      params: {},
    };

    const mockRes: any = {
      statusCode: 200,
      headers: {},
      body: null,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(data: any) {
        this.body = data;
        return this;
      },
      send(data: any) {
        this.body = data;
        return this;
      },
      setHeader(key: string, value: string) {
        this.headers[key] = value;
        return this;
      },
    };

    // Find matching route in Express app
    // This is a simplified version - real implementation would need to match routes properly
    
    return {
      status: mockRes.statusCode,
      headers: mockRes.headers,
      body: mockRes.body,
      json: () => mockRes.body,
    };
  }
}

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, string>;
}

export interface TestResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
  json(): any;
}

export function createAPITester(app: Express): APITester {
  return new APITester(app);
}
