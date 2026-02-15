import type { TestApp, TestAppConfig, RequestOptions, TestResponse } from './types.js';

export async function createTestApp(config: TestAppConfig = {}): Promise<TestApp> {
  // Simplified test app for MVP
  return {
    async request(path: string, options: RequestOptions = {}): Promise<TestResponse> {
      // Mock implementation
      return {
        status: 200,
        body: { message: 'Test response' },
        headers: {},
      };
    },

    async cleanup(): Promise<void> {
      // Cleanup resources
    },
  };
}
