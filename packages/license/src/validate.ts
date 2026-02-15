import fetch from 'node-fetch';
import { LICENSE_CONFIG } from './config.js';
import { getCachedLicense, setCachedLicense, clearCachedLicense } from './cache.js';
import { getMachineId } from './machine.js';
import type {
  LicenseValidationResponse,
  LicenseActivationRequest,
  LicenseActivationResponse,
  LicenseInfo,
  VersionInfo,
} from './types.js';

export async function validateLicense(
  key: string,
  skipCache = false
): Promise<LicenseValidationResponse> {
  // Check cache first
  if (!skipCache) {
    const cached = await getCachedLicense();
    if (cached && cached.key === key) {
      return {
        valid: true,
        license: cached.license,
        version: cached.version,
      };
    }
  }

  try {
    const response = await fetch(`${LICENSE_CONFIG.API_URL}/api/licenses/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        version: LICENSE_CONFIG.CURRENT_VERSION,
      }),
    });

    if (!response.ok) {
      return {
        valid: false,
        error: `License validation failed: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as LicenseValidationResponse;

    // Cache the result if valid
    if (data.valid && data.license && data.version) {
      await setCachedLicense(key, data.license, data.version);
    }

    return data;
  } catch (error) {
    // If offline, check cache with grace period
    const cached = await getCachedLicense();
    if (cached && cached.key === key) {
      const gracePeriodEnd = cached.cachedAt + LICENSE_CONFIG.GRACE_PERIOD;
      if (Date.now() < gracePeriodEnd) {
        return {
          valid: true,
          license: cached.license,
          version: cached.version,
        };
      }
    }

    return {
      valid: false,
      error: `License validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

export async function activateLicense(key: string): Promise<LicenseActivationResponse> {
  try {
    const machineId = getMachineId();

    const request: LicenseActivationRequest = {
      key,
      machineId,
      version: LICENSE_CONFIG.CURRENT_VERSION,
    };

    const response = await fetch(`${LICENSE_CONFIG.API_URL}/api/licenses/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        success: false,
        error: `License activation failed: ${error}`,
      };
    }

    const data = (await response.json()) as LicenseActivationResponse;

    // Cache the activated license
    if (data.success && data.license) {
      const versionResponse = await fetch(
        `${LICENSE_CONFIG.API_URL}/api/versions/${LICENSE_CONFIG.CURRENT_VERSION}`
      );
      if (versionResponse.ok) {
        const version = (await versionResponse.json()) as VersionInfo;
        await setCachedLicense(key, data.license, version);
      }
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: `License activation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

export async function deactivateLicense(): Promise<void> {
  await clearCachedLicense();
}

export async function checkVersion(): Promise<{
  version: string;
  status: 'free' | 'licensed' | 'upgrade_available';
  latest?: string;
  hasFeature: (feature: string) => Promise<boolean>;
}> {
  const cached = await getCachedLicense();

  if (cached && cached.license.status === 'licensed') {
    return {
      version: cached.version.version,
      status: 'licensed',
      hasFeature: async (feature: string) => {
        return cached.version.features.includes(feature);
      },
    };
  }

  // Check if current version is free
  try {
    const response = await fetch(
      `${LICENSE_CONFIG.API_URL}/api/versions/${LICENSE_CONFIG.CURRENT_VERSION}/status`
    );
    if (response.ok) {
      const data = (await response.json()) as { status: string; features: string[] };
      if (data.status === 'free') {
        return {
          version: LICENSE_CONFIG.CURRENT_VERSION,
          status: 'free',
          hasFeature: async (feature: string) => {
            return data.features.includes(feature);
          },
        };
      }
    }
  } catch (error) {
    // Offline - assume free version
    return {
      version: LICENSE_CONFIG.CURRENT_VERSION,
      status: 'free',
      hasFeature: async () => true,
    };
  }

  // Check for newer versions
  try {
    const response = await fetch(`${LICENSE_CONFIG.API_URL}/api/versions/current`);
    if (response.ok) {
      const data = (await response.json()) as { version: string };
      return {
        version: LICENSE_CONFIG.CURRENT_VERSION,
        status: 'upgrade_available',
        latest: data.version,
        hasFeature: async () => false,
      };
    }
  } catch (error) {
    // Ignore
  }

  return {
    version: LICENSE_CONFIG.CURRENT_VERSION,
    status: 'free',
    hasFeature: async () => true,
  };
}
