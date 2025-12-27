.PHONY: build up down logs migrate seed test-unit test-e2e lint clean db-reset validate check-logs

# Build all Docker containers
build:
	docker-compose build

# Start development environment
up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Start in detached mode
up-d:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# Stop all services
down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# View logs for specific service
logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-db:
	docker-compose logs -f postgres

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

# Run backend tests only
test-backend:
	docker-compose exec backend npm run test

# Run frontend tests only
test-frontend:
	docker-compose exec frontend npm run test

# Run E2E tests
test-e2e:
	docker-compose exec frontend npm run e2e

# Run linting
lint:
	docker-compose exec backend npm run lint
	docker-compose exec frontend npm run lint

# Lint backend only
lint-backend:
	docker-compose exec backend npm run lint

# Lint frontend only
lint-frontend:
	docker-compose exec frontend npm run lint

# Check logs for errors
check-logs:
	docker-compose logs 2>&1 | grep -i "error" || echo "No errors found"

# Clean up (remove containers, volumes, images)
clean:
	docker-compose down -v --rmi all --remove-orphans

# Reset database
db-reset:
	docker-compose exec postgres psql -U habituser -d habitsforgood -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
	docker-compose exec postgres psql -U habituser -d habitsforgood -f /docker-entrypoint-initdb.d/001_init_schema.sql
	docker-compose exec postgres psql -U habituser -d habitsforgood -f /docker-entrypoint-initdb.d/002_seed.sql

# Validate environment (check for errors)
validate:
	@echo "Running linting..."
	@make lint
	@echo "Running unit tests..."
	@make test-unit
	@echo "Checking logs for errors..."
	@make check-logs
	@echo "Validation complete!"

# Shell access
shell-backend:
	docker-compose exec backend sh

shell-frontend:
	docker-compose exec frontend sh

shell-db:
	docker-compose exec postgres psql -U habituser -d habitsforgood

# Help
help:
	@echo "Available commands:"
	@echo "  make build       - Build Docker containers"
	@echo "  make up          - Start development environment"
	@echo "  make up-d        - Start in detached mode"
	@echo "  make down        - Stop all services"
	@echo "  make logs        - View Docker logs"
	@echo "  make migrate     - Run database migrations"
	@echo "  make seed        - Populate seed data"
	@echo "  make test-unit   - Run unit tests"
	@echo "  make test-e2e    - Run Playwright E2E tests"
	@echo "  make lint        - Run ESLint"
	@echo "  make clean       - Remove all containers and volumes"
	@echo "  make db-reset    - Reset database"
	@echo "  make validate    - Run full validation"
	@echo "  make shell-*     - Access container shell"
