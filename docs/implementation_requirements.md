# Habits for Good - Implementation Requirements Summary

## Key Technical Requirements

### 🎯 Core Architecture Changes

**1. User Roles Redefined**
- **Students (Kids 5-8):** Enroll in campaigns, complete habits, compete on leaderboards
- **Admins (Teachers/Guides):** Create campaigns, define habits, manage leaderboards, award bonuses, create flash quests
- **Sponsors & Causes:** Same as before (funding and charitable organizations)

**2. Admin Capabilities**
Admins are NOT just moderators—they are campaign managers with full control:
- ✅ Create habit campaigns with custom habit definitions per campaign
- ✅ Define campaign-specific habits (not limited to global library)
- ✅ Manage leaderboards (view, moderate, highlight students)
- ✅ Award bonus rewards to students
- ✅ Create flash quests (time-limited bonus challenges)
- ✅ View detailed student analytics
- ✅ Pause/modify/end campaigns

### 📱 Responsive Web Application

**Mobile-First Design**
- Must work on phone screens (320px minimum width)
- Touch-friendly UI (44x44px minimum tap targets)
- Responsive breakpoints: Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+)
- No native mobile apps—web-only for MVP

---

## 🛠️ Technology Stack (Non-Negotiable)

### Database
```yaml
Database: PostgreSQL 15+
ORM: TypeORM
Migrations: TypeORM migration system
Schema Management:
  - 001_init_schema.sql (initial schema setup)
  - 002_seed.sql (seed data for development/testing)
```

**Important:** Always reference TypeORM documentation when generating:
- Entity definitions
- Migration files
- Query builders
- Relationships

### Backend
```yaml
Runtime: Node.js 20+
Framework: Express.js
Language: TypeScript (strict mode)
Validation: class-validator + class-transformer
Testing:
  - Unit Tests: Jest
  - API Tests: Supertest
  - E2E Tests: Playwright
Linting: ESLint + TSLint
```

### Frontend
```yaml
Framework: Angular (latest stable version, currently 17+)
Language: TypeScript (strict mode)
UI Library: Angular Material + Custom Components (Duolingo-inspired)
Testing:
  - Unit Tests: Jasmine/Karma
  - E2E Tests: Playwright
Linting: ESLint + TSLint
```

### DevOps
```yaml
Containerization: Docker + Docker Compose
No npm Commands: All operations via Docker or Makefile
CI/CD:
  - Automated linting
  - Unit tests
  - Integration tests
  - E2E tests (Playwright)
  - Docker Compose log validation (must be error-free)
```

---

## 🎭 Testing Requirements

### Playwright E2E Testing

**CRITICAL:** Every interactive element MUST have `data-test-id` attribute:

```html
<!-- ✅ Correct -->
<button data-test-id="campaign-enroll-button">Enroll</button>
<input data-test-id="habit-submission-toggle" type="checkbox" />
<div data-test-id="campaign-card-123" class="campaign-card">...</div>

<!-- ❌ Wrong -->
<button class="enroll-btn">Enroll</button>
<input id="habit-toggle" type="checkbox" />
```

**Naming Convention:**
- Format: `data-test-id="component-action-identifier"`
- Examples:
  - `data-test-id="login-submit-button"`
  - `data-test-id="campaign-card-${campaignId}"`
  - `data-test-id="habit-submission-${habitId}"`
  - `data-test-id="leaderboard-row-${rank}"`
  - `data-test-id="admin-create-quest-button"`

### Test Coverage Requirements
- **Unit Tests:** 80%+ code coverage
- **Integration Tests:** All API endpoints
- **E2E Tests:** All user journeys (student enrollment flow, admin campaign creation, habit submission, etc.)

---

## 📁 Folder Structure

```
habits-for-good/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   ├── services/              # Business logic
│   │   ├── entities/              # TypeORM entities
│   │   ├── migrations/            # TypeORM migrations
│   │   ├── middleware/            # Express middleware
│   │   ├── routes/                # API routes
│   │   ├── utils/                 # Helper functions
│   │   ├── config/                # Configuration files
│   │   └── server.ts              # Entry point
│   ├── tests/
│   │   ├── unit/                  # Jest unit tests
│   │   ├── integration/           # Supertest API tests
│   │   └── e2e/                   # Playwright E2E tests
│   ├── docs/                      # Backend documentation
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.js
│   └── jest.config.js
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/              # Singleton services, guards
│   │   │   ├── shared/            # Reusable components, pipes, directives
│   │   │   ├── features/          # Feature modules
│   │   │   │   ├── auth/
│   │   │   │   ├── student/       # Student dashboard, campaigns, submissions
│   │   │   │   ├── admin/         # Admin dashboard, campaign management
│   │   │   │   ├── sponsor/
│   │   │   │   └── cause/
│   │   │   └── app.component.ts
│   │   ├── assets/                # Images, icons, fonts
│   │   ├── environments/
│   │   └── styles/                # Global styles, theming
│   ├── tests/
│   │   ├── unit/                  # Jasmine/Karma tests
│   │   └── e2e/                   # Playwright E2E tests
│   ├── docs/                      # Frontend documentation
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   ├── package.json
│   ├── tsconfig.json
│   ├── angular.json
│   └── .eslintrc.js
│
├── database/
│   ├── 001_init_schema.sql       # Initial schema (TypeORM-compatible)
│   └── 002_seed.sql               # Seed data
│
├── docs/
│   ├── PRD.md                     # Product Requirements Document
│   ├── FRD.md                     # Functional Requirements Document
│   ├── STYLE_GUIDE.md             # UI/UX Style Guide
│   ├── API_SPEC.md                # API Documentation
│   ├── ARCHITECTURE.md            # System Architecture
│   └── DEPLOYMENT.md              # Deployment Guide
│
├── docker-compose.yml             # Base compose file
├── docker-compose.dev.yml         # Development overrides
├── docker-compose.prod.yml        # Production overrides
├── Makefile                       # Common commands
├── .env.example                   # Environment variables template
└── README.md                      # Project overview
```

