import { describe, it, expect } from 'vitest';
import { getCachedLicense } from '../cache.js';

describe('License Validation', () => {
  it('should return null for non-existent cache', async () => {
    const cached = await getCachedLicense();
    expect(cached).toBeNull();
  });
});
