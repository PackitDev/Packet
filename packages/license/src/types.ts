export interface LicenseInfo {
  key: string;
  version: string;
  status: 'free' | 'licensed' | 'expired' | 'invalid';
  isEarlyAccess: boolean;
  activations: number;
  maxActivations: number;
  expiresAt?: Date;
}

export interface VersionInfo {
  version: string;
  status: 'beta' | 'current' | 'supported' | 'free' | 'legacy';
  price: number;
  features: string[];
  releaseDate: Date;
}

export interface LicenseValidationResponse {
  valid: boolean;
  license?: LicenseInfo;
  version?: VersionInfo;
  error?: string;
}

export interface LicenseActivationRequest {
  key: string;
  machineId: string;
  version: string;
}

export interface LicenseActivationResponse {
  success: boolean;
  license?: LicenseInfo;
  error?: string;
}

export interface LicenseCache {
  key: string;
  license: LicenseInfo;
  version: VersionInfo;
  cachedAt: number;
  expiresAt: number;
}
