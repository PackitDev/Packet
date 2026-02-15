export const LICENSE_CONFIG = {
  API_URL: process.env.EFFEC_T_LICENSE_API || 'https://api.effec-t.dev',
  CACHE_DIR: '.effec-t',
  CACHE_FILE: 'license.json',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  GRACE_PERIOD: 30 * 24 * 60 * 60 * 1000, // 30 days
  MAX_ACTIVATIONS: 3,
  CURRENT_VERSION: '1.0.0-beta.1',
};
