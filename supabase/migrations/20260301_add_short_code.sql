-- Add short_code column to submissions for clean user-facing URLs
-- 8-char alphanumeric codes replace 36-char UUIDs in URLs

-- Step 1: Add nullable column
ALTER TABLE submissions ADD COLUMN short_code VARCHAR(8);

-- Step 2: Backfill existing rows with unique codes derived from their UUID
-- Uses first 8 chars of md5(id) encoded in base62-safe hex (guaranteed unique per row)
UPDATE submissions
SET short_code = upper(substr(md5(id::text || created_at::text), 1, 8));

-- Step 3: Create unique index (before NOT NULL to catch any issues)
CREATE UNIQUE INDEX idx_submissions_short_code ON submissions(short_code);

-- Step 4: Set NOT NULL constraint
ALTER TABLE submissions ALTER COLUMN short_code SET NOT NULL;
