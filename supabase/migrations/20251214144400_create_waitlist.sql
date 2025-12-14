-- Waitlist signups table (for landing page)
CREATE TABLE waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  platform TEXT CHECK (platform IN ('ios', 'android', 'web')),
  referral_code TEXT,
  referred_by UUID REFERENCES waitlist_signups(id),
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public INSERT (for waitlist form)
CREATE POLICY "Allow public waitlist signups"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: No public SELECT (privacy-first)
CREATE POLICY "Only authenticated can view waitlist"
  ON waitlist_signups
  FOR SELECT
  TO authenticated
  USING (false);

-- Index for performance
CREATE INDEX idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX idx_waitlist_created ON waitlist_signups(created_at DESC);
