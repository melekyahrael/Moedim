-- Feast content table (static, seeded data)
CREATE TABLE feast_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  hebrew_name TEXT,
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  start_day INTEGER NOT NULL CHECK (start_day BETWEEN 1 AND 31),
  duration INTEGER DEFAULT 1,
  category TEXT CHECK (category IN ('spring', 'summer', 'fall')),
  scripture_refs JSONB,
  description TEXT,
  observance_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Torah portions table (static, seeded data)
CREATE TABLE torah_portions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number INTEGER UNIQUE NOT NULL CHECK (number BETWEEN 1 AND 54),
  name TEXT NOT NULL,
  hebrew TEXT,
  torah_reading TEXT NOT NULL,
  haftarah TEXT,
  brit_chadasha TEXT,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- These tables are read-only for users (no RLS needed - public read)
-- Only admins can modify via backend

-- Indexes for performance
CREATE INDEX idx_feast_month ON feast_content(month, start_day);
CREATE INDEX idx_feast_code ON feast_content(code);
CREATE INDEX idx_portion_number ON torah_portions(number);
