import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';
import { LICENSE_CONFIG } from './config.js';
import type { LicenseCache, LicenseInfo, VersionInfo } from './types.js';

const getCachePath = (): string => {
  return join(homedir(), LICENSE_CONFIG.CACHE_DIR, LICENSE_CONFIG.CACHE_FILE);
};

export async function getCachedLicense(): Promise<LicenseCache | null> {
  try {
    const cachePath = getCachePath();
    const data = await readFile(cachePath, 'utf-8');
    const cache: LicenseCache = JSON.parse(data);

    // Check if cache is still valid
    if (Date.now() < cache.expiresAt) {
      return cache;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function setCachedLicense(
  key: string,
  license: LicenseInfo,
  version: VersionInfo
): Promise<void> {
  try {
    const cacheDir = join(homedir(), LICENSE_CONFIG.CACHE_DIR);
    await mkdir(cacheDir, { recursive: true });

    const cache: LicenseCache = {
      key,
      license,
      version,
      cachedAt: Date.now(),
      expiresAt: Date.now() + LICENSE_CONFIG.CACHE_DURATION,
    };

    const cachePath = getCachePath();
    await writeFile(cachePath, JSON.stringify(cache, null, 2));
  } catch (error) {
    // Silently fail - caching is optional
    console.warn('Failed to cache license:', error);
  }
}

export async function clearCachedLicense(): Promise<void> {
  try {
    const cachePath = getCachePath();
    await writeFile(cachePath, '{}');
  } catch (error) {
    // Silently fail
  }
}
