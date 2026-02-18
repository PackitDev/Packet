import { DatabaseConnection } from '@packet/db';

export class DatabaseTester {
  private connection: DatabaseConnection;
  private originalData: Map<string, any[]> = new Map();

  constructor(connection: DatabaseConnection) {
    this.connection = connection;
  }

  async startTransaction(): Promise<void> {
    // Begin transaction for test isolation
    if (this.connection.getType() !== 'mongodb') {
      await this.connection.query('BEGIN');
    }
  }

  async rollback(): Promise<void> {
    // Rollback transaction to clean up test data
    if (this.connection.getType() !== 'mongodb') {
      await this.connection.query('ROLLBACK');
    }
  }

  async clearTable(tableName: string): Promise<void> {
    if (this.connection.getType() === 'mongodb') {
      const db = this.connection.getMongoDb();
      await db.collection(tableName).deleteMany({});
    } else {
      await this.connection.query(`DELETE FROM ${tableName}`);
    }
  }

  async seed(tableName: string, data: any[]): Promise<void> {
    // Store original data for cleanup
    this.originalData.set(tableName, data);

    if (this.connection.getType() === 'mongodb') {
      const db = this.connection.getMongoDb();
      await db.collection(tableName).insertMany(data);
    } else {
      for (const row of data) {
        const fields = Object.keys(row);
        const values = Object.values(row);
        const placeholders = values.map((_, i) => 
          this.connection.getType() === 'postgres' ? `$${i + 1}` : '?'
        ).join(', ');
        
        const sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
        await this.connection.query(sql, values);
      }
    }
  }

  async cleanup(): Promise<void> {
    // Clean up all seeded data
    for (const [tableName] of this.originalData) {
      await this.clearTable(tableName);
    }
    this.originalData.clear();
  }
}

export function createDatabaseTester(connection: DatabaseConnection): DatabaseTester {
  return new DatabaseTester(connection);
}

// Test fixtures helper
export function createFixture<T>(defaults: Partial<T>, overrides: Partial<T> = {}): T {
  return { ...defaults, ...overrides } as T;
}
