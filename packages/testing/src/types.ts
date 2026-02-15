export interface TestAppConfig {
  auth?: unknown;
  database?: unknown;
}

export interface TestApp {
  request(path: string, options?: RequestOptions): Promise<TestResponse>;
  cleanup(): Promise<void>;
}

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface TestResponse {
  status: number;
  body: unknown;
  headers: Record<string, string>;
}
