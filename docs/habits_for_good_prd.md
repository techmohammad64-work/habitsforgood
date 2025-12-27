# Habits for Good - Product Documentation Suite

## Table of Contents
1. [Product Requirements Document (PRD)](#prd)
2. [Functional Requirements Document (FRD)](#frd)
3. [JIRA Work Breakdown & User Stories](#jira)
4. [Business Rules](#business-rules)
5. [Technical Design Document](#design-doc)
6. [GitHub Copilot Instructions](#copilot-instructions)

---

<a name="prd"></a>
## 1. Product Requirements Document (PRD)

### 1.1 Executive Summary
**Product Name:** Habits for Good

**Vision Statement:** Empower children (ages 5-8) to build healthy habits while making a meaningful impact on charitable causes worldwide, creating a virtuous cycle where personal growth fuels social good.

**Problem Statement:** 
- Children lack intrinsic motivation to build healthy habits
- Parents want to teach children about charity and social responsibility
- Traditional donation models lack engagement and measurable impact
- Charitable causes struggle to attract younger demographics and their families

**Solution:**
A gamified web platform where children earn points by completing daily healthy habits. Sponsors pledge financial support tied to these points, with funds distributed to charitable campaigns. The faith-based system encourages honesty, habit formation, and charitable giving simultaneously.

### 1.2 Target Users

#### Primary Users: Students/Kids (Children aged 5-8)
- **Role:** Complete daily habits, track progress, compete on leaderboards
- **Needs:** Simple, colorful interface; immediate feedback; visual progress tracking; sense of achievement
- **Goals:** Build healthy habits; help others; earn medals/badges; compete on leaderboards
- **Pain Points:** Short attention span; limited reading ability; need parental guidance

#### Primary Users: Admins (Teachers, Guides, Campaign Managers)
- **Role:** Create habit campaigns, define habits, manage leaderboards, award bonuses, monitor progress
- **Needs:** Campaign creation tools; habit definition interface; leaderboard management; bonus/quest creation; performance analytics
- **Goals:** Engage students in healthy habits; create effective campaigns; recognize achievements; maintain engagement
- **Capabilities:**
  - Create and manage habit campaigns
  - Define custom habits for each campaign
  - Award bonus rewards to students
  - Create short-term flash habit quests during active campaigns
  - Highlight student performance on leaderboards
  - View detailed analytics and student progress
  - Moderate and adjust campaigns in real-time

#### Secondary Users: Sponsors (Parents, Guardians, Organizations)
- **Needs:** Transparent fund tracking; impact visibility; easy pledge management; tax documentation
- **Goals:** Support children's development; contribute to causes; maximize donation impact
- **Pain Points:** Trust in fund allocation; wanting measurable outcomes

#### Tertiary Users: Charitable Causes
- **Needs:** Fundraising platform; community engagement; promotional tools
- **Goals:** Raise funds; increase awareness; engage younger demographics
- **Pain Points:** Limited tech resources; need for modern engagement channels

### 1.3 Success Metrics (KPIs)
- **User Engagement:** Daily active contributors, habit completion rate (target: 70%+), average streak length
- **Financial Impact:** Total funds raised, average pledge per sponsor, pledge-to-payment conversion rate (target: 85%+)
- **Habit Formation:** Contributors maintaining 30+ day streaks, habit diversity per user
- **Platform Growth:** Monthly active users, campaign creation rate, sponsor retention rate
- **Social Impact:** Number of causes supported, beneficiaries impacted, contributor satisfaction scores

### 1.4 Core Features (MVP)

#### For Students/Kids:
1. **Campaign Enrollment:** Browse and join campaigns created by admins
2. **Daily Habit Tracking:** Submit yes/no for completed habits defined in each campaign
3. **Points & Streaks:** Earn points for consistency; bonus multipliers for streaks
4. **Leaderboards:** Campaign-specific rankings showing streaks and performance
5. **Personal Dashboard:** View enrolled campaigns, total points, contribution amount, medals, habit statistics
6. **Flash Quests:** Participate in short-term bonus challenges created by admins
7. **Impact Notifications:** Email summary of contribution at campaign end

#### For Admins (Teachers/Guides):
1. **Campaign Creation:** Create habit campaigns with custom titles, descriptions, dates, and goals
2. **Habit Definition:** Define specific habits for each campaign (not limited to global library)
3. **Leaderboard Management:** View, moderate, and manage campaign leaderboards
4. **Bonus Rewards:** Award bonus points or special recognition to students
5. **Flash Quests:** Create time-limited mini-challenges during active campaigns (e.g., "Extra points for reading 30 min today!")
6. **Performance Highlighting:** Pin or feature specific students on leaderboards for exemplary performance
7. **Student Analytics:** View individual and aggregate student progress
8. **Campaign Moderation:** Pause, modify, or end campaigns as needed
9. **Admin Dashboard:** Overview of all campaigns, student engagement, and system health

#### For Sponsors:
1. **Campaign Pledging:** Set monetary pledge per point for specific campaigns
2. **Flexible Commitments:** Faith-based system; can adjust pledges without penalty
3. **Impact Dashboard:** Total donations, number of contributors helped, habit improvement stats
4. **Payment Processing:** Secure checkout at campaign end

#### For Causes:
1. **Campaign Association:** Link campaigns to charitable causes
2. **Promotion Tools:** Shareable links for social media
3. **Sponsor Recruitment:** Invite corporate/individual sponsors
4. **Fund Distribution:** Automatic transfer of collected pledges

#### Platform Features:
1. **Search & Discovery:** Find campaigns by category (religious, children, food, patients, etc.)
2. **Random Bonus System:** Daily lottery for extra points to maintain excitement
3. **Responsive Web Design:** Fully functional on mobile phones, tablets, and desktops
4. **Rollover Points:** If funds insufficient, points carry to next campaign
5. **Transparency Guarantees:** Clear disclosure on data privacy, no third-party ads, 100% fund transfer

### 1.5 Out of Scope (Post-MVP)
- Social features (friend connections, chat)
- Advanced analytics for parents
- Mobile native apps (focusing on responsive web first)
- Multi-language support
- Integration with fitness wearables
- Custom habit creation by users

### 1.6 Assumptions & Dependencies
- Parents/Teachers will supervise children's app usage
- Admins (teachers/guides) have training on creating effective habit campaigns
- Sponsors will honor faith-based pledges (85%+ conversion expected)
- Students will self-report honestly with teacher oversight
- Payment gateway integration (Stripe/PayPal) available
- Email service provider for notifications
- **Docker/Docker Compose for all environments** - No direct npm commands used in production
- **PostgreSQL as primary database with TypeORM** for database operations
- **Playwright for end-to-end testing** - All interactive elements have `data-test-id` attributes
- **Responsive web design** - Application works on mobile phones (320px+), tablets, and desktops
- **Modern development tooling:** Makefile for commands, ESLint + TSLint for code quality, TypeScript for type safety
- **Angular (latest stable version)** as frontend framework
- **Industry-standard folder structure** with separation of concerns
- **Database migrations** managed via TypeORM migration system
- **Comprehensive testing strategy:** Unit tests (Jest), API tests (Supertest), E2E tests (Playwright)
- **Documentation folder** for all project documentation and architecture decisions
- Charitable causes will actively promote the platform

### 1.7 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low sponsor payment conversion | High | Clear communication, easy payment, reminder emails, showcase impact |
| Dishonest habit reporting | Medium | Education on system integrity, minimal verification, focus on intrinsic motivation |
| Child safety/data privacy concerns | High | COPPA compliance, minimal data collection, transparent privacy policy, parental controls |
| Technical complexity for target age | High | Extensive UX testing, visual-first design, voice guidance option, parental assistance mode |
| Campaign funding shortfalls | Medium | Point rollover system, transparent communication, diversified campaign portfolio |

---

<a name="frd"></a>
## 2. Functional Requirements Document (FRD)

### 2.1 User Roles & Permissions

#### Student/Kid (Contributor)
- Create account (with parent email)
- Browse and enroll in campaigns
- Submit daily habit completions
- View personal statistics and leaderboards
- Receive achievement notifications
- Participate in flash quests

#### Admin (Teacher/Guide/Campaign Manager)
- Create and manage campaigns
- Define custom habits for each campaign
- View and manage campaign leaderboards
- Award bonus points to students
- Create flash quests (time-limited bonus challenges)
- Highlight student performance on leaderboards
- View detailed student analytics
- Moderate campaigns (pause, modify, end)
- Access admin dashboard with system-wide metrics

#### Sponsor (Parent/Organization)
- Create sponsor account
- Pledge to campaigns with per-point amounts
- View impact dashboard
- Make payments at campaign end
- Receive tax documentation

#### Cause Representative
- Create cause profile
- Associate campaigns with causes
- Invite sponsors
- Receive fund transfers
- Access campaign analytics

#### System Administrator
- Manage all users and campaigns
- Monitor platform health
- Handle disputes
- Configure system settings
- Approve cause applications

### 2.2 Functional Modules

#### 2.2.1 Authentication & Account Management

**FR-AUTH-001: User Registration**
- Students: Require parent email for verification
- Admins: Teacher/guide registration with school/organization verification
- Sponsors: Standard email/password with 2FA option
- Causes: Application-based approval with documentation
- OAuth integration (Google, Facebook) for sponsors and admins

**FR-AUTH-002: Profile Management**
- Students: Avatar selection, display name, age, favorite causes
- Admins: Organization affiliation, role/title, managed campaigns
- Sponsors: Payment methods, pledge history, impact stats
- Causes: Organization details, mission statement, verification badge

#### 2.2.2 Campaign Management

**FR-CAMP-001: Campaign Creation (Admin Only)**
- Admin can create campaigns with:
  - Title, description, category tags
  - Fundraising goal and deadline
  - **Custom habit definitions** specific to this campaign (not limited to global library)
  - Featured image/banner
  - Point-to-dollar conversion rate suggestion
  - Associated charitable cause
- Each habit definition includes: name, description, icon, frequency (daily/weekly)
- Admins can enable/disable specific habits during campaign

**FR-CAMP-002: Campaign Discovery**
- Search functionality with filters (category, active/upcoming, funding status)
- Category browsing (religious, children, food, patients, education, environment)
- Featured campaigns carousel
- Recommended campaigns based on student history

**FR-CAMP-003: Campaign Enrollment (Student)**
- Students can enroll in multiple active campaigns
- Display estimated impact per habit completion
- Show current participants and funding status
- One-click enrollment with confirmation
- View campaign-specific habits before enrolling

#### 2.2.3 Habit Tracking System

**FR-HABIT-001: Campaign-Specific Habit Definition (Admin)**
- Admins define habits when creating campaigns
- Each habit includes: name, description, icon selection, expected frequency
- Habits are campaign-specific (different campaigns can have different habits)
- Optional: Global habit template library for quick selection
- Medical disclaimer for health-related habits (displayed to students)

**FR-HABIT-002: Daily Submission (Student)**
- Time-bound submission window (before midnight local time)
- Simple yes/no interface per enrolled campaign
- Display campaign-specific habits only
- Confirmation animation on submission
- Optional smiley face rating (how it felt)

**FR-HABIT-003: Streak Tracking**
- Calculate consecutive days of habit completion per campaign
- Apply multiplier bonuses (e.g., 3-day streak: 1.2x, 7-day: 1.5x, 30-day: 2.0x)
- Break streak on missed day, restart counter
- Visual streak flame/badge icon

**FR-HABIT-004: Flash Quests (Admin-Created)**
- Admins can create time-limited bonus challenges during active campaigns
- Flash quest properties: title, description, bonus points, duration (1-7 days), eligible students
- Examples: "Read 30 minutes today for 2x points!", "Weekend Water Challenge: 10 cups for +50 points"
- Flash quests appear on student dashboard with countdown timer
- Students opt-in to participate
- Bonus points automatically awarded upon completion verification

#### 2.2.4 Points & Impact System

**FR-POINT-001: Point Calculation**
- Base point per habit completion: 10 points
- Streak multiplier applied to base
- Random bonus multiplier (if winner)
- Campaign-specific point totals tracked separately

**FR-POINT-002: Sponsor Matching**
- Sponsors pledge dollar amount per point (e.g., $0.10/point)
- Multiple sponsors can support same campaign
- Total pledge pool calculated: Σ(sponsor pledges × total contributor points)
- Campaign end: funds requested from sponsors

**FR-POINT-003: Fund Distribution**
- If total pledges ≥ total calculated: full distribution to cause
- If total pledges < total calculated: proportional distribution
- Shortfall points roll over to next campaign for same cause
- Contributors notified of final impact amount

#### 2.2.5 Leaderboards & Gamification

**FR-LEADER-001: Campaign Leaderboards**
- Display top 10 contributors by current streak
- Real-time updates (or daily refresh)
- Anonymous display option for privacy
- Medals for top 3 (gold, silver, bronze)

**FR-LEADER-002: Achievement Badges**
- Milestone badges: 7-day, 30-day, 100-day streaks
- Campaign completion badges
- Top-3 finishes
- "Generous Heart" badge for participation in 5+ campaigns
- Display on contributor profile

#### 2.2.6 Dashboards & Analytics

**FR-DASH-001: Contributor Dashboard**
- Current enrolled campaigns with progress bars
- Total lifetime points and contribution amount
- Active streaks with visual indicators
- Badge/medal collection display
- Habit improvement chart (completion rate over time)

**FR-DASH-002: Sponsor Dashboard**
- Total amount donated (all-time and per campaign)
- Number of contributors supported
- Aggregate habit improvement stats (e.g., "helped 50 kids drink more water")
- Upcoming payment obligations
- Tax receipt downloads

**FR-DASH-003: Cause Dashboard**
- Campaign performance metrics (enrollment, points, funding)
- Sponsor list and commitment amounts
- Projected vs. actual fund collection
- Contributor engagement stats
- Export functionality for reporting

#### 2.2.7 Notification System

**FR-NOTIF-001: Email Notifications**
- Campaign enrollment confirmation
- Daily reminder to submit habits (optional, opt-in)
- Streak milestone achievements
- Random bonus lottery win
- Campaign end summary with contribution amount
- Sponsor payment reminder
- New campaign announcements for favorite causes

**FR-NOTIF-002: In-App Notifications**
- Real-time streak updates
- Leaderboard position changes
- New badge earned
- Campaign ending soon alerts

#### 2.2.8 Transparency & Trust

**FR-TRANS-001: Public Commitments**
- Display three-point disclaimer on every page footer:
  1. We do not sell your data
  2. We do not show third-party advertisements
  3. We transfer 100% of sponsored money to the cause

**FR-TRANS-002: Financial Transparency**
- Campaign page shows total pledged vs. collected
- Display platform fee (if any) separately
- Publish quarterly transparency reports
- Third-party audit badge (future)

**FR-TRANS-003: Data Privacy**
- COPPA-compliant data collection
- Minimal personal data storage
- Parental consent for children under 13
- Clear privacy policy in simple language

### 2.3 Non-Functional Requirements

#### Performance
- Page load time: < 2 seconds on 3G connection
- API response time: < 500ms for 95th percentile
- Support 10,000 concurrent users
- 99.9% uptime SLA
- Responsive design: Works seamlessly on mobile (320px+), tablet (768px+), and desktop (1024px+)

#### Security
- HTTPS encryption for all traffic
- Secure payment processing (PCI DSS compliant)
- SQL injection prevention via TypeORM parameterized queries
- CSRF protection
- Rate limiting on API endpoints
- Data encryption at rest
- Role-based access control (RBAC) for admin functions

#### Usability
- WCAG 2.1 AA accessibility compliance
- **Mobile-first responsive design** - Fully functional on smartphones (portrait and landscape)
- Tablet-optimized layouts
- Desktop enhanced experience
- Intuitive navigation for 5-8 year olds
- Maximum 3 clicks to complete habit submission
- Colorful, engaging UI with animations
- Touch-friendly interface (minimum 44x44px tap targets)

#### Testability
- **All interactive elements include `data-test-id` attributes** for Playwright E2E tests
- Consistent naming convention: `data-test-id="component-action"` (e.g., `data-test-id="campaign-enroll-button"`)
- Unit test coverage > 80% (Jest for backend, Jasmine/Karma for frontend)
- API integration tests (Supertest)
- End-to-end tests covering all user journeys (Playwright)

#### Maintainability
- **TypeORM for database operations** - Type-safe queries, migrations support
- **TypeScript throughout** - Frontend (Angular) and Backend (Node.js/Express)
- **ESLint + TSLint** - Enforced code quality standards
- **Industry-standard folder structure:**
  ```
  /backend
    /src
      /controllers
      /services
      /entities (TypeORM)
      /migrations
      /middleware
      /routes
      /utils
    /tests
      /unit
      /integration
      /e2e
    /docs
  /frontend
    /src
      /app
        /core
        /shared
        /features
      /assets
      /environments
    /tests
      /unit
      /e2e
    /docs
  /database
    001_init_schema.sql
    002_seed.sql
  /docs
    architecture.md
    api-spec.md
    deployment.md
  docker-compose.yml
  docker-compose.dev.yml
  docker-compose.prod.yml
  Makefile
  ```
- **Makefile for common tasks:**
  - `make build` - Build all Docker containers
  - `make up` - Start development environment
  - `make down` - Stop all services
  - `make migrate` - Run database migrations
  - `make seed` - Populate database with seed data
  - `make test-unit` - Run unit tests
  - `make test-e2e` - Run Playwright tests
  - `make lint` - Run ESLint + TSLint
  - `make logs` - View Docker Compose logs
- **TypeORM migrations** - Version-controlled database schema changes
- Comprehensive API documentation (OpenAPI/Swagger)
- Inline code documentation

#### Deployment
- **Docker Compose for all environments** (dev, staging, prod)
- **No direct npm commands** - All operations via Docker or Makefile
- PostgreSQL 15+ as primary database
- Automated CI/CD pipeline checks:
  - Linting (ESLint, TSLint)
  - Unit tests
  - Integration tests
  - E2E tests (Playwright)
  - Build verification
  - **Docker Compose log validation** - No errors before deployment
- Environment-specific configurations via `.env` files
- Health checks for all services
- Graceful shutdown handling

#### Scalability
- Horizontal scaling via Docker containers
- Database read replicas for queries
- CDN for static assets
- Microservices architecture (Auth, Campaign, Points, Notification services)
- Redis caching for leaderboards and sessions

---

<a name="jira"></a>
## 3. JIRA Work Breakdown & User Stories

### Epic Structure

**Epic 1: User Authentication & Account Management**
**Epic 2: Campaign Management System**
**Epic 3: Habit Tracking & Submission**
**Epic 4: Points, Streaks & Impact Calculation**
**Epic 5: Leaderboards & Gamification**
**Epic 6: Dashboard & Analytics**
**Epic 7: Notification System**
**Epic 8: Payment Integration**
**Epic 9: Search & Discovery**
**Epic 10: Infrastructure & DevOps**

---

### Epic 1: User Authentication & Account Management

#### Story 1.1: Contributor Registration
**As a** parent  
**I want to** register my child as a contributor  
**So that** they can participate in campaigns and build healthy habits

**Acceptance Criteria:**
- Parent provides email, creates password for family account
- Child profile created with display name, age (5-8 validation), avatar selection
- Email verification sent to parent
- Account activated upon email confirmation
- Error handling for duplicate emails, invalid inputs

**Story Points:** 5  
**Priority:** High  
**Dependencies:** None

---

#### Story 1.2: Sponsor Registration
**As a** potential sponsor  
**I want to** create an account with my payment information  
**So that** I can pledge to campaigns and support causes

**Acceptance Criteria:**
- Standard email/password registration
- Optional OAuth (Google, Facebook)
- Profile fields: name, payment method placeholder (added later), tax ID (optional)
- Email verification required
- 2FA option available

**Story Points:** 5  
**Priority:** High  
**Dependencies:** None

---

#### Story 1.3: Admin Registration
**As a** teacher or guide  
**I want to** create an admin account  
**So that** I can create and manage habit campaigns for my students

**Acceptance Criteria:**
- Admin registration form with email, password, organization/school name, role/title
- Email verification required
- Optional: Organization verification (upload document or admin approval)
- Admin dashboard access upon approval
- Onboarding tutorial for creating first campaign

**Story Points:** 5  
**Priority:** High  
**Dependencies:** None
**As a** charitable organization  
**I want to** apply for a cause account  
**So that** I can create campaigns and receive donations

**Acceptance Criteria:**
- Application form with organization details (name, EIN/charity registration, mission, website)
- Document upload for verification (501c3, charity registration)
- Admin approval workflow
- Verification badge displayed on approved profiles
- Email notification on approval/rejection

**Story Points:** 5  
**Priority:** High  
**Dependencies:** None

---

#### Story 1.4: Cause Representative Onboarding

---

#### Story 1.4: User Profile Management
**As a** registered user  
**I want to** update my profile information  
**So that** my account details remain current

**Acceptance Criteria:**
- Edit profile fields specific to user role
- Avatar/photo upload with validation (size, format)
- Password change functionality
- Email change with re-verification
- Delete account option with confirmation dialog

**Story Points:** 3  
**Priority:** Low  
**Dependencies:** Stories 1.1, 1.2, 1.3, 1.4

---

### Epic 2: Campaign Management System

#### Story 2.1: Create Campaign (Admin Only)
**As an** admin  
**I want to** create a habit campaign with custom habits  
**So that** students can enroll and start building healthy habits

**Acceptance Criteria:**
- Campaign creation form with: title, description (rich text), category tags, fundraising goal, start/end date, associated cause
- **Habit definition section:** Add multiple custom habits with name, description, icon selection, frequency (daily/weekly)
- Featured image upload (max 2MB, JPG/PNG)
- Preview before publishing
- All form fields include `data-test-id` attributes (e.g., `data-test-id="campaign-title-input"`)
- Campaign saved as draft or published
- Validation: end date must be after start date, at least 1 habit required

**Story Points:** 13  
**Priority:** High  
**Dependencies:** Story 1.3

---

#### Story 2.2: Campaign Listing & Detail Pages
**As a** student  
**I want to** view all available campaigns with details  
**So that** I can choose which ones to join

**Acceptance Criteria:**
- Campaign listing page with filters (category, status, funding level)
- Pagination or infinite scroll
- Campaign cards show: image, title, admin/cause name, goal, current funding %, participants count, days remaining
- All interactive elements have `data-test-id` attributes (e.g., `data-test-id="campaign-card-${id}"`)
- Detail page with full description, **campaign-specific habit list**, sponsor list (anonymized), leaderboard preview
- Enroll button (if eligible) with `data-test-id="campaign-enroll-button"`
- Responsive design: stacks vertically on mobile, grid on tablet/desktop

**Story Points:** 8  
**Priority:** High  
**Dependencies:** Story 2.1

---

#### Story 2.3: Campaign Enrollment (Student)
**As a** student  
**I want to** enroll in a campaign  
**So that** I can start earning points for that cause

**Acceptance Criteria:**
- One-click enrollment from campaign detail page
- Display confirmation modal with habit commitment preview showing campaign-specific habits
- Limit: max 5 active campaigns per student
- Enrollment recorded with timestamp
- Email confirmation sent to parent
- Update campaign participant count
- Enrollment button has `data-test-id="campaign-enroll-button"`
- Responsive modal design

**Story Points:** 5  
**Priority:** High  
**Dependencies:** Story 2.2

---

#### Story 2.4: Admin Campaign Management
**As an** admin  
**I want to** manage my campaigns (pause, modify, end early)  
**So that** I can respond to changing circumstances

**Acceptance Criteria:**
- Admin campaign dashboard lists all managed campaigns
- Actions: Edit, Pause, Resume, End Early, Archive
- Each action button has `data-test-id` (e.g., `data-test-id="campaign-pause-button-${id}"`)
- Pause: stops new enrollments, existing students continue
- End Early: triggers fund distribution early, notifies all stakeholders
- Edit: allows modifying description, dates (with constraints), adding/removing habits
- Confirmation modals for destructive actions
- Audit log of all campaign modifications

**Story Points:** 8  
**Priority:** Medium  
**Dependencies:** Story 2.1

---

#### Story 2.5: Flash Quest Creation (Admin)
**As a** system  
**I want to** automatically transition campaigns through lifecycle states  
**So that** campaigns start, run, and complete on schedule

**Acceptance Criteria:**
- Scheduled job checks campaign dates daily
- States: Upcoming → Active → Ended → Completed (funds distributed)
- Active campaigns allow habit submissions
- Ended campaigns lock submissions, calculate final points
- Completed campaigns show final impact, trigger notifications
- Rollover insufficient funding to next campaign

**Story Points:** 8  
**Priority:** High  
**Dependencies:** Story 4.3 (Fund Distribution)

---

### Epic 3: Habit Tracking & Submission

#### Story 3.1: Habit Library Management
**As an** admin  
**I want to** manage a library of approved healthy habits  
**So that** campaigns can use vetted, age-appropriate habits

**Acceptance Criteria:**
- Admin panel to add/edit/delete habits
- Habit fields: name, description, icon (upload), recommended frequency, medical disclaimer
- Pre-populated with MVP habits: water (8 cups/day), sleep (9 hours), walking (30 min), screen time (under 2 hrs), reading (20 min), vegetables (3 servings), kindness act, brushing teeth (2x)
- Crowd-suggested habits queue for admin approval
- Public-facing habit library page with icons

**Story Points:** 8  
**Priority:** High  
**Dependencies:** Story 10.2 (Admin Panel)

---

#### Story 3.2: Daily Habit Submission Interface
**As a** contributor  
**I want to** submit my completed habits each day  
**So that** I earn points and help my chosen causes

**Acceptance Criteria:**
- Dashboard shows enrolled campaigns with today's habit checklist
- Simple yes/no toggle/button per habit
- Optional smiley face rating (great/good/okay/hard)
- Visual feedback on submission (animation, checkmark)
- Submission timestamp recorded
- Disabled after midnight (local time), resets next day
- Prevent duplicate submissions for same day

**Story Points:** 8  
**Priority:** High  
**Dependencies:** Story 2.3, Story 3.1

---

#### Story 3.3: Streak Calculation Engine
**As a** system  
**I want to** calculate contributor streaks automatically  
**So that** multipliers are applied correctly and leaderboards are accurate

**Acceptance Criteria:**
- Daily job processes previous day's submissions
- Streak incremented if habit submitted, reset to 0 if missed
- Multiplier formula: 1.0x (0-2 days), 1.2x (3-6 days), 1.5x (7-29 days), 2.0x (30+ days)
- Campaign-specific streak tracking
- Database updated with new streak values
- Trigger notifications for milestone streaks (7, 30, 100 days)

**Story Points:** 8  
**Priority:** High  
**Dependencies:** Story 3.2

---

#### Story 3.4: Random Bonus Lottery
**As a** system  
**I want to** randomly award bonus multipliers to 10% of active contributors daily  
**So that** engagement and excitement remain high

**Acceptance Criteria:**
- Daily job selects 10% of contributors who submitted habits that day
- Random multiplier: 2x-5x applied to that day's points
- Verifiable random algorithm (seeded, logged)
- Bonus recorded in points ledger
- In-app and email notification to winners
- Display lottery icon on dashboard

**Story Points:** 5  
**Priority:** Medium  
**Dependencies:** Story 3.2

---

### Epic 4: Points, Streaks & Impact Calculation

#### Story 4.1: Points Ledger System
**As a** system  
**I want to** maintain an immutable ledger of all point transactions  
**So that** contributor impact is accurately tracked and auditable

**Acceptance Criteria:**
- Database table: contributor_id, campaign_id, date, base_points, streak_multiplier, bonus_multiplier, total_points, submission_id
- Entry created for each habit submission after processing
- Aggregate queries for total campaign points, contributor totals
- API endpoints for querying ledger (with auth)
- No deletion or updates allowed (append-only)

**Story Points:** 5  
**Priority:** High  
**Dependencies:** Story 3.3, Story 3.4

---

#### Story 4.2: Sponsor Pledge Tracking
**As a** sponsor  
**I want to** pledge a per-point amount to campaigns  
**So that** my donation scales with contributor effort

**Acceptance Criteria:**
- Campaign detail page has "Pledge" button for sponsors
- Pledge modal: enter dollar amount per point (e.g., $0.10), total cap (optional)
- Pledge recorded with timestamp, sponsor_id, campaign_id, rate, cap
- Display pledged amount on sponsor dashboard
- Allow editing pledge before campaign ends
- Email confirmation of pledge

**Story Points:** 5  
**Priority:** High  
**Dependencies:** Story 2.2

---

#### Story 4.3: Fund Distribution Calculation
**As a** system  
**I want to** calculate final fund distribution at campaign end  
**So that** causes receive correct donations and contributors see their impact

**Acceptance Criteria:**
- Triggered when campaign status changes to "Ended"
- Calculate total points: Σ(all contributor points for campaign)
- Calculate total pledged: Σ(sponsor pledges × min(total_points, cap))
- If pledged ≥ goal: distribute full amount to cause
- If pledged < goal: distribute available, rollover shortfall points to next campaign
- Record transaction: campaign_id, total_points, total_pledged, amount_distributed, rollover_points
- Update campaign status to "Completed"
- Trigger notifications (Story 7.3)

**Story Points:** 8  
**Priority:** High  
**Dependencies:** Story 4.1, Story 4.2

---

### Epic 5: Leaderboards & Gamification

#### Story 5.1: Campaign Leaderboard
**As a** contributor  
**I want to** see how my streak compares to others in the campaign  
**So that** I feel motivated to maintain my habits

**Acceptance Criteria:**
- Leaderboard on campaign detail page
- Display top 10 contributors by current streak (days)
- Columns: rank, display name (or "Anonymous"), streak, medals (if top 3)
- Real-time or daily refresh
- Contributor's own ranking highlighted if not in top 10
- Anonymous display option in user settings

**Story Points:** 5  
**Priority:** Medium  
**Dependencies:** Story 3.3

---

#### Story 5.2: Achievement Badge System
**As a** contributor  
**I want to** earn badges for milestones  
**So that** I feel recognized for my progress

**Acceptance Criteria:**
- Badge types: 7-Day Streak, 30-Day Streak, 100-Day Streak, Campaign Completer, Top 3 Finisher, Generous Heart (5+ campaigns)
- Badges automatically awarded when criteria met
- Database table: badge_id, contributor_id, earned_date, badge_type
- Display badges on contributor profile
- In-app notification on earning new badge
- Badge icons designed (colorful, kid-friendly)

**Story Points:** 5  
**Priority:** Low  
**Dependencies:** Story 3.3, Story 2.3

---

#### Story 5.3: Medals for Top Performers
**As a** top contributor  
**I want to** receive a medal if I finish in the top 3  
**So that** I have a lasting recognition of my achievement

**Acceptance Criteria:**
- At campaign end, calculate top 3 contributors by total points (including multipliers)
- Award gold (1st), silver (2nd), bronze (3rd) medals
- Display medals on contributor profile with campaign name
- Medal icon shown on leaderboard next to top 3
- Email notification with medal image

**Story Points:** 3  
**Priority:** Low  
**Dependencies:** Story 5.1

---

### Epic 6: Dashboard & Analytics

#### Story 6.1: Contributor Dashboard
**As a** contributor  
**I want to** see all my campaigns, points, and achievements in one place  
**So that** I can track my progress easily

**Acceptance Criteria:**
- Dashboard sections:
  1. Active campaigns with progress bars (days remaining, current streak, points earned)
  2. Total lifetime points and contribution amount ($ donated via efforts)
  3. Badge collection with empty slots for unearned badges
  4. Medals display
  5. Habit improvement chart (completion rate per week, last 12 weeks)
- Mobile-responsive layout
- Animations on hover/interaction
- "View Details" link for each campaign

**Story Points:** 8  
**Priority:** High  
**Dependencies:** Story 4.1, Story 5.2

---

#### Story 6.2: Sponsor Dashboard
**As a** sponsor  
**I want to** see the impact of my donations  
**So that** I feel connected to the contributors I've helped

**Acceptance Criteria:**
- Dashboard sections:
  1. Total donated (all-time, this year, per campaign)
  2. Number of contributors supported (unique count)
  3. Aggregate habit stats (e.g., "5,000 cups of water drunk", "200 hours of reading time")
  4. Upcoming payment obligations (active pledges)
  5. Tax receipt download links
- Charts: donation over time, campaigns supported
- Export functionality (CSV)

**Story Points:** 8  
**Priority:** Medium  
**Dependencies:** Story 4.3

---

#### Story 6.3: Cause Dashboard
**As a** cause representative  
**I want to** monitor my campaign performance  
**So that** I can optimize fundraising and engagement

**Acceptance Criteria:**
- Dashboard sections:
  1. Campaign list with status, enrollment, points, funding
  2. Sponsor list per campaign with pledge amounts
  3. Projected vs. actual fund collection chart
  4. Contributor engagement metrics (avg streak, completion rate)
  5. Export campaign data (CSV, PDF report)
- Filter by campaign date range
- Real-time updates on active campaigns

**Story Points:** 8  
**Priority:** Medium  
**Dependencies:** Story 4.3

---

### Epic 7: Notification System

#### Story 7.1: Email Notification Infrastructure
**As a** system  
**I want to** send transactional emails reliably  
**So that** users stay informed about important events

**Acceptance Criteria:**
- Integrate email service provider (SendGrid, AWS SES, Mailgun)
- Email templates: registration confirmation, campaign enrollment, daily reminder (opt-in), streak milestone, random bonus win, campaign end summary, payment reminder
- Personalization tags (name, points, amount)
- HTML and plain-text versions
- Unsubscribe link (excluding critical transactional emails)
- Delivery tracking and error logging

**Story Points:** 8  
**Priority:** High  
**Dependencies:** None

---

#### Story 7.2: Daily Habit Reminder (Optional)
**As a** contributor  
**I want to** receive a daily reminder to submit my habits  
**So that** I don't forget and break my streak

**Acceptance Criteria:**
- Opt-in during onboarding or in settings
- Scheduled email sent at user-specified time (default: 7pm local time)
- Email content: friendly reminder, list of enrolled campaigns, quick link to submission page
- Respect Do Not Disturb hours (10pm-7am local time)
- Allow disabling per campaign or globally

**Story Points:** 5  
**Priority:** Low  
**Dependencies:** Story 7.1

---

#### Story 7.3: Campaign End Impact Summary
**As a** contributor  
**I want to** receive an email when a campaign ends showing my impact  
**So that** I understand how my habits helped the cause

**Acceptance Criteria:**
- Triggered when campaign status changes to "Completed"
- Email content: thank you message, total points earned, final contribution amount ($), campaign outcome, encouragement to join next campaign
- Include campaign image and cause logo
- Link to share achievement on social media (optional)
- Sent within 24 hours of campaign completion

**Story Points:** 5  
**Priority:** High  
**Dependencies:** Story 7.1, Story 4.3

---

#### Story 7.4: In-App Notification Center
**As a** user  
**I want to** see notifications within the app  
**So that** I don't miss important updates

**Acceptance Criteria:**
- Notification icon in header with unread count badge
- Dropdown panel with recent notifications (last 30 days)
- Notification types: badge earned, leaderboard position change, campaign ending soon, new campaign from favorite cause
- Mark as read functionality
- Link to relevant page (campaign, profile, etc.)
- Push notifications disabled by default (future enhancement)

**Story Points:** 5  
**Priority:** Low  
**Dependencies:** None

---

### Epic 8: Payment Integration

#### Story 8.1: Payment Gateway Integration
**As a** sponsor  
**I want to** securely save my payment method  
**So that** I can fulfill pledges quickly at campaign end

**Acceptance Criteria:**
- Integrate Stripe (preferred) or PayPal
- Add payment method page (credit card, bank account)
- PCI DSS compliant (tokenization, no raw card storage)
- Save multiple payment methods with default selection
- Display last 4 digits and card type
- Delete payment method option

**Story Points:** 13  
**Priority:** High  
**Dependencies:** Story 1.2

---

#### Story 8.2: Pledge Payment Collection
**As a** system  
**I want to** collect payments from sponsors when campaigns end  
**So that** causes receive their funds

**Acceptance Criteria:**
- Triggered after Story 4.3 (fund calculation)
- Email sent to sponsors with payment request, amount due, and deadline (7 days)
- Payment page with pre-filled amount, saved payment method selection
- Option to adjust amount down (faith-based flexibility)
- Record payment status: pending, completed, failed
- Retry logic for failed payments (3 attempts over 7 days)
- Manual payment option (bank transfer) with instructions

**Story Points:** 13  
**Priority:** High  
**Dependencies:** Story 8.1, Story 4.3

---

#### Story 8.3: Fund Transfer to Causes
**As a** cause  
**I want to** receive collected funds in my bank account  
**So that** I can use donations for the intended purpose

**Acceptance Criteria:**
- Cause provides bank account details (account number, routing number, verification)
- Stripe Connect or PayPal Payouts integration
- Batch transfer initiated after all sponsor payments collected (or 7-day deadline)
- Transfer amount: 100% of collected pledges (no platform fee)
- Transfer status tracking: initiated, completed, failed
- Email notification to cause with transfer details
- Receipt/invoice generated for cause records
- Handle failed transfers with retry logic

**Story Points:** 13  
**Priority:** High  
**Dependencies:** Story 8.2

---

#### Story 8.4: Tax Documentation Generation
**As a** sponsor  
**I want to** download tax receipts for my donations  
**So that** I can claim deductions

**Acceptance Criteria:**
- Generate PDF receipt for each completed payment
- Include: sponsor name, amount, date, campaign name, cause EIN, tax-deductible statement
- Available on sponsor dashboard
- Email receipt automatically after payment
- Annual summary receipt (all donations for tax year)
- Compliance with IRS requirements for charitable donations

**Story Points:** 5  
**Priority:** Medium  
**Dependencies:** Story 8.2

---

### Epic 9: Search & Discovery

#### Story 9.1: Campaign Search Functionality
**As a** user  
**I want to** search for campaigns by keyword  
**So that** I can find causes I care about

**Acceptance Criteria:**
- Search bar on homepage and campaign listing page
- Search fields: campaign title, description, cause name, category tags
- Real-time suggestions as user types (debounced)
- Display search results with relevance ranking
- Highlight matched keywords in results
- No results state with suggestions
- Search history (optional, stored in browser)

**Story Points:** 8  
**Priority:** Medium  
**Dependencies:** Story 2.2

---

#### Story 9.2: Category Filtering & Navigation
**As a** contributor  
**I want to** browse campaigns by category  
**So that** I can discover causes aligned with my interests

**Acceptance Criteria:**
- Category taxonomy: Religious, Children, Food Security, Patients/Medical, Education, Environment, Animal Welfare, Disaster Relief
- Category navigation menu (sidebar or top nav)
- Multiple category tags per campaign
- Filter campaigns by one or more categories
- Display category icon and description
- Campaign count per category
- Mobile-friendly category selection

**Story Points:** 5  
**Priority:** Medium  
**Dependencies:** Story 2.2

---

#### Story 9.3: Featured & Recommended Campaigns
**As a** contributor  
**I want to** see featured campaigns and personalized recommendations  
**So that** I discover relevant campaigns easily

**Acceptance Criteria:**
- Admin can mark campaigns as "Featured" (max 5 at a time)
- Featured carousel on homepage with auto-scroll
- Recommendation algorithm (simple version):
  - Campaigns in categories user previously joined
  - Campaigns by causes user previously supported
  - Popular campaigns (most participants)
  - Ending soon campaigns
- "Recommended for You" section on dashboard
- "Trending" tag for campaigns with high recent enrollment

**Story Points:** 8  
**Priority:** Low  
**Dependencies:** Story 2.2, Story 6.1

---

### Epic 10: Infrastructure & DevOps

#### Story 10.1: Docker Compose Setup
**As a** developer  
**I want to** run the entire application stack with docker-compose  
**So that** local development and deployment are consistent

**Acceptance Criteria:**
- `docker-compose.yml` with services:
  - **Frontend:** Angular app (nginx in production, ng serve in dev)
  - **Backend:** Node.js/Express API
  - **Database:** PostgreSQL 15+ with persistent volume
  - **Redis:** For caching and session management
  - **Nginx:** Reverse proxy (production)
- Environment-specific compose files: `docker-compose.dev.yml`, `docker-compose.prod.yml`
- Health checks for all services
- Network configuration for service communication
- Volume mounts for local development (hot reload)
- `.env.example` file with all required environment variables
- README with setup instructions

**Story Points:** 13  
**Priority:** High  
**Dependencies:** None

---

#### Story 10.2: Database Schema & Migrations
**As a** developer  
**I want to** manage database schema with migrations  
**So that** schema changes are versioned and reproducible

**Acceptance Criteria:**
- Use Sequelize (or TypeORM) for ORM and migrations
- PostgreSQL schema design:
  - **users** table (id, email, password_hash, role, created_at, updated_at)
  - **contributors** table (id, user_id, display_name, age, avatar_url, parent_email)
  - **sponsors** table (id, user_id, name, payment_methods, total_donated)
  - **causes** table (id, user_id, org_name, ein, verified, mission, logo_url)
  - **campaigns** table (id, cause_id, title, description, category_tags, goal, start_date, end_date, status, image_url)
  - **campaign_enrollments** table (id, contributor_id, campaign_id, enrolled_at)
  - **habits** table (id, name, description, icon_url, disclaimer)
  - **habit_submissions** table (id, contributor_id, campaign_id, habit_id, date, submitted_at, rating)
  - **points_ledger** table (id, contributor_id, campaign_id, date, base_points, streak_multiplier, bonus_multiplier, total_points, submission_id)
  - **streaks** table (id, contributor_id, campaign_id, current_streak, longest_streak, last_submission_date)
  - **sponsor_pledges** table (id, sponsor_id, campaign_id, rate_per_point, cap_amount, pledged_at)
  - **payments** table (id, sponsor_id, pledge_id, amount, status, payment_method, completed_at)
  - **fund_distributions** table (id, campaign_id, total_points, total_pledged, amount_distributed, rollover_points, distributed_at)
  - **badges** table (id, contributor_id, badge_type, earned_at)
  - **notifications** table (id, user_id, type, content, read, created_at)
- Indexes on foreign keys, frequently queried fields (email, campaign_id, date)
- Migration scripts for each schema change
- Seed data for development (sample campaigns, habits)

**Story Points:** 13  
**Priority:** High  
**Dependencies:** Story 10.1

---

#### Story 10.3: CI/CD Pipeline
**As a** developer  
**I want to** automate testing and deployment  
**So that** code changes are deployed safely and quickly

**Acceptance Criteria:**
- GitHub Actions (or GitLab CI) workflows:
  - **Build:** Lint, compile, build Docker images
  - **Test:** Run unit tests (Jest), integration tests, E2E tests (Cypress)
  - **Deploy:** Push images to container registry, deploy to staging/production
- Separate workflows for dev, staging, production branches
- Run tests on every PR
- Code coverage reporting (80% threshold)
- Automated database migrations on deployment
- Rollback capability
- Slack/email notifications on build failure

**Story Points:** 13  
**Priority:** Medium  
**Dependencies:** Story 10.1, Story 10.2

---

#### Story 10.4: Monitoring & Logging
**As a** DevOps engineer  
**I want to** monitor application health and logs  
**So that** I can troubleshoot issues quickly

**Acceptance Criteria:**
- Centralized logging: Winston (Node.js) + ELK stack or CloudWatch
- Application metrics: Prometheus + Grafana dashboard
- Uptime monitoring: Pingdom or UptimeRobot
- Error tracking: Sentry integration
- Dashboards for: API response times, error rates, database query performance, user activity
- Alerting rules for critical errors, downtime, high latency
- Log retention policy (30 days)

**Story Points:** 8  
**Priority:** Medium  
**Dependencies:** Story 10.1

---

#### Story 10.5: Admin Panel
**As an** admin  
**I want to** manage users, campaigns, and system settings  
**So that** I can maintain platform quality

**Acceptance Criteria:**
- Admin dashboard with sections:
  - User management (search, view, ban, delete)
  - Campaign moderation (approve, feature, disable)
  - Habit library management
  - System settings (configure multipliers, lottery %, email templates)
  - Analytics (platform-wide stats)
- Role-based access control (super admin, moderator)
- Audit log for admin actions
- Bulk operations (e.g., disable multiple campaigns)

**Story Points:** 13  
**Priority:** Medium  
**Dependencies:** Story 1.1, Story 2.1

---

<a name="business-rules"></a>
## 4. Business Rules

### 4.1 User Management Rules

**BR-USER-001:** Contributors must be aged 5-8 years. Age validation on registration.

**BR-USER-002:** Contributors require parent/guardian email for account creation. Parent email receives verification and important notifications.

**BR-USER-003:** Sponsors can have multiple active pledges but must have at least one verified payment method on file.

**BR-USER-004:** Causes must provide valid EIN (or equivalent charity registration) and be admin-approved before creating campaigns.

**BR-USER-005:** Users can only have one role per account (contributor, sponsor, or cause). Separate accounts required for multiple roles.

**BR-USER-006:** Account deletion requires 30-day grace period. Data archived for audit, then anonymized after 90 days.

### 4.2 Campaign Rules

**BR-CAMP-001:** Campaign duration must be between 7 and 90 days.

**BR-CAMP-002:** Campaigns must have at least one habit selected from the approved library.

**BR-CAMP-003:** Contributors can enroll in maximum 5 active campaigns simultaneously to prevent overwhelming young users.

**BR-CAMP-004:** Campaign enrollment closes 24 hours before campaign end date.

**BR-CAMP-005:** Causes can have maximum 3 active campaigns running concurrently.

**BR-CAMP-006:** Campaign cannot be deleted if it has enrolled contributors or pledged sponsors. Must be marked inactive instead.

**BR-CAMP-007:** Featured campaigns must have admin approval and minimum 10 enrolled contributors.

### 4.3 Habit & Submission Rules

**BR-HABIT-001:** Habit submissions accepted from 00:00 to 23:59 local time on the submission date.

**BR-HABIT-002:** Contributors submit once per day per enrolled campaign. Multiple habit completions count as single submission.

**BR-HABIT-003:** Missed submission (no submission by 23:59) breaks streak and resets multiplier to 1.0x.

**BR-HABIT-004:** Submissions cannot be edited or deleted after confirmation to maintain integrity.

**BR-HABIT-005:** Contributors can view submission history but cannot backfill missed days.

**BR-HABIT-006:** Medical disclaimer displayed when selecting health-related habits (sleep, water, exercise). User must acknowledge before proceeding.

**BR-HABIT-007:** Crowd-suggested habits require minimum 50 votes and admin approval before entering library.

### 4.4 Points & Streak Rules

**BR-POINT-001:** Base points per submission = 10 points (configurable by admin).

**BR-POINT-002:** Streak multipliers applied as follows:
- 0-2 days: 1.0x
- 3-6 days: 1.2x
- 7-29 days: 1.5x
- 30+ days: 2.0x

**BR-POINT-003:** Random bonus lottery runs daily at 00:00 UTC. 10% of previous day's active contributors selected.

**BR-POINT-004:** Random bonus multiplier ranges from 2.0x to 5.0x, applied to that day's base points only.

**BR-POINT-005:** Points are campaign-specific and non-transferable between campaigns.

**BR-POINT-006:** Points cannot be redeemed for cash or prizes, only toward charitable impact.

**BR-POINT-007:** If contributor withdraws from campaign mid-way, earned points remain in campaign total but no longer contribute to leaderboard.

### 4.5 Pledge & Payment Rules

**BR-PLEDGE-001:** Sponsors can pledge any amount per point (minimum $0.01, maximum $10.00).

**BR-PLEDGE-002:** Sponsors can set optional pledge cap (maximum total donation per campaign).

**BR-PLEDGE-003:** Pledges are faith-based and non-binding. Sponsors can adjust down (but not up) at campaign end.

**BR-PLEDGE-004:** Payment window opens when campaign ends. Sponsors have 7 days to complete payment.

**BR-PLEDGE-005:** If sponsor does not pay within 7 days, pledge marked as unfulfilled. No penalty, but may affect future sponsor reputation (future feature).

**BR-PLEDGE-006:** Partial payments accepted. Unfulfilled portion calculated and reported.

**BR-PLEDGE-007:** Multiple sponsors can pledge to same campaign. Total pledge pool = sum of all sponsor commitments.

### 4.6 Fund Distribution Rules

**BR-FUND-001:** Fund distribution calculated when campaign status changes to "Ended" (after end date).

**BR-FUND-002:** Total impact = Σ(all contributor points for campaign).

**BR-FUND-003:** Expected funds = Σ(sponsor pledges × min(total_points, pledge_cap)).

**BR-FUND-004:** Actual funds = sum of completed payments within 7-day payment window.

**BR-FUND-005:** If actual funds ≥ campaign goal: Full distribution to cause, excess funds added to cause general fund.

**BR-FUND-006:** If actual funds < campaign goal: Distribute available funds, rollover shortfall points to next campaign by same cause.

**BR-FUND-007:** Rollover points have 90-day expiration. If cause doesn't launch new campaign within 90 days, points convert to general platform donation pool.

**BR-FUND-008:** Platform fee = 0% (100% of sponsor funds go to cause). Platform sustained by optional donor support or grants.

**BR-FUND-009:** Fund transfers to causes occur within 3 business days after payment window closes.

**BR-FUND-010:** Causes receive lump sum per campaign, not per individual contributor.

### 4.7 Leaderboard & Gamification Rules

**BR-LEADER-001:** Leaderboards rank contributors by current streak length (not total points) to emphasize consistency.

**BR-LEADER-002:** Ties in leaderboard resolved by earliest enrollment date.

**BR-LEADER-003:** Contributors can opt for anonymous display (display name = "Anonymous Contributor [random#]").

**BR-LEADER-004:** Leaderboard updates daily at 01:00 UTC after streak calculations complete.

**BR-LEADER-005:** Top 3 positions earn medals at campaign end: Gold (1st by total points), Silver (2nd), Bronze (3rd).

**BR-LEADER-006:** Badge milestones:
- **7-Day Streak:** Awarded on 7th consecutive day
- **30-Day Streak:** Awarded on 30th consecutive day
- **100-Day Streak:** Awarded on 100th consecutive day (across all campaigns)
- **Campaign Completer:** Awarded for completing any campaign (enrolled before midpoint, submitted 80%+ of days)
- **Top 3 Finisher:** Awarded for finishing in top 3 of any campaign
- **Generous Heart:** Awarded after participating in 5+ campaigns

**BR-LEADER-007:** Badges are permanent and displayed on contributor profile. Cannot be revoked.

### 4.8 Notification Rules

**BR-NOTIF-001:** All users receive transactional emails (registration, campaign end summary, payment reminders). Cannot unsubscribe from these.

**BR-NOTIF-002:** Marketing/promotional emails (new campaign announcements, daily reminders) are opt-in. Default = off.

**BR-NOTIF-003:** Daily habit reminders sent at user-specified time (default 7:00 PM local time).

**BR-NOTIF-004:** Contributors receive campaign end summary email within 24 hours of campaign completion.

**BR-NOTIF-005:** Sponsors receive payment request email immediately when campaign ends, with 7-day deadline reminder on day 5.

**BR-NOTIF-006:** In-app notifications expire after 30 days and are auto-marked as read.

**BR-NOTIF-007:** Email deliverability issues (bounce, spam) trigger account flag. User must update email or contact support.

### 4.9 Privacy & Safety Rules

**BR-PRIVACY-001:** Platform collects minimal personal data: email, age range, display name. No full names, addresses, or phone numbers stored for contributors.

**BR-PRIVACY-002:** COPPA compliance required for users under 13. Parental consent mandatory via parent email verification.

**BR-PRIVACY-003:** Contributor profiles default to private. Only display name, avatar, and badges visible publicly.

**BR-PRIVACY-004:** User data never sold to third parties. Explicitly stated in footer disclaimer.

**BR-PRIVACY-005:** Third-party advertisements prohibited on platform.

**BR-PRIVACY-006:** Payment information tokenized via payment gateway. No raw credit card data stored on platform servers.

**BR-PRIVACY-007:** Causes receive aggregate statistics only (total points, number of contributors). Individual contributor data not shared.

**BR-PRIVACY-008:** Data retention: Active user data retained indefinitely. Deleted user data anonymized after 90 days.

**BR-PRIVACY-009:** User can request data export (GDPR compliance) via email to support. Delivered within 30 days.

### 4.10 System Integrity Rules

**BR-SYS-001:** All timestamps stored in UTC, converted to local time for display.

**BR-SYS-002:** Database transactions used for all financial operations to ensure atomicity.

**BR-SYS-003:** Scheduled jobs (streak calculations, lottery, campaign lifecycle) run with retry logic and error logging.

**BR-SYS-004:** API rate limiting: 100 requests per minute per user to prevent abuse.

**BR-SYS-005:** File uploads (avatars, images) limited to 2MB, validated for file type (JPG, PNG only).

**BR-SYS-006:** Inappropriate content (profanity, hate speech) filtered on user-generated text fields using moderation API.

**BR-SYS-007:** Points ledger is append-only. No updates or deletes allowed to maintain audit trail.

**BR-SYS-008:** System downtime for maintenance scheduled during lowest traffic hours (3-5 AM UTC) with 48-hour advance notice.

---

<a name="design-doc"></a>
## 5. Technical Design Document

### 5.1 Architecture Overview

**Architecture Pattern:** Microservices with API Gateway

**Tech Stack:**
- **Frontend:** Angular 17+ (TypeScript, RxJS, Angular Material)
- **Backend:** Node.js 20+ with Express.js (TypeScript)
- **Database:** PostgreSQL 15+ (primary data store)
- **Cache:** Redis 7+ (session management, rate limiting, leaderboard caching)
- **Message Queue:** Redis Bull (scheduled jobs, background tasks)
- **File Storage:** AWS S3 or local volume (development)
- **Email:** SendGrid or AWS SES
- **Payments:** Stripe (preferred) or PayPal
- **Containerization:** Docker + Docker Compose
- **Reverse Proxy:** Nginx

**Deployment:**
- **Development:** docker-compose up with hot reload
- **Production:** Docker Swarm or Kubernetes (EKS, GKE) with managed PostgreSQL (RDS, Cloud SQL)

### 5.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Users                                │
│  (Contributors, Sponsors, Causes, Admins)                    │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Nginx (Reverse Proxy)                     │
│                   SSL Termination, Load Balancing            │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   Angular Frontend (SPA)                     │
│              (Served via Nginx in production)                │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼ REST API (HTTPS)
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway Service                       │
│          (Express.js - Auth, Rate Limiting, Routing)         │
└────────┬───────────────────────────────────────────────┬────┘
         │                                               │
         ▼                                               ▼
┌─────────────────┐  ┌──────────────┐  ┌──────────────────────┐
│  Auth Service   │  │   Campaign   │  │  Habit Service       │
│  (JWT, OAuth)   │  │   Service    │  │ (Submissions, Points)│
└────────┬────────┘  └──────┬───────┘  └──────────┬───────────┘
         │                  │                      │
         ▼                  ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database Cluster                   │
│  (Users, Campaigns, Habits, Points Ledger, Payments)         │
└─────────────────────────────────────────────────────────────┘
         │                  │                      │
         ▼                  ▼                      ▼
┌─────────────────┐  ┌──────────────┐  ┌──────────────────────┐
│  Payment Svc    │  │ Notification │  │  Analytics Service   │
│ (Stripe/PayPal) │  │   Service    │  │   (Dashboard Data)   │
└────────┬────────┘  └──────┬───────┘  └──────────────────────┘
         │                  │                      
         ▼                  ▼                      
┌─────────────────┐  ┌──────────────┐             
│  Redis Cache    │  │  Email Queue │             
│  (Sessions,     │  │  (SendGrid/  │             
│   Leaderboard)  │  │   AWS SES)   │             
└─────────────────┘  └──────────────┘             
         │                                        
         ▼                                        
┌─────────────────────────────────────────────────┐
│        Background Job Worker (Bull Queue)       │
│  (Streak Calculation, Lottery, Fund Distribution)│
└─────────────────────────────────────────────────┘
```

### 5.3 Database Schema (PostgreSQL)

#### Core Tables

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('contributor', 'sponsor', 'cause', 'admin')),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

**contributors**
```sql
CREATE TABLE contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  display_name VARCHAR(100) NOT NULL,
  age INTEGER CHECK (age >= 5 AND age <= 8),
  avatar_url VARCHAR(500),
  parent_email VARCHAR(255) NOT NULL,
  anonymous_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_contributors_user_id ON contributors(user_id);
```

**sponsors**
```sql
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255),
  total_donated DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sponsors_user_id ON sponsors(user_id);
```

**causes**
```sql
CREATE TABLE causes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  org_name VARCHAR(255) NOT NULL,
  ein VARCHAR(50),
  verified BOOLEAN DEFAULT FALSE,
  mission TEXT,
  logo_url VARCHAR(500),
  bank_account_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_causes_verified ON causes(verified);
```

**campaigns**
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cause_id UUID REFERENCES causes(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_tags TEXT[], -- Array of tags
  goal_amount DECIMAL(10,2),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'ended', 'completed')),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_cause_id ON campaigns(cause_id);
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);
CREATE INDEX idx_campaigns_category ON campaigns USING GIN(category_tags);
```

**habits**
```sql
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_url VARCHAR(500),
  disclaimer TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**campaign_enrollments**
```sql
CREATE TABLE campaign_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID REFERENCES contributors(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(contributor_id, campaign_id)
);
CREATE INDEX idx_enrollments_contributor ON campaign_enrollments(contributor_id);
CREATE INDEX idx_enrollments_campaign ON campaign_enrollments(campaign_id);
```

**habit_submissions**
```sql
CREATE TABLE habit_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID REFERENCES contributors(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  habit_id UUID REFERENCES habits(id),
  submission_date DATE NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rating VARCHAR(20), -- 'great', 'good', 'okay', 'hard'
  UNIQUE(contributor_id, campaign_id, submission_date)
);
CREATE INDEX idx_submissions_contributor_campaign ON habit_submissions(contributor_id, campaign_id);
CREATE INDEX idx_submissions_date ON habit_submissions(submission_date);
```

**streaks**
```sql
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID REFERENCES contributors(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_submission_date DATE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(contributor_id, campaign_id)
);
CREATE INDEX idx_streaks_campaign ON streaks(campaign_id, current_streak DESC);
```

**points_ledger**
```sql
CREATE TABLE points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID REFERENCES contributors(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  submission_id UUID REFERENCES habit_submissions(id),
  submission_date DATE NOT NULL,
  base_points INTEGER DEFAULT 10,
  streak_multiplier DECIMAL(3,2) DEFAULT 1.00,
  bonus_multiplier DECIMAL(3,2) DEFAULT 1.00,
  total_points DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_ledger_campaign ON points_ledger(campaign_id);
CREATE INDEX idx_ledger_contributor ON points_ledger(contributor_id);
```

**sponsor_pledges**
```sql
CREATE TABLE sponsor_pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  rate_per_point DECIMAL(5,2) NOT NULL,
  cap_amount DECIMAL(10,2),
  pledged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_pledges_campaign ON sponsor_pledges(campaign_id);
```

**payments**
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id),
  pledge_id UUID REFERENCES sponsor_pledges(id),
  campaign_id UUID REFERENCES campaigns(id),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_intent_id VARCHAR(255),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_sponsor ON payments(sponsor_id);
```

**fund_distributions**
```sql
CREATE TABLE fund_distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  total_points DECIMAL(12,2) NOT NULL,
  total_pledged DECIMAL(12,2) NOT NULL,
  total_collected DECIMAL(12,2) NOT NULL,
  amount_distributed DECIMAL(12,2) NOT NULL,
  rollover_points DECIMAL(12,2) DEFAULT 0,
  stripe_transfer_id VARCHAR(255),
  distributed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_distributions_campaign ON fund_distributions(campaign_id);
```

**badges**
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID REFERENCES contributors(id) ON DELETE CASCADE,
  badge_type VARCHAR(50) NOT NULL,
  metadata JSONB, -- e.g., {"campaign_id": "...", "streak_days": 30}
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_badges_contributor ON badges(contributor_id);
```

**notifications**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link VARCHAR(500),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, read, created_at);
```

### 5.4 API Endpoints Design

**Base URL:** `https://api.habitsforgood.com/v1`

#### Authentication Endpoints

```
POST   /auth/register           # Register new user
POST   /auth/login              # Login (JWT token)
POST   /auth/logout             # Logout
POST   /auth/forgot-password    # Request password reset
POST   /auth/reset-password     # Reset password with token
POST   /auth/verify-email       # Verify email with token
GET    /auth/me                 # Get current user profile
```

#### User Endpoints

```
GET    /users/:id               # Get user by ID
PUT    /users/:id               # Update user profile
DELETE /users/:id               # Delete user account
POST   /users/:id/avatar        # Upload avatar
```

#### Contributor Endpoints

```
GET    /contributors/:id        # Get contributor profile
GET    /contributors/:id/dashboard  # Get dashboard data
GET    /contributors/:id/campaigns  # Get enrolled campaigns
GET    /contributors/:id/badges     # Get earned badges
GET    /contributors/:id/stats      # Get habit improvement stats
```

#### Campaign Endpoints

```
GET    /campaigns               # List campaigns (with filters)
POST   /campaigns               # Create campaign (cause only)
GET    /campaigns/:id           # Get campaign details
PUT    /campaigns/:id           # Update campaign (cause only)
DELETE /campaigns/:id           # Delete campaign (cause only)
POST   /campaigns/:id/enroll    # Enroll in campaign (contributor)
GET    /campaigns/:id/leaderboard   # Get campaign leaderboard
GET    /campaigns/search?q=     # Search campaigns
GET    /campaigns/categories    # List categories
```

#### Habit Endpoints

```
GET    /habits                  # List all active habits
GET    /habits/:id              # Get habit details
POST   /habits                  # Create habit (admin only)
PUT    /habits/:id              # Update habit (admin only)
POST   /habits/suggest          # Suggest new habit (contributor)
GET    /habits/suggestions      # List pending suggestions (admin)
```

#### Submission Endpoints

```
POST   /submissions             # Submit daily habits
GET    /submissions/:contributorId/:campaignId  # Get submission history
GET    /submissions/:contributorId/:campaignId/today  # Check today's submission
```

#### Points & Streaks Endpoints

```
GET    /points/:contributorId/:campaignId       # Get points for campaign
GET    /streaks/:contributorId/:campaignId      # Get streak info
GET    /leaderboard/:campaignId                 # Get campaign leaderboard
```

#### Sponsor Endpoints

```
GET    /sponsors/:id/dashboard  # Get sponsor dashboard
POST   /sponsors/:id/pledge     # Create pledge
GET    /sponsors/:id/pledges    # Get all pledges
PUT    /pledges/:id             # Update pledge
DELETE /pledges/:id             # Cancel pledge
GET    /sponsors/:id/payments   # Get payment history
```

#### Payment Endpoints

```
POST   /payments/setup-intent   # Create Stripe SetupIntent
POST   /payments/add-method     # Add payment method
GET    /payments/methods        # List payment methods
DELETE /payments/methods/:id    # Remove payment method
POST   /payments/:pledgeId/pay  # Complete payment for pledge
GET    /payments/:id/receipt    # Download payment receipt
```

#### Cause Endpoints

```
GET    /causes                  # List verified causes
GET    /causes/:id              # Get cause details
GET    /causes/:id/dashboard    # Get cause dashboard
GET    /causes/:id/campaigns    # Get cause's campaigns
POST   /causes/:id/invite       # Invite sponsors
```

#### Notification Endpoints

```
GET    /notifications           # Get user notifications
PUT    /notifications/:id/read  # Mark as read
PUT    /notifications/read-all  # Mark all as read
DELETE /notifications/:id       # Delete notification
```

#### Admin Endpoints

```
GET    /admin/users             # List all users
PUT    /admin/users/:id/ban     # Ban user
GET    /admin/campaigns/pending # List pending approvals
PUT    /admin/campaigns/:id/approve  # Approve campaign
PUT    /admin/campaigns/:id/feature  # Feature campaign
GET    /admin/analytics         # Get platform analytics
POST   /admin/habits/:id/approve     # Approve suggested habit
```

### 5.5 Backend Service Architecture

#### Service Breakdown

**1. Auth Service** (`/services/auth`)
- User registration, login, JWT token generation
- OAuth integration (Google, Facebook)
- Password reset, email verification
- Middleware: JWT validation, role-based access control

**2. Campaign Service** (`/services/campaigns`)
- CRUD operations for campaigns
- Enrollment logic
- Search and filtering
- Campaign lifecycle state management (scheduled job triggers)

**3. Habit Service** (`/services/habits`)
- Habit library management
- Daily submission processing
- Streak calculation (scheduled job)
- Points ledger writes

**4. Leaderboard Service** (`/services/leaderboards`)
- Real-time leaderboard queries (cached in Redis)
- Badge awarding logic
- Medal calculation at campaign end

**5. Payment Service** (`/services/payments`)
- Stripe/PayPal integration
- Pledge management
- Payment collection orchestration
- Fund distribution to causes

**6. Notification Service** (`/services/notifications`)
- Email sending (SendGrid/SES)
- In-app notification creation
- Notification preferences management
- Template rendering

**7. Analytics Service** (`/services/analytics`)
- Dashboard data aggregation
- Contributor stats (habit improvement charts)
- Sponsor impact metrics
- Cause performance reports

**8. Background Job Worker** (`/workers`)
- Daily streak calculation (runs at 00:30 UTC)
- Random bonus lottery (runs at 00:00 UTC)
- Campaign lifecycle transitions (runs hourly)
- Fund distribution processing (triggered on campaign end)
- Payment reminder emails (scheduled)

#### Shared Modules

**Database Module** (`/lib/database`)
- PostgreSQL connection pool (using `pg` or Sequelize)
- Query helpers, transaction wrappers
- Migration runner

**Cache Module** (`/lib/cache`)
- Redis connection
- Cache wrapper with TTL management
- Leaderboard caching (sorted sets)

**Queue Module** (`/lib/queue`)
- Bull queue initialization
- Job processors
- Retry and error handling

**Email Module** (`/lib/email`)
- SendGrid/SES client
- Template loading (Handlebars)
- Email composition helpers

**Logger Module** (`/lib/logger`)
- Winston logger configuration
- Structured logging (JSON format)
- Log levels: error, warn, info, debug

### 5.6 Frontend Architecture (Angular)

#### Module Structure

**Core Modules:**
- `AppModule` - Root module
- `CoreModule` - Singleton services (AuthService, HttpInterceptor)
- `SharedModule` - Reusable components, pipes, directives

**Feature Modules:**
- `AuthModule` - Login, register, forgot password components
- `ContributorModule` - Dashboard, campaign browse, habit submission
- `SponsorModule` - Sponsor dashboard, pledge management
- `CauseModule` - Campaign creation, cause dashboard
- `CampaignModule` - Campaign detail, leaderboard, enrollment
- `AdminModule` - Admin panel (lazy-loaded)

#### Key Components

**Contributor Flow:**
```
ContributorDashboardComponent
├── ActiveCampaignsComponent
│   ├── CampaignCardComponent (reusable)
│   └── StreakIndicatorComponent
├── BadgeCollectionComponent
├── HabitImprovementChartComponent (Chart.js)
└── QuickSubmitComponent
```

**Habit Submission:**
```
HabitSubmissionComponent
├── CampaignSelectorComponent
├── HabitChecklistComponent
│   └── HabitItemComponent (toggle, smiley rating)
└── SubmissionConfirmationModalComponent
```

**Campaign Browse:**
```
CampaignBrowseComponent
├── SearchBarComponent
├── CategoryFilterComponent
├── CampaignListComponent
│   └── CampaignCardComponent
└── PaginationComponent
```

#### State Management

Use **NgRx** (or Angular Services with BehaviorSubject for simpler approach):

**States:**
- `AuthState` - Current user, JWT token, login status
- `CampaignState` - Loaded campaigns, filters, selected campaign
- `SubmissionState` - Today's submissions, pending uploads
- `NotificationState` - Unread notifications, notification list

**Effects:**
- API calls triggered by actions
- Error handling with user-friendly messages
- Loading state management

#### Routing Strategy

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'contributor', 
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'contributor' },
    children: [
      { path: 'dashboard', component: ContributorDashboardComponent },
      { path: 'campaigns', component: CampaignBrowseComponent },
      { path: 'submit', component: HabitSubmissionComponent },
      { path: 'profile', component: ContributorProfileComponent }
    ]
  },
  { 
    path: 'sponsor',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'sponsor' },
    children: [
      { path: 'dashboard', component: SponsorDashboardComponent },
      { path: 'pledges', component: PledgeManagementComponent }
    ]
  },
  { 
    path: 'campaigns/:id', 
    component: CampaignDetailComponent 
  },
  { 
    path: 'admin', 
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', component: NotFoundComponent }
];
```

### 5.7 Docker Compose Configuration

#### docker-compose.yml (Development)

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: habits_postgres
    environment:
      POSTGRES_DB: habitsforgood
      POSTGRES_USER: habituser
      POSTGRES_PASSWORD: ${DB_PASSWORD:-devpassword}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U habituser -d habitsforgood"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - habits_network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: habits_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    networks:
      - habits_network

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: habits_backend
    environment:
      NODE_ENV: development
      PORT: 3000
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: habitsforgood
      DB_USER: habituser
      DB_PASSWORD: ${DB_PASSWORD:-devpassword}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JWT_SECRET: ${JWT_SECRET:-dev_jwt_secret_change_in_prod}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      SENDGRID_API_KEY: ${SENDGRID_API_KEY}
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: npm run dev
    networks:
      - habits_network

  # Frontend Angular App
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: habits_frontend
    environment:
      API_URL: http://localhost:3000/v1
    ports:
      - "4200:4200"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    command: npm start
    networks:
      - habits_network

  # Background Job Worker
  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: habits_worker
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: habitsforgood
      DB_USER: habituser
      DB_PASSWORD: ${DB_PASSWORD:-devpassword}
      REDIS_HOST: redis
      REDIS_PORT: 6379
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: npm run worker
    networks:
      - habits_network

volumes:
  postgres_data:
  redis_data:

networks:
  habits_network:
    driver: bridge
```

#### docker-compose.prod.yml (Production Override)

```yaml
version: '3.8'

services:
  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: habits_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - frontend_dist:/usr/share/nginx/html
    depends_on:
      - backend
      - frontend
    networks:
      - habits_network

  postgres:
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data_prod:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      NODE_ENV: production
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      SENDGRID_API_KEY: ${SENDGRID_API_KEY}
    command: npm run start:prod

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    volumes:
      - frontend_dist:/app/dist

  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      NODE_ENV: production
      DB_PASSWORD: ${DB_PASSWORD}
    command: npm run worker:prod

volumes:
  postgres_data_prod:
  frontend_dist:
```

### 5.8 Security Considerations

**Authentication & Authorization:**
- JWT tokens with 24-hour expiration, refresh tokens with 30-day expiration
- HTTPS only in production (redirect HTTP to HTTPS)
- Password hashing with bcrypt (10 salt rounds)
- Role-based access control (RBAC) middleware
- OAuth 2.0 for social login (Google, Facebook)

**Data Protection:**
- Encrypt sensitive data at rest (payment methods via Stripe tokenization)
- SQL injection prevention (parameterized queries)
- XSS protection (Angular's built-in sanitization)
- CSRF protection (SameSite cookies, CSRF tokens)
- Rate limiting (100 req/min per IP, 1000 req/hour per user)

**COPPA Compliance:**
- Parental consent via email verification for contributors under 13
- Minimal data collection (no phone, address, or full name)
- Clear privacy policy in simple language
- Data export and deletion capabilities

**Payment Security:**
- PCI DSS compliance via Stripe/PayPal (no raw card data stored)
- Webhook signature verification
- Idempotency keys for payment operations

**Monitoring & Auditing:**
- Log all authentication attempts
- Audit trail for financial transactions
- Alert on suspicious activity (multiple failed logins, unusual payment patterns)

### 5.9 Performance Optimization

**Database:**
- Connection pooling (max 20 connections)
- Query optimization (use EXPLAIN ANALYZE)
- Indexes on foreign keys and frequently queried columns
- Read replicas for analytics queries
- Partitioning for points_ledger table (by month)

**Caching:**
- Redis for session storage (TTL: 24 hours)
- Leaderboard caching (TTL: 1 hour, refresh on submission)
- Campaign list caching (TTL: 5 minutes)
- API response caching for public endpoints (ETags)

**Frontend:**
- Lazy loading for admin module
- Angular's OnPush change detection strategy
- Virtual scrolling for long lists
- Image optimization (WebP format, lazy loading)
- Service worker for offline capability (future)

**CDN:**
- Serve static assets (images, fonts) via CloudFront or similar
- Gzip compression for text assets
- Browser caching headers

---

<a name="copilot-instructions"></a>
## 6. GitHub Copilot Instructions

### Project Context
This is a full-stack charitable habit-tracking platform called "Habits for Good" where children (ages 5-8) build healthy habits to earn points that translate into sponsor donations for charitable causes.

**Tech Stack:**
- **Frontend:** Angular 17+, TypeScript, Angular Material, RxJS
- **Backend:** Node.js 20+, Express.js, TypeScript
- **Database:** PostgreSQL 15+ (via Docker)
- **Cache:** Redis 7+
- **Deployment:** Docker + Docker Compose

### Coding Standards

#### TypeScript (Backend & Frontend)
- Use strict TypeScript configuration (`"strict": true`)
- Prefer `interface` over `type` for object shapes
- Use `async/await` instead of `.then()` for promises
- Always define return types for functions
- Use descriptive variable names (avoid single letters except in loops)
- Organize imports: external libraries first, then internal modules

**Example:**
```typescript
// Good
interface CreateCampaignDto {
  title: string;
  description: string;
  causeId: string;
  startDate: Date;
  endDate: Date;
}

async function createCampaign(dto: CreateCampaignDto): Promise<Campaign> {
  // implementation
}

// Avoid
function createCampaign(data: any) {
  return new Promise((resolve) => {
    // implementation
  });
}
```

#### Backend Patterns

**Service Layer Pattern:**
```typescript
// services/campaign.service.ts
export class CampaignService {
  async create(dto: CreateCampaignDto): Promise<Campaign> {
    // Business logic here
  }
  
  async findById(id: string): Promise<Campaign | null> {
    // Database query
  }
}
```

**Controller Pattern:**
```typescript
// controllers/campaign.controller.ts
export class CampaignController {
  constructor(private campaignService: CampaignService) {}
  
  async createCampaign(req: Request, res: Response): Promise<void> {
    try {
      const campaign = await this.campaignService.create(req.body);
      res.status(201).json(campaign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

**Middleware Pattern:**
```typescript
// middleware/auth.middleware.ts
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

#### Angular Patterns

**Component Structure:**
```typescript
// contributor-dashboard.component.ts
@Component({
  selector: 'app-contributor-dashboard',
  templateUrl: './contributor-dashboard.component.html',
  styleUrls: ['./contributor-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContributorDashboardComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;
  
  constructor(
    private campaignService: CampaignService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.campaigns$ = this.campaignService.getEnrolledCampaigns();
  }
}
```

**Service Pattern:**
```typescript
// services/campaign.service.ts
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getEnrolledCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.apiUrl}/campaigns/enrolled`);
  }
}
```

**Use RxJS Operators:**
```typescript
this.campaigns$ = this.campaignService.getAll().pipe(
  map(campaigns => campaigns.filter(c => c.status === 'active')),
  catchError(error => {
    console.error('Error loading campaigns:', error);
    return of([]);
  })
);
```

#### Database Queries (PostgreSQL)

**Use Parameterized Queries:**
```typescript
// Good
const result = await pool.query(
  'SELECT * FROM campaigns WHERE id = $1 AND status = $2',
  [campaignId, 'active']
);

// Avoid (SQL injection risk)
const result = await pool.query(
  `SELECT * FROM campaigns WHERE id = '${campaignId}'`
);
```

**Transaction Pattern:**
```typescript
async function enrollInCampaign(contributorId: string, campaignId: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query(
      'INSERT INTO campaign_enrollments (contributor_id, campaign_id) VALUES ($1, $2)',
      [contributorId, campaignId]
    );
    
    await client.query(
      'UPDATE campaigns SET participant_count = participant_count + 1 WHERE id = $1',
      [campaignId]
    );
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
```

### Error Handling

**Backend:**
```typescript
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational: boolean = true
  ) {
    super(message);
  }
}

