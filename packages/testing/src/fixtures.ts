export class FixtureManager {
  private fixtures: Map<string, any[]> = new Map();

  register(name: string, data: any[]): void {
    this.fixtures.set(name, data);
  }

  get(name: string): any[] {
    return this.fixtures.get(name) || [];
  }

  getOne(name: string, index: number = 0): any {
    const data = this.get(name);
    return data[index] || null;
  }

  clear(name?: string): void {
    if (name) {
      this.fixtures.delete(name);
    } else {
      this.fixtures.clear();
    }
  }
}

export const fixtures = new FixtureManager();

// Common fixture builders
export function buildUser(overrides: any = {}) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    email: `user${Date.now()}@example.com`,
    name: 'Test User',
    password: 'hashed_password',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function buildPost(overrides: any = {}) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: 'Test Post',
    content: 'This is a test post content',
    authorId: 'test-user-123',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function buildMany<T>(builder: (overrides?: any) => T, count: number, overrides: any = {}): T[] {
  return Array.from({ length: count }, (_, i) => builder({ ...overrides, index: i }));
}