---

## 🔧 Makefile Commands

Create a `Makefile` with these essential commands:

```makefile
# Build all Docker containers
build:
	docker-compose build

# Start development environment
up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Stop all services
down:
	docker-compose down

# Run database migrations
migrate:
	docker-compose exec backend npm run migration:run

# Seed database
seed:
	docker-compose exec backend npm run seed

# Run unit tests
test-unit:
	docker-compose exec backend npm run test
	docker-compose exec frontend npm run test

# Run E2E tests
test-e2e:
	docker-compose exec frontend npm run e2e

# Run linting
lint:
	docker-compose exec backend npm run lint
	docker-compose exec frontend npm run lint

# View logs
logs:
	docker-compose logs -f

# Check logs for errors
check-logs:
	docker-compose logs | grep -i "error"

# Clean up (remove containers, volumes, images)
clean:
	docker-compose down -v --rmi all

# Reset database
db-reset:
	docker-compose exec postgres psql -U habituser -d habitsforgood -f /database/001_init_schema.sql
	docker-compose exec backend npm run seed

# Validate environment (check for errors)
validate:
	make lint
	make test-unit
	make check-logs
```

---

## 🗄️ Database Setup (TypeORM Compatible)

### 001_init_schema.sql

**IMPORTANT:** This script must be TypeORM-compatible:
- Use standard PostgreSQL syntax
- Include all tables TypeORM entities will map to
- Use UUID primary keys: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- Include timestamp columns: `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
- Define foreign keys with proper constraints
- Create necessary indexes

**Example Structure:**
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'admin', 'sponsor', 'cause', 'system_admin')),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  display_name VARCHAR(100) NOT NULL,
  age INTEGER CHECK (age >= 5 AND age <= 8),
  avatar_url VARCHAR(500),
  parent_email VARCHAR(255) NOT NULL,
  anonymous_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  role_title VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ... (continue with all tables)
```

### 002_seed.sql

Populate tables with development/testing data:
- Sample admin accounts
- Sample student accounts
- Sample campaigns with habits
- Sample enrollments
- Sample submissions

---

## 🚀 Development Workflow

### 1. Initial Setup
```bash
# Clone repository
git clone <repo-url>
cd habits-for-good

# Copy environment template
cp .env.example .env

# Build containers
make build

# Start services
make up

# In another terminal, run migrations
make migrate

# Seed database
make seed
```

### 2. Development Cycle
```bash
# Start development environment
make up

# View logs in real-time
make logs

# Make code changes (hot reload enabled in dev mode)

# Run linting
make lint

# Run unit tests
make test-unit

# Check logs for errors
make check-logs
```

### 3. Testing
```bash
# Run E2E tests
make test-e2e

# Visual testing: Open browser
# Navigate to http://localhost:4200
# Manually test implemented features
```

### 4. Pre-Commit Checklist
- ✅ No linting errors: `make lint`
- ✅ Unit tests pass: `make test-unit`
- ✅ No Docker Compose errors: `make check-logs`
- ✅ E2E tests pass: `make test-e2e`
- ✅ Visual testing complete (browser navigation)

---

## 🎨 UI/UX Requirements (Duolingo-Inspired)

### Color Palette (Secondary Colors)
- **Macaw (Blue):** `#1CB0F6` - Information, water habits
- **Cardinal (Red):** `#FF4B4B` - Excitement, energy
- **Bee (Yellow):** `#FFC800` - Achievements, medals
- **Fox (Orange):** `#FF9600` - Warmth, urgency
- **Beetle (Purple):** `#CE82FF` - Special moments, badges
- **Humpback (Deep Blue):** `#2B70C9` - Professional, sponsor dashboards

### Primary Brand Color
- **Feather Green:** `#58CC02` - Main CTAs, success, growth

