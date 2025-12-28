
-- Habits for Good - Initial Database Schema
-- Version: 001
-- Description: Core tables for MVP

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

-- Base users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'admin', 'sponsor', 'cause')),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students (kids 5-8)
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  display_name VARCHAR(100) NOT NULL,
  age INTEGER CHECK (age >= 5 AND age <= 8),
  avatar_url VARCHAR(500),
  parent_email VARCHAR(255) NOT NULL,
  anonymous_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins (teachers/guides/campaign managers)
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  role_title VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sponsors (parents/organizations)
CREATE TABLE sponsors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  total_donated DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Causes (charitable organizations)
CREATE TABLE causes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  org_name VARCHAR(255) NOT NULL,
  ein VARCHAR(20),
  mission TEXT,
  logo_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- CAMPAIGNS
-- ============================================

-- Campaigns
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  cause_id INTEGER REFERENCES causes(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_tags TEXT[] DEFAULT '{}',
  goal_amount DECIMAL(10,2),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'ended', 'completed', 'paused')),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaign Habits (custom habits per campaign)
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(100) DEFAULT 'star',
  frequency VARCHAR(20) DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly')),
  disclaimer TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ENROLLMENTS & SUBMISSIONS
-- ============================================

-- Student enrollments in campaigns
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, campaign_id)
);

-- Daily habit submissions
CREATE TABLE habit_submissions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  submission_date DATE NOT NULL,
  rating VARCHAR(20) CHECK (rating IN ('great', 'good', 'okay', 'hard')),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, campaign_id, submission_date)
);

-- ============================================
-- POINTS & STREAKS
-- ============================================

-- Streak tracking
CREATE TABLE streaks (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_submission_date DATE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, campaign_id)
);

-- Points ledger (append-only for audit trail)
CREATE TABLE points_ledger (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  submission_id INTEGER REFERENCES habit_submissions(id) ON DELETE SET NULL,
  submission_date DATE NOT NULL,
  base_points INTEGER DEFAULT 10,
  streak_multiplier DECIMAL(3,2) DEFAULT 1.00,
  bonus_multiplier DECIMAL(3,2) DEFAULT 1.00,
  total_points INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SPONSORS & PLEDGES
-- ============================================

-- Sponsor pledges to campaigns
CREATE TABLE sponsor_pledges (
  id SERIAL PRIMARY KEY,
  sponsor_id INTEGER REFERENCES sponsors(id) ON DELETE CASCADE,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  rate_per_point DECIMAL(5,3) NOT NULL CHECK (rate_per_point >= 0.01 AND rate_per_point <= 10.00),
  cap_amount DECIMAL(10,2),
  message TEXT,
  ad_image_url VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'cancelled')),
  pledged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sponsor_id, campaign_id)
);

-- Fund distributions (after campaign ends)
CREATE TABLE fund_distributions (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  total_points INTEGER NOT NULL,
  total_pledged DECIMAL(10,2) NOT NULL,
  amount_collected DECIMAL(10,2) DEFAULT 0,
  amount_distributed DECIMAL(10,2) DEFAULT 0,
  rollover_points INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'collecting', 'distributed')),
  distributed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- GAMIFICATION
-- ============================================

-- Badges
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  badge_type VARCHAR(50) NOT NULL CHECK (badge_type IN (
    '7_day_streak', '30_day_streak', '100_day_streak',
    'campaign_completer', 'top_3_finisher', 'generous_heart'
  )),
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE SET NULL,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, badge_type, campaign_id)
);

-- Flash Quests (time-limited bonus challenges)
CREATE TABLE flash_quests (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  bonus_points INTEGER DEFAULT 50,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

-- In-app notifications
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Students
CREATE INDEX idx_students_user_id ON students(user_id);

-- Admins  
CREATE INDEX idx_admins_user_id ON admins(user_id);

-- Sponsors
CREATE INDEX idx_sponsors_user_id ON sponsors(user_id);

-- Campaigns
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_admin_id ON campaigns(admin_id);
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);

-- Habits
CREATE INDEX idx_habits_campaign_id ON habits(campaign_id);

-- Enrollments
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_campaign ON enrollments(campaign_id);

-- Submissions
CREATE INDEX idx_submissions_student ON habit_submissions(student_id);
CREATE INDEX idx_submissions_campaign ON habit_submissions(campaign_id);
CREATE INDEX idx_submissions_date ON habit_submissions(submission_date);

-- Points
CREATE INDEX idx_points_student ON points_ledger(student_id);
CREATE INDEX idx_points_campaign ON points_ledger(campaign_id);
CREATE INDEX idx_points_date ON points_ledger(submission_date);

-- Streaks
CREATE INDEX idx_streaks_student ON streaks(student_id);
CREATE INDEX idx_streaks_campaign ON streaks(campaign_id);

-- Pledges
CREATE INDEX idx_pledges_sponsor ON sponsor_pledges(sponsor_id);
CREATE INDEX idx_pledges_campaign ON sponsor_pledges(campaign_id);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
