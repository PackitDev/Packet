export const LICENSE_CONFIG = {
  API_URL: process.env.PACKET_LICENSE_API || 'https://packet-backend.onrender.com',
  CACHE_DIR: '.packet',
  CACHE_FILE: 'license.json',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  GRACE_PERIOD: 7 * 24 * 60 * 60 * 1000, // 7 days (shorter for security)
  MAX_ACTIVATIONS: 2, // 2 machines max (ultra locked down)
  CURRENT_VERSION: '1.0.0-beta.1',
};
