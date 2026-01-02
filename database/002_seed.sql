
-- Habits for Good - Seed Data
-- Version: 002
-- Description: Sample data for development and testing with Solo Leveling gamification

-- ============================================
-- USERS
-- ============================================

-- Password hash for '123456789' (bcrypt)
-- $2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS

-- Admin users (password: Admin123!)
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (1, 'teacher@example.com', '$2a$10$lczF18LHaHiHMrSTBthRn.KSimIK8IdhXTVvQt42xdj6ZQCUWuiOO', 'admin', true),
  (2, 'guide@example.com', '$2a$10$lczF18LHaHiHMrSTBthRn.KSimIK8IdhXTVvQt42xdj6ZQCUWuiOO', 'admin', true);

-- Student users (password: Student123!)
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (3, 'emma.parent@example.com', '$2a$10$qJiGh.Jqa6m/vZD2NY2eWuPSUwDMRGjTkqzzN.whhvKvurEjXP3R6', 'student', true),
  (4, 'noah.parent@example.com', '$2a$10$qJiGh.Jqa6m/vZD2NY2eWuPSUwDMRGjTkqzzN.whhvKvurEjXP3R6', 'student', true),
  (5, 'olivia.parent@example.com', '$2a$10$qJiGh.Jqa6m/vZD2NY2eWuPSUwDMRGjTkqzzN.whhvKvurEjXP3R6', 'student', true),
  (6, 'liam.parent@example.com', '$2a$10$qJiGh.Jqa6m/vZD2NY2eWuPSUwDMRGjTkqzzN.whhvKvurEjXP3R6', 'student', true),
  (7, 'ava.parent@example.com', '$2a$10$qJiGh.Jqa6m/vZD2NY2eWuPSUwDMRGjTkqzzN.whhvKvurEjXP3R6', 'student', true);

-- Sponsor users (password: Sponsor123!)
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (8, 'sponsor1@example.com', '$2a$10$.xWKePr3YbHkt/OiqS4oqeLmkjNbuj0IMC7aJFvOsn.dxkGeVu.Ye', 'sponsor', true),
  (9, 'sponsor2@example.com', '$2a$10$.xWKePr3YbHkt/OiqS4oqeLmkjNbuj0IMC7aJFvOsn.dxkGeVu.Ye', 'sponsor', true);

-- Cause user (password: Cause123!)
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (10, 'charity@example.com', '$2a$10$tIcPPsmYJd04xUZ1kL/pveXYL1YiTBi6UkKin2bpTpYuDqcAQXYXO', 'cause', true);

-- ============================================
-- SPECIAL TEST USERS (password: 123456789)
-- ============================================

