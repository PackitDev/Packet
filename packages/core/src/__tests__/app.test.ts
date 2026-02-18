import { describe, it, expect } from 'vitest';
import { createApp } from '../app.js';

describe('Packet App', () => {
  it('should create an app with default config', () => {
    const app = createApp();
    expect(app).toBeDefined();
    expect(app.config).toBeDefined();
  });

  it('should merge user config with defaults', () => {
    const app = createApp({
      port: 4000,
      host: 'localhost',
    });
    expect(app.config.port).toBe(4000);
    expect(app.config.host).toBe('localhost');
  });

  it('should have lifecycle methods', () => {
    const app = createApp();
    expect(app.start).toBeDefined();
    expect(app.stop).toBeDefined();
  });
});
