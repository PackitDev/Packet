import { DatabaseConnection } from './connection.js';
import { QueryBuilder } from './query-builder.js';
import type { Schema, Model, ModelData } from './types.js';

export function createModel<T extends Record<string, any>>(
  name: string,
  schema: Schema
): Model<T> {
  const tableName = name.toLowerCase() + 's'; // Simple pluralization
  
  return {
    name,
    schema,
    tableName,

    async findAll(): Promise<T[]> {
      const connection = DatabaseConnection.getInstance();
      
      if (connection.getType() === 'mongodb') {
        const db = connection.getMongoDb();
        return await db.collection(tableName).find({}).toArray() as any;
      }
      
      return await connection.query(`SELECT * FROM ${tableName}`);
    },

    async findOne(conditions: Partial<T>): Promise<T | null> {
      const connection = DatabaseConnection.getInstance();
      
      if (connection.getType() === 'mongodb') {
        const db = connection.getMongoDb();
        return await db.collection(tableName).findOne(conditions) as any;
      }
      
      const builder = new QueryBuilder<T>(tableName, connection);
      const entries = Object.entries(conditions);
      
      if (entries.length > 0) {
        const [key, value] = entries[0];
        builder.where(key, '=', value);
      }
      
      return await builder.findOne();
    },

    async findById(id: string | number): Promise<T | null> {
      const connection = DatabaseConnection.getInstance();
      
      if (connection.getType() === 'mongodb') {
        const db = connection.getMongoDb();
        const { ObjectId } = await import('mongodb');
        return await db.collection(tableName).findOne({ _id: new ObjectId(id as string) }) as any;
      }
      
      const builder = new QueryBuilder<T>(tableName, connection);
      builder.where('id', '=', id);
      return await builder.findOne();
    },

    async create(data: ModelData<T>): Promise<T> {
      const connection = DatabaseConnection.getInstance();
      
      if (connection.getType() === 'mongodb') {
        const db = connection.getMongoDb();
        const result = await db.collection(tableName).insertOne(data as any);
        return { ...data, _id: result.insertedId } as any as T;
      }
      
      const fields = Object.keys(data);
      const values = Object.values(data);
      const placeholders = values.map((_, i) => 
        connection.getType() === 'postgres' ? `$${i + 1}` : '?'
      ).join(', ');
      
      const sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
      
      try {
        const result = await connection.query(sql, values);
        return result[0] || data as T;
      } catch (error) {
        // SQLite doesn't support RETURNING, so we query after insert
        if (connection.getType() === 'sqlite') {
          const insertSql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
          await connection.query(insertSql, values);
          const lastId = await connection.query('SELECT last_insert_rowid() as id');
          return await this.findById(lastId[0].id) as T;
        }
        throw error;
      }
    },

    async update(id: string | number, data: Partial<T>): Promise<T | null> {
      const connection = DatabaseConnection.getInstance();
      
      if (connection.getType() === 'mongodb') {
        const db = connection.getMongoDb();
        const { ObjectId } = await import('mongodb');
        await db.collection(tableName).updateOne(
          { _id: new ObjectId(id as string) },
          { $set: data }
        );
        return await this.findById(id);
      }
      
      const fields = Object.keys(data);
      const values = Object.values(data);
      const setClause = fields.map((field, i) => 
        `${field} = ${connection.getType() === 'postgres' ? `$${i + 1}` : '?'}`
      ).join(', ');
      
      const idPlaceholder = connection.getType() === 'postgres' 
        ? `$${values.length + 1}` 
        : '?';
      
      const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ${idPlaceholder}`;
      await connection.query(sql, [...values, id]);
      
      return await this.findById(id);
    },

    async delete(id: string | number): Promise<boolean> {
      const connection = DatabaseConnection.getInstance();
      
      if (connection.getType() === 'mongodb') {
        const db = connection.getMongoDb();
        const { ObjectId } = await import('mongodb');
        const result = await db.collection(tableName).deleteOne({ _id: new ObjectId(id as string) });
        return result.deletedCount > 0;
      }
      
      const placeholder = connection.getType() === 'postgres' ? '$1' : '?';
      const sql = `DELETE FROM ${tableName} WHERE id = ${placeholder}`;
      await connection.query(sql, [id]);
      return true;
    },

    where(field: keyof T, operator: string, value: any): QueryBuilder<T> {
      const connection = DatabaseConnection.getInstance();
      const builder = new QueryBuilder<T>(tableName, connection);
      return builder.where(field, operator, value);
    },

    query(): QueryBuilder<T> {
      const connection = DatabaseConnection.getInstance();
      return new QueryBuilder<T>(tableName, connection);
    },
  };
}
