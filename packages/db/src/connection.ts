import { Pool as PgPool } from 'pg';
import mysql from 'mysql2/promise';
import Database from 'better-sqlite3';
import { MongoClient, Db } from 'mongodb';

export type DatabaseType = 'postgres' | 'mysql' | 'sqlite' | 'mongodb';

export interface ConnectionConfig {
  type: DatabaseType;
  url: string;
}

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private config: ConnectionConfig;
  private pgPool?: PgPool;
  private mysqlPool?: mysql.Pool;
  private sqliteDb?: Database.Database;
  private mongoClient?: MongoClient;
  private mongoDb?: Db;

  private constructor(config: ConnectionConfig) {
    this.config = config;
  }

  static getInstance(config?: ConnectionConfig): DatabaseConnection {
    if (!DatabaseConnection.instance && config) {
      DatabaseConnection.instance = new DatabaseConnection(config);
    }
    return DatabaseConnection.instance;
  }

  async connect(): Promise<void> {
    switch (this.config.type) {
      case 'postgres':
        this.pgPool = new PgPool({ connectionString: this.config.url });
        await this.pgPool.query('SELECT 1'); // Test connection
        break;

      case 'mysql':
        this.mysqlPool = mysql.createPool(this.config.url);
        await this.mysqlPool.query('SELECT 1'); // Test connection
        break;

      case 'sqlite':
        this.sqliteDb = new Database(this.config.url.replace('file:', ''));
        break;

      case 'mongodb':
        this.mongoClient = new MongoClient(this.config.url);
        await this.mongoClient.connect();
        const dbName = new URL(this.config.url).pathname.slice(1);
        this.mongoDb = this.mongoClient.db(dbName || 'test');
        break;

      default:
        throw new Error(`Unsupported database type: ${this.config.type}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.pgPool) {
      await this.pgPool.end();
    }
    if (this.mysqlPool) {
      await this.mysqlPool.end();
    }
    if (this.sqliteDb) {
      this.sqliteDb.close();
    }
    if (this.mongoClient) {
      await this.mongoClient.close();
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    switch (this.config.type) {
      case 'postgres':
        if (!this.pgPool) throw new Error('PostgreSQL not connected');
        const pgResult = await this.pgPool.query(sql, params);
        return pgResult.rows;

      case 'mysql':
        if (!this.mysqlPool) throw new Error('MySQL not connected');
        const [mysqlRows] = await this.mysqlPool.query(sql, params);
        return mysqlRows;

      case 'sqlite':
        if (!this.sqliteDb) throw new Error('SQLite not connected');
        if (sql.trim().toUpperCase().startsWith('SELECT')) {
          return this.sqliteDb.prepare(sql).all(...params);
        } else {
          return this.sqliteDb.prepare(sql).run(...params);
        }

      default:
        throw new Error(`Query not supported for ${this.config.type}`);
    }
  }

  getMongoDb(): Db {
    if (!this.mongoDb) throw new Error('MongoDB not connected');
    return this.mongoDb;
  }

  getType(): DatabaseType {
    return this.config.type;
  }
}

export async function initializeDatabase(config: ConnectionConfig): Promise<DatabaseConnection> {
  const connection = DatabaseConnection.getInstance(config);
  await connection.connect();
  return connection;
}
