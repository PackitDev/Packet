export interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'sqlite' | 'mongodb';
  url: string;
}

export interface Model<T = Record<string, unknown>> {
  find(query: Partial<T>): Promise<T[]>;
  findOne(query: Partial<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface FieldDefinition {
  type: 'string' | 'number' | 'boolean' | 'date' | 'uuid';
  primary?: boolean;
  unique?: boolean;
  required?: boolean;
  default?: unknown;
}

export interface Schema {
  [key: string]: FieldDefinition;
}
