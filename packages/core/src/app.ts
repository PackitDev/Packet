import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Server } from 'http';
import { checkVersion } from '@packet/license';
import { createRouter, type HttpMethod } from '@packet/router';
import { loadConfig, validateConfig } from './config.js';
import { logger } from './logger.js';
import { LifecycleManager } from './lifecycle.js';
import type { PacketConfig, PacketApp } from './types.js';

export class Packet implements PacketApp {
  public config: PacketConfig;
  private lifecycle: LifecycleManager;
  private app: Express;
  private server: Server | null = null;
  private isRunning = false;

  constructor(userConfig: Partial<PacketConfig> = {}) {
    this.config = loadConfig(userConfig);
    this.lifecycle = new LifecycleManager();
    this.app = express();

    // Validate configuration
    validateConfig(this.config);

    // Setup middleware
    this.setupMiddleware();
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    }));

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Custom middleware from config
    if (this.config.middleware) {
      this.config.middleware.forEach((mw) => {
        this.app.use(mw as any);
      });
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Application is already running');
      return;
    }

    try {
      logger.info('Starting Packet application...');

      // Check license
      await this.checkLicense();

      // Execute before start hooks
      await this.lifecycle.executeBeforeStart();

      // Setup routes
      await this.setupRoutes();

      // Error handling middleware
      this.setupErrorHandling();

      // Start HTTP server
      const port = this.config.port || 3000;
      const host = this.config.host || '0.0.0.0';

      await new Promise<void>((resolve, reject) => {
        this.server = this.app.listen(port, host, () => {
          this.isRunning = true;
          logger.info(`✓ Server running on http://${host}:${port}`);
          resolve();
        });

        this.server.on('error', reject);
      });

      // Execute after start hooks
      await this.lifecycle.executeAfterStart();

      logger.info('✓ Packet application started successfully');
    } catch (error) {
      logger.error('Failed to start application:', error);
      throw error;
    }
  }

  private async setupRoutes(): Promise<void> {
    const routesDir = this.config.routes?.dir || './routes';
    
    try {
      const router = await createRouter({ dir: routesDir });
      
      // Register all routes
      for (const route of router.routes) {
        const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        
        for (const method of methods) {
          if (route.handlers[method]) {
            const handler = route.handlers[method]!;
            const expressMethod = method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
            
            this.app[expressMethod](route.path, this.wrapHandler(handler));
            
            logger.debug(`  Route: ${method} ${route.path}`);
          }
        }
      }

      logger.info(`✓ Loaded ${router.routes.length} route(s)`);
    } catch (error) {
      logger.warn('No routes directory found or error loading routes:', error);
    }
  }

  private wrapHandler(handler: Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await handler(req, res);
        
        // If handler didn't send response, send the result
        if (!res.headersSent) {
          if (result !== undefined) {
            res.json(result);
          } else {
            res.status(204).end();
          }
        }
      } catch (error) {
        next(error);
      }
    };
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`,
      });
    });

    // Error handler
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      logger.error('Request error:', err);
      
      res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      });
    });
  }

  async stop(): Promise<void> {
    if (!this.isRunning) {
      logger.warn('Application is not running');
      return;
    }

    try {
      logger.info('Stopping Packet application...');

      // Execute before stop hooks
      await this.lifecycle.executeBeforeStop();

      // Stop the HTTP server
      if (this.server) {
        await new Promise<void>((resolve, reject) => {
          this.server!.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }

      this.isRunning = false;

      // Execute after stop hooks
      await this.lifecycle.executeAfterStop();

      logger.info('✓ Packet application stopped successfully');
    } catch (error) {
      logger.error('Failed to stop application:', error);
      throw error;
    }
  }

  getServer(): Express {
    return this.app;
  }

  getHttpServer(): Server | null {
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
        logger.warn('Upgrade at: https://packet-site.vercel.app/pricing');
      } else if (version.status === 'free') {
        logger.info(`Using Packet v${version.version} (Free)`);
      } else if (version.status === 'licensed') {
        logger.info(`Using Packet v${version.version} (Licensed)`);
      }
    } catch (error) {
      // License check is optional - continue without it
      logger.debug('License check failed:', error);
    }
  }
}

export function createApp(config?: Partial<PacketConfig>): PacketApp {
  return new Packet(config);
}
