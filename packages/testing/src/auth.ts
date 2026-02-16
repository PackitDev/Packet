import { createToken, JWTPayload, JWTConfig } from '@effec-t/auth';

export class AuthTester {
  private config: JWTConfig;

  constructor(config: JWTConfig) {
    this.config = config;
  }

  createTestToken(payload: Partial<JWTPayload> = {}): string {
    const defaultPayload: JWTPayload = {
      userId: 'test-user-123',
      email: 'test@example.com',
      role: 'user',
      ...payload,
    };

    return createToken(defaultPayload, this.config);
  }

  createAdminToken(payload: Partial<JWTPayload> = {}): string {
    return this.createTestToken({
      ...payload,
      role: 'admin',
    });
  }

  createExpiredToken(payload: Partial<JWTPayload> = {}): string {
    const expiredConfig: JWTConfig = {
      ...this.config,
      expiresIn: '-1s', // Already expired
    };

    const defaultPayload: JWTPayload = {
      userId: 'test-user-123',
      email: 'test@example.com',
      ...payload,
    };

    return createToken(defaultPayload, expiredConfig);
  }

  getAuthHeader(token?: string): Record<string, string> {
    const testToken = token || this.createTestToken();
    return {
      Authorization: `Bearer ${testToken}`,
    };
  }
}

export function createAuthTester(secret: string = 'test-secret'): AuthTester {
  return new AuthTester({ secret });
}

// Mock user factory
export function createMockUser(overrides: any = {}) {
  return {
    id: 'test-user-123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}
