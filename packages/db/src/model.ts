import type { Model } from './types.js';

export function createModel<T extends Record<string, unknown>>(
  name: string,
  _schema: Record<string, unknown>
): Model<T> {
  // Simplified in-memory implementation for MVP
  const store = new Map<string, T>();

  return {
    async find(query: Partial<T>): Promise<T[]> {
      const results: T[] = [];
      for (const item of store.values()) {
        let matches = true;
        for (const [key, value] of Object.entries(query)) {
          if (item[key] !== value) {
            matches = false;
            break;
          }
        }
        if (matches) {
          results.push(item);
        }
      }
      return results;
    },

    async findOne(query: Partial<T>): Promise<T | null> {
      const results = await this.find(query);
      return results[0] || null;
    },

    async findById(id: string): Promise<T | null> {
      return store.get(id) || null;
    },

    async create(data: Partial<T>): Promise<T> {
      const id = Math.random().toString(36).substring(7);
      const item = {
        ...data,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const typedItem = item as T;
      store.set(id, typedItem);
      return typedItem;
    },

    async update(id: string, data: Partial<T>): Promise<T> {
      const existing = store.get(id);
      if (!existing) {
        throw new Error(`${name} with id ${id} not found`);
      }
      const updated = {
        ...existing,
        ...data,
        updatedAt: new Date(),
      } as T;
      store.set(id, updated);
      return updated;
    },

    async delete(id: string): Promise<boolean> {
      return store.delete(id);
    },
  };
}
