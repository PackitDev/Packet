export interface FieldDefinition {
  type: 'string' | 'number' | 'boolean' | 'date' | 'json' | 'uuid';
  primary?: boolean;
  unique?: boolean;
  required?: boolean;
  default?: unknown;
}

export interface Schema {
  [key: string]: FieldDefinition;
}

export type ModelData<T> = Omit<T, 'id' | '_id'>;

export interface Model<T = Record<string, unknown>> {
  name: string;
  schema: Schema;
  tableName: string;
  findAll(): Promise<T[]>;
  findOne(query: Partial<T>): Promise<T | null>;
  findById(id: string | number): Promise<T | null>;
  create(data: ModelData<T>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
  where(field: keyof T, operator: string, value: any): any;
  query(): any;
}