-- Super Admin (password: 123456789)
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (100, 'super.admin@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'super-admin', true),
  (101, 'admin@habitsforgood.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'super-admin', true),
  (102, 'asjad@habitsforgood.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'super-admin', true);

-- Special test student (password: 123456789)
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (103, 'tech.mohammad64@gmail.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true);

-- National Level (Legendary): Level 60+, 360000+ XP
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (116, 'national.rank@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true);

-- S-Rank: Level 50-59, 250000-359999 XP
INSERT INTO users (id, email, password_hash, role, email_verified) VALUES
  (110, 's.rank@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true),
  (111, 'a.rank@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true),
  (112, 'b.rank@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true),
  (113, 'c.rank@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true),
  (114, 'd.rank@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true),
  (115, 'e.rank@test.com', '$2a$10$rYPWpVr5sTqy3HQzrq5f2uE3t.EGVyO.4xBbU8xkKxqQpMhG6XDLS', 'student', true);

-- ============================================
-- ADMINS
-- ============================================

INSERT INTO admins (id, user_id, name, organization, role_title, verified, city, state) VALUES
  (1, 1, 'Ms. Johnson', 'Sunshine Elementary', 'Teacher', true, 'New York', 'NY'),
  (2, 2, 'Mr. Garcia', 'Community Youth Center', 'Youth Guide', true, 'Los Angeles', 'CA');

-- ============================================
-- STUDENTS
-- ============================================

INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, city, state, region) VALUES
  (1, 3, 'Emma', 6, NULL, 'emma.parent@example.com', 50, 1, 'E-Rank', 'New York', 'NY', 'Northeast'),
  (2, 4, 'Noah', 7, NULL, 'noah.parent@example.com', 120, 2, 'E-Rank', 'Los Angeles', 'CA', 'West'),
  (3, 5, 'Olivia', 5, NULL, 'olivia.parent@example.com', 0, 1, 'E-Rank', 'Chicago', 'IL', 'Midwest'),
  (4, 6, 'Liam', 8, NULL, 'liam.parent@example.com', 200, 2, 'E-Rank', 'Houston', 'TX', 'South'),
  (5, 7, 'Ava', 6, NULL, 'ava.parent@example.com', 80, 1, 'E-Rank', 'Phoenix', 'AZ', 'Southwest');

-- Special test student
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, city, state, region) VALUES
  (100, 103, 'Mohammad', 8, NULL, 'tech.mohammad64@gmail.com', 500, 3, 'E-Rank', 'San Francisco', 'CA', 'West');

-- ============================================
-- RANK TEST STUDENTS (For Solo Leveling Theme Testing)
-- ============================================

-- National Level (Legendary): Level 60+, 360000+ XP
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, title, city, state, region) VALUES
  (116, 116, 'Thomas Andre', 8, NULL, 'national.rank@test.com', 400000, 64, 'National Level', 'Goliath', 'Washington', 'DC', 'East');

-- S-Rank: Level 50-59, 250000-359999 XP
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, title, city, state, region) VALUES
  (110, 110, 'Sung Jin-Woo', 8, NULL, 's.rank@test.com', 300000, 55, 'S-Rank', 'Shadow Monarch', 'Seoul', 'SK', 'Asia');

-- A-Rank: Level 40-49, 160000-249999 XP
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, title, city, state, region) VALUES
  (111, 111, 'Cha Hae-In', 7, NULL, 'a.rank@test.com', 180000, 43, 'A-Rank', 'Sword Saint', 'Tokyo', 'JP', 'Asia');

-- B-Rank: Level 30-39, 90000-159999 XP
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, title, city, state, region) VALUES
  (112, 112, 'Baek Yoon-Ho', 8, NULL, 'b.rank@test.com', 100000, 32, 'B-Rank', 'White Tiger', 'New York', 'NY', 'Northeast');

-- C-Rank: Level 20-29, 40000-89999 XP
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, title, city, state, region) VALUES
  (113, 113, 'Han Song-Yi', 6, NULL, 'c.rank@test.com', 50000, 23, 'C-Rank', 'Rising Star', 'Chicago', 'IL', 'Midwest');

-- D-Rank: Level 10-19, 10000-39999 XP
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, city, state, region) VALUES
  (114, 114, 'Yoo Jin-Ho', 7, NULL, 'd.rank@test.com', 15000, 13, 'D-Rank', 'Los Angeles', 'CA', 'West');

-- E-Rank: Level 1-9, 0-9999 XP (Default starting rank)
INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email, xp, level, rank, city, state, region) VALUES
  (115, 115, 'Kim Rookie', 5, NULL, 'e.rank@test.com', 0, 1, 'E-Rank', 'Houston', 'TX', 'South');

-- ============================================
-- SPONSORS
-- ============================================

INSERT INTO sponsors (id, user_id, name, total_donated) VALUES
  (1, 8, 'Jane Smith (Parent)', 150.00),
  (2, 9, 'Local Business Inc.', 500.00);

-- ============================================
-- CAUSES
-- ============================================

INSERT INTO causes (id, user_id, org_name, ein, mission, verified) VALUES
  (1, 10, 'Healthy Kids Foundation', '12-3456789', 'Promoting healthy habits in children through education and community programs.', true);

-- ============================================
-- CAMPAIGNS
-- ============================================

INSERT INTO campaigns (id, admin_id, cause_id, title, description, category_tags, goal_amount, start_date, end_date, status, featured, difficulty_level, xp_reward, city, state, region) VALUES
  (
    1,
    1,
    1,
    'Healthy Hydration Challenge',
    'Help kids develop the healthy habit of drinking enough water every day! Complete daily water goals and help us raise funds for clean water initiatives.',
    ARRAY['children', 'health', 'education'],
    1000.00,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    'active',
    true,
    'E-Rank',
    15,
    'New York',
    'NY',
    'Northeast'
  ),
  (
    2,
    1,
    1,
    'Bookworm Bonanza',
    'Encourage a love of reading! Track your daily reading time and help provide books to kids in need.',
    ARRAY['education', 'children'],
    750.00,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '21 days',
    'active',
    true,
    'E-Rank',
    20,
    'Los Angeles',
    'CA',
    'West'
  ),
  (
    3,
    2,
    1,
    'Super Sleep Stars',
    'Good sleep is super important! Track your bedtime habits and help us support childrens health programs.',
    ARRAY['health', 'children'],
    500.00,
    CURRENT_DATE + INTERVAL '7 days',
    CURRENT_DATE + INTERVAL '37 days',
    'upcoming',
    false,
    'D-Rank',
    25,
    'Chicago',
    'IL',
    'Midwest'
  );

-- ============================================
-- HABITS (with AI XP assessment fields)
-- ============================================

-- Healthy Hydration Challenge habits
INSERT INTO habits (id, campaign_id, name, description, icon, frequency, sort_order, effort_level, base_xp) VALUES
  (1, 1, 'Drink 8 cups of water', 'Drink at least 8 cups of water throughout the day', 'water', 'daily', 1, 'low', 10),
  (2, 1, 'Morning water', 'Drink a glass of water when you wake up', 'sunrise', 'daily', 2, 'low', 5),
  (3, 1, 'Water with meals', 'Drink water with every meal', 'utensils', 'daily', 3, 'low', 5);

-- Bookworm Bonanza habits
INSERT INTO habits (id, campaign_id, name, description, icon, frequency, sort_order, effort_level, base_xp) VALUES
  (4, 2, 'Read for 20 minutes', 'Read a book for at least 20 minutes', 'book', 'daily', 1, 'medium', 15),
  (5, 2, 'Read before bed', 'Read a story before going to sleep', 'moon', 'daily', 2, 'medium', 10);

-- Super Sleep Stars habits
INSERT INTO habits (id, campaign_id, name, description, icon, frequency, sort_order, effort_level, base_xp) VALUES
  (6, 3, 'Go to bed on time', 'Be in bed by your bedtime', 'bed', 'daily', 1, 'high', 20),
  (7, 3, 'Sleep 9+ hours', 'Get at least 9 hours of sleep', 'sleep', 'daily', 2, 'high', 25),
  (8, 3, 'No screens before bed', 'Turn off screens 30 minutes before bed', 'screen-off', 'daily', 3, 'extreme', 30);

-- ============================================
-- ENROLLMENTS
-- ============================================

INSERT INTO enrollments (student_id, campaign_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (1, 2),
  (4, 2),
  (100, 1),
  (100, 2);

-- ============================================
-- SAMPLE SUBMISSIONS (past 5 days for active campaigns)
-- ============================================

-- Emma's submissions for Hydration Challenge
INSERT INTO habit_submissions (id, student_id, campaign_id, submission_date, rating, xp_earned) VALUES
  (1, 1, 1, CURRENT_DATE - INTERVAL '4 days', 'great', 15),
  (2, 1, 1, CURRENT_DATE - INTERVAL '3 days', 'good', 15),
  (3, 1, 1, CURRENT_DATE - INTERVAL '2 days', 'great', 15),
  (4, 1, 1, CURRENT_DATE - INTERVAL '1 day', 'great', 18);

-- Noah's submissions
INSERT INTO habit_submissions (id, student_id, campaign_id, submission_date, rating, xp_earned) VALUES
  (5, 2, 1, CURRENT_DATE - INTERVAL '4 days', 'good', 15),
  (6, 2, 1, CURRENT_DATE - INTERVAL '3 days', 'good', 15),
  (7, 2, 1, CURRENT_DATE - INTERVAL '1 day', 'great', 30);

-- ============================================
-- STREAKS
-- ============================================

INSERT INTO streaks (id, student_id, campaign_id, current_streak, longest_streak, last_submission_date) VALUES
  (1, 1, 1, 4, 4, CURRENT_DATE - INTERVAL '1 day'),
  (2, 2, 1, 1, 2, CURRENT_DATE - INTERVAL '1 day'),
  (3, 3, 1, 0, 0, NULL),
  (4, 1, 2, 0, 0, NULL),
  (5, 4, 2, 0, 0, NULL);

-- ============================================
-- POINTS LEDGER
-- ============================================

-- Emma's points
INSERT INTO points_ledger (id, student_id, campaign_id, submission_id, submission_date, base_points, streak_multiplier, bonus_multiplier, total_points) VALUES
  (1, 1, 1, 1, CURRENT_DATE - INTERVAL '4 days', 10, 1.00, 1.00, 10),
  (2, 1, 1, 2, CURRENT_DATE - INTERVAL '3 days', 10, 1.00, 1.00, 10),
  (3, 1, 1, 3, CURRENT_DATE - INTERVAL '2 days', 10, 1.00, 1.00, 10),
  (4, 1, 1, 4, CURRENT_DATE - INTERVAL '1 day', 10, 1.20, 1.00, 12);

-- Noah's points
INSERT INTO points_ledger (id, student_id, campaign_id, submission_id, submission_date, base_points, streak_multiplier, bonus_multiplier, total_points) VALUES
  (5, 2, 1, 5, CURRENT_DATE - INTERVAL '4 days', 10, 1.00, 1.00, 10),
  (6, 2, 1, 6, CURRENT_DATE - INTERVAL '3 days', 10, 1.00, 1.00, 10),
  (7, 2, 1, 7, CURRENT_DATE - INTERVAL '1 day', 10, 1.00, 2.00, 20);

-- ============================================
-- SPONSOR PLEDGES
-- ============================================

INSERT INTO sponsor_pledges (id, sponsor_id, campaign_id, rate_per_point, cap_amount) VALUES
  (1, 1, 1, 0.10, 100.00),
  (2, 2, 1, 0.25, 250.00),
  (3, 1, 2, 0.15, 75.00);

-- ============================================
-- BADGES
-- ============================================

INSERT INTO badges (student_id, badge_type, campaign_id) VALUES
  (110, 'rank_up_s', NULL),
  (110, '100_day_streak', NULL),
  (110, 'daily_quest_master', NULL),
  (111, 'rank_up_a', NULL),
  (111, '30_day_streak', NULL),
  (112, 'rank_up_b', NULL),
  (113, 'rank_up_c', NULL),
  (114, 'rank_up_d', NULL),
  (1, '7_day_streak', 1);

-- ============================================
-- TITLES (Solo Leveling Style)
-- ============================================

INSERT INTO titles (student_id, title_name, title_description, rarity, equipped) VALUES
  (110, 'Shadow Monarch', 'The one who commands shadows', 'legendary', true),
  (110, 'World''s Strongest', 'Reached the pinnacle of power', 'legendary', false),
  (111, 'Sword Saint', 'Master of the blade', 'epic', true),
  (111, 'S-Rank Hunter', 'Among the elite', 'epic', false),
  (112, 'White Tiger', 'Fierce and unstoppable', 'rare', true),
  (113, 'Rising Star', 'A hunter with great potential', 'common', true);

-- ============================================
-- NOTIFICATIONS
-- ============================================

INSERT INTO notifications (id, user_id, type, title, content, read) VALUES
  (1, 3, 'streak_milestone', '🔥 3-Day Streak!', 'Amazing! You have completed habits for 3 days in a row!', false),
  (2, 4, 'bonus_lottery', '🎉 Bonus Points!', 'Congratulations! You won the daily lottery and got 2x points!', true),
  (3, 110, 'rank_up', '⚔️ RANK UP: S-RANK!', 'You have ascended to S-Rank! You are now among the strongest hunters!', false),
  (4, 111, 'rank_up', '⚔️ RANK UP: A-RANK!', 'Congratulations! You have reached A-Rank! Elite hunter status achieved!', false);

-- ============================================
-- RESET SEQUENCES
-- ============================================

SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM users), false);
SELECT setval('admins_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM admins), false);
SELECT setval('students_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM students), false);
SELECT setval('sponsors_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM sponsors), false);
SELECT setval('causes_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM causes), false);
SELECT setval('campaigns_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM campaigns), false);
SELECT setval('habits_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM habits), false);
SELECT setval('habit_submissions_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM habit_submissions), false);
SELECT setval('streaks_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM streaks), false);
SELECT setval('points_ledger_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM points_ledger), false);
SELECT setval('sponsor_pledges_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM sponsor_pledges), false);
SELECT setval('notifications_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM notifications), false);
SELECT setval('badges_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM badges), false);
SELECT setval('titles_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM titles), false);
