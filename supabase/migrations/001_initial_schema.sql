-- 001_initial_schema.sql
-- CODE: ABUNDANCE diagnostic funnel - initial database schema

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(50),
  locale VARCHAR(5) DEFAULT 'bg',
  scores JSONB NOT NULL DEFAULT '{"finances": 0, "business": 0, "health": 0, "mental": 0, "romantic": 0, "social": 0, "mission": 0}',
  priority_top3 TEXT[],
  goals JSONB,
  birth_date DATE,
  birth_time TIME,
  birth_time_unknown BOOLEAN DEFAULT false,
  birth_city VARCHAR(255),
  birth_country VARCHAR(255),
  commitment_level VARCHAR(50),
  income_level VARCHAR(50),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  referral_code VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  analysis_result JSONB,
  pdf_url TEXT,
  email_sent BOOLEAN DEFAULT false,
  tier VARCHAR(50) DEFAULT 'free',
  payment_status VARCHAR(50),
  stripe_session_id VARCHAR(255),
  gdpr_consent BOOLEAN DEFAULT false,
  gdpr_consent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  email_type VARCHAR(100),
  locale VARCHAR(5) DEFAULT 'bg',
  sent_at TIMESTAMP DEFAULT NOW(),
  opened BOOLEAN DEFAULT false,
  clicked BOOLEAN DEFAULT false
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  tier VARCHAR(50) NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  stripe_session_id VARCHAR(255),
  stripe_payment_intent VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_submissions_user_email ON submissions(user_email);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Service role has full access to all tables
CREATE POLICY "Service role full access on submissions"
  ON submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on email_logs"
  ON email_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on payments"
  ON payments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
