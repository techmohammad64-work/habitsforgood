# Habits for Good

A gamified web platform where children (ages 5-8) earn points by completing daily healthy habits. Sponsors pledge financial support tied to these points, with funds distributed to charitable campaigns.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Make (optional but recommended)

### Development Setup

```bash
# Clone repository
git clone <repo-url>
cd habitsforgood

# Copy environment template
cp .env.example .env

# Build and start all services
make up

# In another terminal, run database migrations
make migrate

# Seed database with sample data
make seed
```

### Access the Application
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000
- **Database:** localhost:5432 (PostgreSQL)

## 📁 Project Structure

```
habitsforgood/
├── backend/          # Express.js API (TypeScript)
├── frontend/         # Angular 17+ SPA
├── database/         # SQL migrations and seeds
├── docs/             # Documentation
├── docker-compose.yml
├── docker-compose.dev.yml
└── Makefile
```

## 🛠️ Common Commands

```bash
make build      # Build Docker containers
make up         # Start development environment
make down       # Stop all services
make logs       # View Docker logs
make migrate    # Run database migrations
make seed       # Populate seed data
make test-unit  # Run unit tests
make test-e2e   # Run Playwright E2E tests
make lint       # Run ESLint
```

## 👥 User Roles

- **Students (Kids 5-8):** Complete habits, earn points, compete on leaderboards
- **Admins (Teachers/Guides):** Create campaigns, define habits, manage leaderboards
- **Sponsors:** Pledge donations per point, track impact
- **Causes:** Receive donations from completed campaigns

## 📚 Documentation

See the `/docs` folder for:
- Product Requirements Document (PRD)
- Style Guide & UX Guidelines
- Implementation Requirements

## 🎨 Design

Inspired by Duolingo's playful, colorful design:
- Rounded corners everywhere
- Vibrant color palette (greens, blues, yellows)
- Kid-friendly typography and icons
- Micro-animations for engagement

## License

MIT
