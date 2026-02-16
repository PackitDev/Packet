import { DatabaseConnection } from './connection.js';

export class QueryBuilder<T> {
  private tableName: string;
  private connection: DatabaseConnection;
  private whereConditions: string[] = [];
  private whereParams: any[] = [];
  private orderByClause?: string;
  private limitValue?: number;
  private offsetValue?: number;

  constructor(tableName: string, connection: DatabaseConnection) {
    this.tableName = tableName;
    this.connection = connection;
  }

  where(field: keyof T | string, operator: string, value: any): this {
    const paramIndex = this.whereParams.length + 1;
    const placeholder = this.getPlaceholder(paramIndex);
    this.whereConditions.push(`${String(field)} ${operator} ${placeholder}`);
    this.whereParams.push(value);
    return this;
  }

  orderBy(field: keyof T | string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByClause = `ORDER BY ${String(field)} ${direction}`;
    return this;
  }

  limit(count: number): this {
    this.limitValue = count;
    return this;
  }

  offset(count: number): this {
    this.offsetValue = count;
    return this;
  }

  private getPlaceholder(index: number): string {
    const type = this.connection.getType();
    if (type === 'postgres') return `$${index}`;
    if (type === 'mysql' || type === 'sqlite') return '?';
    return '?';
  }

  private buildWhereClause(): string {
    if (this.whereConditions.length === 0) return '';
    return `WHERE ${this.whereConditions.join(' AND ')}`;
  }

  async findAll(): Promise<T[]> {
    const whereClause = this.buildWhereClause();
    const orderBy = this.orderByClause || '';
    const limit = this.limitValue ? `LIMIT ${this.limitValue}` : '';
    const offset = this.offsetValue ? `OFFSET ${this.offsetValue}` : '';

    const sql = `SELECT * FROM ${this.tableName} ${whereClause} ${orderBy} ${limit} ${offset}`.trim();
    return await this.connection.query(sql, this.whereParams);
  }

  async findOne(): Promise<T | null> {
    this.limit(1);
    const results = await this.findAll();
    return results[0] || null;
  }

  async count(): Promise<number> {
    const whereClause = this.buildWhereClause();
    const sql = `SELECT COUNT(*) as count FROM ${this.tableName} ${whereClause}`.trim();
    const result = await this.connection.query(sql, this.whereParams);
    return result[0].count;
  }
}
