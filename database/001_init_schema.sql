
-- Habits for Good - Initial Database Schema
-- Version: 001
-- Description: Core tables for MVP with Solo Leveling gamification

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

-- Base users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'admin', 'sponsor', 'cause', 'super-admin')),
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP,
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
  -- Solo Leveling Gamification
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  rank VARCHAR(10) DEFAULT 'E-Rank',
  title VARCHAR(100),
  -- Penalty System
  penalty_count INTEGER DEFAULT 0,
  active_penalty BOOLEAN DEFAULT FALSE,
  penalty_due_date DATE,
  -- Location
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'USA',
  region VARCHAR(100),
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
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'USA',
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
  -- Solo Leveling Gamification
  difficulty_level VARCHAR(20) DEFAULT 'E-Rank',
  xp_reward INTEGER DEFAULT 10,
  -- Location
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'USA',
  region VARCHAR(100),
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
  -- AI XP Assessment Fields
  effort_level VARCHAR(20) DEFAULT 'medium' CHECK (effort_level IN ('low', 'medium', 'high', 'extreme')),
  base_xp INTEGER DEFAULT 10,
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
  xp_earned INTEGER DEFAULT 0,
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
    'campaign_completer', 'top_3_finisher', 'generous_heart',
    'first_blood', 'daily_quest_master', 'penalty_survivor',
    'rank_up_d', 'rank_up_c', 'rank_up_b', 'rank_up_a', 'rank_up_s'
  )),
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE SET NULL,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, badge_type, campaign_id)
);

-- Titles (Solo Leveling style earned titles)
CREATE TABLE titles (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  title_name VARCHAR(100) NOT NULL,
  title_description TEXT,
  rarity VARCHAR(20) DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  equipped BOOLEAN DEFAULT FALSE,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, title_name)
);

-- Random Box Rewards
CREATE TABLE random_boxes (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  box_type VARCHAR(50) NOT NULL CHECK (box_type IN ('daily_quest', 'streak_milestone', 'rank_up', 'special')),
  reward_type VARCHAR(50) NOT NULL CHECK (reward_type IN ('xp_boost', 'badge', 'title', 'points')),
  reward_value JSONB NOT NULL,
  opened BOOLEAN DEFAULT FALSE,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  opened_at TIMESTAMP
);

-- Penalty Quests
CREATE TABLE penalty_quests (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  required_action VARCHAR(255) NOT NULL,
  due_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Email notification logs
CREATE TABLE notification_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SECURITY & AUDIT
-- ============================================

-- Audit logs for admin actions
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INTEGER,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- VIRAL GROWTH
-- ============================================

-- Referral system
CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  referred_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  referral_code VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  bonus_xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  UNIQUE(referred_id)
);

-- Share tracking
CREATE TABLE share_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  share_type VARCHAR(50) NOT NULL CHECK (share_type IN ('achievement', 'leaderboard', 'campaign', 'invite')),
  platform VARCHAR(50),
  shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Students
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_rank ON students(rank);
CREATE INDEX idx_students_xp ON students(xp);

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

-- Audit logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- Referrals
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX idx_referrals_code ON referrals(referral_code);

-- ============================================
-- GAMIFICATION: SOLO LEVELING SYSTEM
-- ============================================

-- Daily Quests (Complete all habits in a day to get bonus)
CREATE TABLE daily_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  quest_date DATE NOT NULL,
  total_habits INTEGER NOT NULL,
  completed_habits INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'FAILED', 'PENALTY_ISSUED')),
  bonus_xp INTEGER DEFAULT 0,
  bonus_points INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  deadline TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Penalty Quests (Issued when daily quests are failed)
CREATE TABLE penalty_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('MISSED_DAILY_QUEST', 'STREAK_BREAK', 'INCOMPLETE_CHALLENGE')),
  description TEXT NOT NULL,
  penalty_task TEXT NOT NULL,
  xp_penalty INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')),
  deadline TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rewards (Random boxes and bonuses)
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('RANDOM_BOX', 'RANK_UP', 'STREAK_MILESTONE', 'QUEST_COMPLETION', 'SPECIAL_EVENT')),
  rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY')),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  xp_bonus INTEGER DEFAULT 0,
  points_bonus INTEGER DEFAULT 0,
  badge_id UUID,
  icon_url VARCHAR(500),
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements (Milestones and special accomplishments)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('STREAK', 'LEVEL', 'RANK', 'SOCIAL', 'CAMPAIGN', 'SPECIAL')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_url VARCHAR(500),
  xp_reward INTEGER DEFAULT 0,
  points_reward INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for gamification tables
CREATE INDEX idx_daily_quests_student ON daily_quests(student_id);
CREATE INDEX idx_daily_quests_campaign ON daily_quests(campaign_id);
CREATE INDEX idx_daily_quests_date ON daily_quests(quest_date);
CREATE INDEX idx_daily_quests_status ON daily_quests(status);

CREATE INDEX idx_penalty_quests_student ON penalty_quests(student_id);
CREATE INDEX idx_penalty_quests_status ON penalty_quests(status);
CREATE INDEX idx_penalty_quests_deadline ON penalty_quests(deadline);

CREATE INDEX idx_rewards_student ON rewards(student_id);
CREATE INDEX idx_rewards_type ON rewards(type);
CREATE INDEX idx_rewards_rarity ON rewards(rarity);

CREATE INDEX idx_achievements_student ON achievements(student_id);
CREATE INDEX idx_achievements_category ON achievements(category);
