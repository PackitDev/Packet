-- Add product column to licenses table for Epoxy support
-- Run this migration if you get errors about the 'product' column
ALTER TABLE licenses ADD COLUMN IF NOT EXISTS product text NOT NULL DEFAULT 'packet';
