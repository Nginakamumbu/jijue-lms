# Database Setup Guide for Jijue LMS

## Overview
Jijue LMS uses **PostgreSQL** as its database with **SQLAlchemy** as the ORM. This guide walks you through setting up the database.

## Prerequisites
- PostgreSQL 12+ installed and running
- Python 3.12+
- Pipenv or pip

## Installation Steps

### 1. Install PostgreSQL

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### 2. Create Database and User

Open PostgreSQL prompt:
```bash
sudo -u postgres psql
```

Create database and user:
```sql
CREATE DATABASE jijue_lms;
CREATE USER jijue_user WITH PASSWORD 'your_secure_password';
ALTER ROLE jijue_user SET client_encoding TO 'utf8';
ALTER ROLE jijue_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE jijue_user SET default_transaction_deferrable TO on;
ALTER ROLE jijue_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE jijue_lms TO jijue_user;
\q
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update the DATABASE_URL:
```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://jijue_user:your_secure_password@localhost:5432/jijue_lms
SECRET_KEY=your_super_secret_key
```

### 4. Install Python Dependencies

```bash
cd backend
pipenv install
pipenv shell
```

Or with pip:
```bash
pip install -r requirements.txt
```

### 5. Initialize Database and Seed Data

```bash
python seed_db.py
```

This will:
- Create all database tables
- Seed test users (admin@jijue.com, alex@example.com)
- Seed sample courses, modules, and lessons

### 6. Start the Backend Server

```bash
python -m uvicorn main:app --reload --port 8000
```

## Database Schema

### Tables

**users**
- id (PK)
- full_name
- email (unique)
- hashed_password
- role (admin, instructor, student)
- created_at, updated_at

**courses**
- id (PK)
- title
- description
- category
- icon (e.g., "HeartPulse", "Shield")
- color (primary, secondary)
- created_at, updated_at

**modules**
- id (PK)
- course_id (FK)
- title
- description
- order (sequence in course)
- created_at, updated_at

**lessons**
- id (PK)
- module_id (FK)
- title
- description
- content (video URL or markdown)
- order (sequence in module)
- duration_minutes
- created_at, updated_at

**enrollments**
- id (PK)
- user_id (FK)
- course_id (FK)
- enrolled_at
- completed_at (nullable)
- progress_percentage (0-100)

**lesson_progress**
- id (PK)
- user_id (FK)
- lesson_id (FK)
- status (not_started, in_progress, completed)
- progress_percentage (0-100)
- started_at, completed_at, updated_at

## Test Credentials

After seeding:
- **Admin**: admin@jijue.com / admin123
- **Student**: alex@example.com / student123

## Troubleshooting

### Connection Refused
- Ensure PostgreSQL is running: `sudo service postgresql status`
- Check DATABASE_URL in .env

### Permission Denied
- Check user permissions: `psql -U jijue_user -d jijue_lms -c "SELECT 1"`

### Module Import Errors
- Reinstall dependencies: `pipenv install --force`
- Clear cache: `rm -rf __pycache__`

## API Endpoints (Database-Backed)

Once backend is running:

**Get Dashboard Data:**
```
GET /api/dashboard
```

**Get Courses:**
```
GET /api/courses
```

**Get Course Details:**
```
GET /api/courses/{course_id}
```

**Get Course Modules:**
```
GET /api/courses/{course_id}/modules
```

**Get Lesson:**
```
GET /api/lessons/{lesson_id}
```

**Track Progress:**
```
POST /api/lessons/{lesson_id}/progress
Body: { "status": "completed", "progress_percentage": 100 }
```

## Next Steps
- Update API endpoints in `main.py` to query the database
- Create CRUD endpoints for course management
- Implement user progress tracking
- Add admin panel for content management
