
-- Habits for Good - Seed Data
-- Version: 002
-- Description: Sample data for development and testing

-- ============================================
-- USERS
-- ============================================

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
-- ADMINS
-- ============================================

INSERT INTO admins (id, user_id, name, organization, role_title, verified) VALUES
  (1, 1, 'Ms. Johnson', 'Sunshine Elementary', 'Teacher', true),
  (2, 2, 'Mr. Garcia', 'Community Youth Center', 'Youth Guide', true);

-- ============================================
-- STUDENTS
-- ============================================

INSERT INTO students (id, user_id, display_name, age, avatar_url, parent_email) VALUES
  (1, 3, 'Emma', 6, NULL, 'emma.parent@example.com'),
  (2, 4, 'Noah', 7, NULL, 'noah.parent@example.com'),
  (3, 5, 'Olivia', 5, NULL, 'olivia.parent@example.com'),
  (4, 6, 'Liam', 8, NULL, 'liam.parent@example.com'),
  (5, 7, 'Ava', 6, NULL, 'ava.parent@example.com');

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

INSERT INTO campaigns (id, admin_id, cause_id, title, description, category_tags, goal_amount, start_date, end_date, status, featured) VALUES
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
    true
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
    true
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
    false
  );

-- ============================================
-- HABITS
-- ============================================

-- Healthy Hydration Challenge habits
INSERT INTO habits (id, campaign_id, name, description, icon, frequency, sort_order) VALUES
  (1, 1, 'Drink 8 cups of water', 'Drink at least 8 cups of water throughout the day', 'water', 'daily', 1),
  (2, 1, 'Morning water', 'Drink a glass of water when you wake up', 'sunrise', 'daily', 2),
  (3, 1, 'Water with meals', 'Drink water with every meal', 'utensils', 'daily', 3);

-- Bookworm Bonanza habits
INSERT INTO habits (id, campaign_id, name, description, icon, frequency, sort_order) VALUES
  (4, 2, 'Read for 20 minutes', 'Read a book for at least 20 minutes', 'book', 'daily', 1),
  (5, 2, 'Read before bed', 'Read a story before going to sleep', 'moon', 'daily', 2);

-- Super Sleep Stars habits
INSERT INTO habits (id, campaign_id, name, description, icon, frequency, sort_order) VALUES
  (6, 3, 'Go to bed on time', 'Be in bed by your bedtime', 'bed', 'daily', 1),
  (7, 3, 'Sleep 9+ hours', 'Get at least 9 hours of sleep', 'sleep', 'daily', 2),
  (8, 3, 'No screens before bed', 'Turn off screens 30 minutes before bed', 'screen-off', 'daily', 3);

-- ============================================
-- ENROLLMENTS
-- ============================================

INSERT INTO enrollments (student_id, campaign_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (1, 2),
  (4, 2);

-- ============================================
-- SAMPLE SUBMISSIONS (past 5 days for active campaigns)
-- ============================================

-- Emma's submissions for Hydration Challenge
INSERT INTO habit_submissions (id, student_id, campaign_id, submission_date, rating) VALUES
  (1, 1, 1, CURRENT_DATE - INTERVAL '4 days', 'great'),
  (2, 1, 1, CURRENT_DATE - INTERVAL '3 days', 'good'),
  (3, 1, 1, CURRENT_DATE - INTERVAL '2 days', 'great'),
  (4, 1, 1, CURRENT_DATE - INTERVAL '1 day', 'great');

-- Noah's submissions
INSERT INTO habit_submissions (id, student_id, campaign_id, submission_date, rating) VALUES
  (5, 2, 1, CURRENT_DATE - INTERVAL '4 days', 'good'),
  (6, 2, 1, CURRENT_DATE - INTERVAL '3 days', 'good'),
  (7, 2, 1, CURRENT_DATE - INTERVAL '1 day', 'great');

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
-- NOTIFICATIONS
-- ============================================

INSERT INTO notifications (id, user_id, type, title, content, read) VALUES
  (1, 3, 'streak_milestone', '🔥 3-Day Streak!', 'Amazing! You have completed habits for 3 days in a row!', false),
  (2, 4, 'bonus_lottery', '🎉 Bonus Points!', 'Congratulations! You won the daily lottery and got 2x points!', true);

-- Reset Sequences (Important for future inserts)
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('admins_id_seq', (SELECT MAX(id) FROM admins));
SELECT setval('students_id_seq', (SELECT MAX(id) FROM students));
SELECT setval('sponsors_id_seq', (SELECT MAX(id) FROM sponsors));
SELECT setval('causes_id_seq', (SELECT MAX(id) FROM causes));
SELECT setval('campaigns_id_seq', (SELECT MAX(id) FROM campaigns));
SELECT setval('habits_id_seq', (SELECT MAX(id) FROM habits));
SELECT setval('habit_submissions_id_seq', (SELECT MAX(id) FROM habit_submissions));
SELECT setval('streaks_id_seq', (SELECT MAX(id) FROM streaks));
SELECT setval('points_ledger_id_seq', (SELECT MAX(id) FROM points_ledger));
SELECT setval('sponsor_pledges_id_seq', (SELECT MAX(id) FROM sponsor_pledges));
SELECT setval('notifications_id_seq', (SELECT MAX(id) FROM notifications));
