import { checkVersion } from '@effec-t/license';
import { loadConfig, validateConfig } from './config.js';
import { logger } from './logger.js';
import { LifecycleManager } from './lifecycle.js';
import type { EffecTConfig, EffecTApp } from './types.js';

export class EffecT implements EffecTApp {
  public config: EffecTConfig;
  private lifecycle: LifecycleManager;
  private server: unknown = null;
  private isRunning = false;

  constructor(userConfig: Partial<EffecTConfig> = {}) {
    this.config = loadConfig(userConfig);
    this.lifecycle = new LifecycleManager();

    // Validate configuration
    validateConfig(this.config);
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Application is already running');
      return;
    }

    try {
      logger.info('Starting Effec-t application...');

      // Check license
      await this.checkLicense();

      // Execute before start hooks
      await this.lifecycle.executeBeforeStart();

      // Start the server (placeholder - will be implemented with router)
      logger.info(`Server would start on ${this.config.host}:${this.config.port}`);
      this.isRunning = true;

      // Execute after start hooks
      await this.lifecycle.executeAfterStart();

      logger.info('✓ Effec-t application started successfully');
    } catch (error) {
      logger.error('Failed to start application:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) {
      logger.warn('Application is not running');
      return;
    }

    try {
      logger.info('Stopping Effec-t application...');

      // Execute before stop hooks
      await this.lifecycle.executeBeforeStop();

      // Stop the server
      this.isRunning = false;

      // Execute after stop hooks
      await this.lifecycle.executeAfterStop();

      logger.info('✓ Effec-t application stopped successfully');
    } catch (error) {
      logger.error('Failed to stop application:', error);
      throw error;
    }
  }

  getServer(): unknown {
    return this.server;
  }

  getLifecycle(): LifecycleManager {
    return this.lifecycle;
  }

  private async checkLicense(): Promise<void> {
    try {
      const version = await checkVersion();

      if (version.status === 'upgrade_available') {
        logger.warn(`New version available: ${version.latest}`);
        logger.warn('Upgrade at: https://effec-t.dev/upgrade');
      } else if (version.status === 'free') {
        logger.info(`Using Effec-t v${version.version} (Free)`);
      } else if (version.status === 'licensed') {
        logger.info(`Using Effec-t v${version.version} (Licensed)`);
      }
    } catch (error) {
      // License check is optional - continue without it
      logger.debug('License check failed:', error);
    }
  }
}

export function createApp(config?: Partial<EffecTConfig>): EffecTApp {
  return new EffecT(config);
}