// Usage
if (!campaign) {
  throw new AppError('Campaign not found', 404);
}
```

**Frontend:**
```typescript
this.campaignService.getById(id).pipe(
  catchError((error: HttpErrorResponse) => {
    if (error.status === 404) {
      this.router.navigate(['/not-found']);
    } else {
      this.snackBar.open('Error loading campaign', 'Close', { duration: 3000 });
    }
    return throwError(() => error);
  })
).subscribe();
```

### Testing Guidelines

**Unit Tests (Jest):**
```typescript
describe('CampaignService', () => {
  let service: CampaignService;
  let mockRepository: jest.Mocked<CampaignRepository>;
  
  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      create: jest.fn()
    } as any;
    service = new CampaignService(mockRepository);
  });
  
  it('should create a campaign', async () => {
    const dto = { title: 'Test Campaign', causeId: '123' };
    mockRepository.create.mockResolvedValue({ id: '456', ...dto });
    
    const result = await service.create(dto);
    
    expect(result.id).toBe('456');
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
  });
});
```

**Integration Tests:**
```typescript
describe('POST /campaigns', () => {
  it('should create a campaign and return 201', async () => {
    const response = await request(app)
      .post('/v1/campaigns')
      .send({
        title: 'Help Local Food Bank',
        causeId: testCauseId,
        startDate: '2025-01-01',
        endDate: '2025-01-31'
      })
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Help Local Food Bank');
  });
});
```

### Environment Variables

Always use environment variables for sensitive data:

```typescript
// backend/.env.example
NODE_ENV=development
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=habitsforgood
DB_USER=habituser
DB_PASSWORD=your_password_here
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
SENDGRID_API_KEY=SG.xxx
```

```typescript
// frontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/v1'
};
```

### Docker Best Practices

**Backend Dockerfile.dev:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

**Backend Dockerfile.prod:**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Git Commit Messages

Follow conventional commits:
```
feat(campaigns): add campaign search functionality
fix(auth): resolve JWT expiration issue
docs(readme): update installation instructions
refactor(habits): simplify streak calculation logic
test(payments): add unit tests for Stripe integration
chore(deps): update Angular to v17.1
```

### Code Review Checklist

When generating or reviewing code, ensure:
- [ ] TypeScript strict mode compliance
- [ ] Proper error handling (try-catch, error middleware)
- [ ] Input validation (DTOs, Joi/Yup schemas)
- [ ] SQL injection prevention (parameterized queries)
- [ ] Authentication/authorization checks
- [ ] Unit test coverage for business logic
- [ ] Responsive design for mobile (Angular Material breakpoints)
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Environment variables for secrets
- [ ] Logging for debugging (Winston)

### Common Tasks

**Generate a new Angular component:**
```bash
ng generate component features/campaign/campaign-card --module=campaign
```

**Generate a new backend service:**
```bash
mkdir -p backend/src/services
touch backend/src/services/campaign.service.ts
```

**Run database migrations:**
```bash
npm run migrate:latest  # backend
```

**Start development environment:**
```bash
docker-compose up
```

**Run tests:**
```bash
npm test  # backend (Jest)
ng test    # frontend (Jasmine/Karma)
```

### Accessibility Guidelines (for kids 5-8)

- Use large, colorful buttons (min 48x48px touch target)
- High contrast text (WCAG AAA preferred)
- Icons with text labels (not icon-only)
- Simple language (reading level: grade 1-2)
- Animations for positive feedback (celebrate submissions)
- Voice guidance option (future enhancement)
- Parent mode toggle for complex actions

### Performance Targets

- Initial page load: < 2 seconds on 3G
- API response time (p95): < 500ms
- Database query time (p95): < 100ms
- Leaderboard refresh: < 1 second
- Image load: progressive (lazy loading)

---

## 7. Summary & Next Steps

This comprehensive documentation suite provides:

✅ **Product Requirements Document** - Vision, features, success metrics  
✅ **Functional Requirements Document** - Detailed functional specs  
✅ **JIRA Work Breakdown** - 50+ user stories across 10 epics  
✅ **Business Rules** - 60+ rules governing system behavior  
✅ **Technical Design Document** - Architecture, database schema, API endpoints, Docker setup  
✅ **Copilot Instructions** - Coding standards and development guidelines  

### Recommended Development Phases

**Phase 1: Foundation (Weeks 1-3)**
- Epic 10: Infrastructure & DevOps (Docker, database, CI/CD)
- Epic 1: User Authentication & Account Management
- Epic 2: Campaign Management System (basic CRUD)

**Phase 2: Core Features (Weeks 4-7)**
- Epic 3: Habit Tracking & Submission
- Epic 4: Points, Streaks & Impact Calculation
- Epic 9: Search & Discovery

**Phase 3: Engagement (Weeks 8-10)**
- Epic 5: Leaderboards & Gamification
- Epic 6: Dashboard & Analytics
- Epic 7: Notification System

**Phase 4: Monetization (Weeks 11-13)**
- Epic 8: Payment Integration
- End-to-end testing
- Security audit

**Phase 5: Launch Prep (Week 14)**
- Performance optimization
- User acceptance testing with real children/parents
- Documentation finalization
- Production deployment

### Ready to Build!

This documentation is ready for:
- **Development teams** to start coding
- **Designers** to create UI mockups based on wireframes
- **Project managers** to import JIRA stories and estimate timeline
- **Stakeholders** to review and approve requirements

Good luck building Habits for Good! 🚀