### Design Principles
- **Rounded everything:** No sharp edges (border-radius: 12px+)
- **Playful animations:** Micro-interactions on every action
- **Kid-friendly:** Large text (16px min), high contrast, simple language
- **Mobile-first:** Touch targets 44x44px minimum

---

## 🔐 Security Requirements

### Authentication
- JWT tokens (24-hour expiration)
- Refresh tokens (30-day expiration)
- HTTPS only in production
- RBAC for admin functions

### Data Protection
- COPPA compliance for children under 13
- Parental email verification required for students
- Minimal data collection (no addresses, phone numbers)
- Password hashing with bcrypt (10 rounds)

---

## 📊 Monitoring & Quality Assurance

### Pre-Deployment Checklist
1. **Linting:** No ESLint or TSLint errors
2. **Unit Tests:** 80%+ coverage, all passing
3. **Integration Tests:** All API endpoints tested
4. **E2E Tests:** All user flows tested with Playwright
5. **Docker Compose Logs:** No errors, warnings, or build failures
6. **Visual Testing:** Manually navigate and test features in browser
7. **Responsive Testing:** Test on mobile (Chrome DevTools), tablet, desktop
8. **Performance:** Page load < 2s, API response < 500ms
9. **Accessibility:** WCAG 2.1 AA compliance
10. **Database:** Migrations applied successfully, seed data loaded

### LLM/AI Implementation Guidelines
When implementing features:
1. Write code
2. Run `make lint` - Fix all errors
3. Run `make test-unit` - Fix all failures
4. Run `make up` - Start environment
5. Run `make logs` - Check for errors
6. Iterate until logs show no errors
7. Run `make test-e2e` - Verify E2E tests pass
8. Open browser and visually test the feature
9. Only mark as complete when all checks pass

---

## 📝 Documentation Standards

### Code Documentation
- **Inline comments:** Explain "why," not "what"
- **JSDoc/TSDoc:** Document all public functions
- **README:** Setup instructions, architecture overview
- **API Documentation:** OpenAPI/Swagger spec

### Docs Folder Contents
- `PRD.md` - Product Requirements
- `FRD.md` - Functional Requirements
- `STYLE_GUIDE.md` - UI/UX Guidelines
- `API_SPEC.md` - API Endpoints
- `ARCHITECTURE.md` - System Design
- `DEPLOYMENT.md` - Deployment Guide
- `TESTING.md` - Testing Strategy
- `CONTRIBUTING.md` - Development Guidelines

---

## ✅ Definition of Done

A feature is considered "done" when:
- [ ] Code implemented with TypeScript (strict mode)
- [ ] All interactive elements have `data-test-id` attributes
- [ ] Unit tests written (80%+ coverage)
- [ ] E2E tests written (Playwright)
- [ ] No linting errors (ESLint, TSLint)
- [ ] Docker Compose logs show no errors
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Visually tested in browser
- [ ] Code reviewed and merged
- [ ] Documentation updated

---

## 🎯 Quick Reference

### Common Data Test IDs
```typescript
// Buttons
data-test-id="login-submit-button"
data-test-id="campaign-enroll-button"
data-test-id="habit-submit-button"
data-test-id="admin-create-campaign-button"
data-test-id="admin-award-bonus-button"

// Forms
data-test-id="login-email-input"
data-test-id="campaign-title-input"
data-test-id="habit-name-input"

// Lists & Cards
data-test-id="campaign-card-${id}"
data-test-id="habit-item-${id}"
data-test-id="leaderboard-row-${rank}"

// Navigation
data-test-id="nav-campaigns-link"
data-test-id="nav-dashboard-link"
data-test-id="nav-admin-panel-link"
```

### TypeORM Entity Example
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', array: true, default: '{}' })
  category_tags: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  goal_amount: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'varchar', length: 20, default: 'upcoming' })
  status: 'upcoming' | 'active' | 'ended' | 'completed';

  @ManyToOne(() => Admin, admin => admin.campaigns)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ name: 'admin_id' })
  adminId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

---

## 🚨 Common Pitfalls to Avoid

1. **❌ Running npm commands directly**
   - ✅ Use Docker Compose or Makefile

2. **❌ Missing data-test-id attributes**
   - ✅ Add to every button, input, link, card

3. **❌ TypeORM entities not matching SQL schema**
   - ✅ Always reference 001_init_schema.sql when creating entities

4. **❌ Ignoring Docker Compose logs**
   - ✅ Regularly check logs for errors

5. **❌ Not testing on mobile**
   - ✅ Use Chrome DevTools responsive mode

6. **❌ Sharp edges in UI**
   - ✅ Everything should be rounded (border-radius: 12px+)

7. **❌ Small touch targets**
   - ✅ Minimum 44x44px for buttons/interactive elements

8. **❌ Direct database queries without TypeORM**
   - ✅ Use TypeORM query builder or repository methods

---

This document should be referenced throughout implementation to ensure all requirements are met!