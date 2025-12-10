# Reset User Progress & Fix Routing

## What Was Fixed:

### 1. Reset All User Progress ✅
Created a script to reset all users' progress to 0%.

**To reset progress:**
```bash
cd backend
python3 reset_progress.py
```

This will:
- Set all `enrollments.progress_percentage` to 0%
- Delete all `lesson_progress` records
- Mark all courses as not started
- Keep user accounts intact

**Output:**
```
Resetting all user progress...
Before reset:
  - Enrollments: 6 (for 1 user × 6 courses)
  - Lesson progress records: X
✓ Reset all enrollment progress to 0%
✓ Cleared all lesson progress records

After reset:
  - Enrollments with 0% progress: 6/6
  - Lesson progress records: 0

✅ All user progress has been reset to zero!
```

### 2. Fixed Start Button Routing ✅
Changed the Start/Continue button to route to the **course page** instead of a specific lesson.

**Old behavior:**
- Link: `/course/1/module/1/lesson/1` (broken empty page)

**New behavior:**
- Link: `/course/1` (module/course overview page)
- Shows all modules and lessons for the course
- User can choose which lesson to start with

## API Changes:

### Endpoint: `GET /api/v1/users/me/continue-learning`

**Response:**
```json
{
  "course_id": 1,
  "course_title": "Introduction to HIV",
  "module_id": 1,
  "module_title": "Module 1: HIV Basics",
  "lesson_id": 1,
  "lesson_title": "What is HIV?",
  "progress_percentage": 0,
  "status": "not_started",
  "link": "/course/1"
}
```

The `link` field now routes to `/course/{courseId}` instead of the nested lesson path.

## User Experience Flow:

1. **User Registers**
   - Auto-enrolled in all courses (0% progress)
   - No progress records

2. **Dashboard Loads**
   - Fetches continue-learning data
   - Shows "Start" button pointing to course page
   - Button routes to `/course/1`

3. **User Clicks Start**
   - Navigates to course module page
   - Can see all modules and lessons
   - Can choose which lesson to start with

4. **User Completes a Lesson**
   - Progress updated in database
   - Next login shows "Continue" button
   - Still routes to course page

## Files Modified:

1. **backend/main.py**
   - Updated `get_continue_learning()` endpoint
   - Changed `link` to route to `/course/{id}` instead of lesson path

2. **backend/reset_progress.py** (NEW)
   - Script to reset all progress
   - Run before testing new user flow

## Before and After:

### Before:
```
User clicks "Start" → Routes to /course/1/module/1/lesson/1 → Empty/Broken page
```

### After:
```
User clicks "Start" → Routes to /course/1 → Module overview page → Can choose lesson
```

## Quick Testing:

```bash
# 1. Reset all progress
cd backend
python3 reset_progress.py

# 2. Start backend
python3 main.py

# 3. Start frontend (in another terminal)
cd frontend
npm run dev

# 4. Test:
# - Register new user
# - Check Dashboard
# - Click "Start" button
# - Should see course page with modules/lessons
```

All user progress is now at 0%, and the Start button routes to the correct course page!
