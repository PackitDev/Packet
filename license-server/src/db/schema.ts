import { pgTable, text, timestamp, integer, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatar: text('avatar'),
  githubId: text('github_id').unique(),
  githubUsername: text('github_username'),
  stripeCustomerId: text('stripe_customer_id'),
  isEarlyAccessUser: boolean('is_early_access_user').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const licenses = pgTable('licenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),
  version: text('version').notNull(),
  userId: uuid('user_id').references(() => users.id),
  stripePaymentId: text('stripe_payment_id'),
  status: text('status').notNull().default('active'), // 'active' | 'revoked'
  purchasePrice: integer('purchase_price').notNull(),
  isEarlyAccess: boolean('is_early_access').default(false),
  activations: integer('activations').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const versions = pgTable('versions', {
  version: text('version').primaryKey(),
  status: text('status').notNull(), // 'beta' | 'current' | 'supported' | 'free' | 'legacy'
  price: integer('price').notNull(),
  releaseDate: timestamp('release_date').defaultNow(),
  features: jsonb('features').$type<string[]>(),
  changelog: text('changelog'),
});

export const versionAccess = pgTable('version_access', {
  id: uuid('id').primaryKey().defaultRandom(),
  licenseId: uuid('license_id').references(() => licenses.id),
  version: text('version').references(() => versions.version),
  grantedAt: timestamp('granted_at').defaultNow(),
});

export const machineActivations = pgTable('machine_activations', {
  id: uuid('id').primaryKey().defaultRandom(),
  licenseId: uuid('license_id').references(() => licenses.id),
  machineId: text('machine_id').notNull(),
  activatedAt: timestamp('activated_at').defaultNow(),
});
