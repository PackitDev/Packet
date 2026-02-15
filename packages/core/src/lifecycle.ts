import { logger } from './logger.js';

export type LifecycleHook = () => Promise<void> | void;

export class LifecycleManager {
  private beforeStartHooks: LifecycleHook[] = [];
  private afterStartHooks: LifecycleHook[] = [];
  private beforeStopHooks: LifecycleHook[] = [];
  private afterStopHooks: LifecycleHook[] = [];

  onBeforeStart(hook: LifecycleHook): void {
    this.beforeStartHooks.push(hook);
  }

  onAfterStart(hook: LifecycleHook): void {
    this.afterStartHooks.push(hook);
  }

  onBeforeStop(hook: LifecycleHook): void {
    this.beforeStopHooks.push(hook);
  }

  onAfterStop(hook: LifecycleHook): void {
    this.afterStopHooks.push(hook);
  }

  async executeBeforeStart(): Promise<void> {
    logger.debug('Executing before start hooks');
    for (const hook of this.beforeStartHooks) {
      await hook();
    }
  }

  async executeAfterStart(): Promise<void> {
    logger.debug('Executing after start hooks');
    for (const hook of this.afterStartHooks) {
      await hook();
    }
  }

  async executeBeforeStop(): Promise<void> {
    logger.debug('Executing before stop hooks');
    for (const hook of this.beforeStopHooks) {
      await hook();
    }
  }

  async executeAfterStop(): Promise<void> {
    logger.debug('Executing after stop hooks');
    for (const hook of this.afterStopHooks) {
      await hook();
    }
  }
}
