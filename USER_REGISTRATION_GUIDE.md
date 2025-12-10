# User Registration & Persistent Storage - Implementation Complete

## Overview
User registration is now fully configured to store users permanently in the SQLite database. New users created via the registration form will be saved with encrypted passwords and can log in at any time.

---

## How Registration Works

### 1. **Frontend Registration Flow** (`RegisterPage.jsx`)
- User enters: full name, email, password
- Form submits to: `POST /api/v1/auth/register`
- JWT token is NOT issued on registration (only on login)
- Redirects to login page after successful registration

### 2. **Backend Registration Endpoint** (`main.py`)
```python
@app.post("/api/v1/auth/register")
async def register_user(user_data: UserRegistration, db = Depends(get_db)):
    # 1. Check if email already exists in users table
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    
    # 2. Hash password securely using bcrypt
    hashed_password = get_password_hash(user_data.password)
    
    # 3. Create User object with role=STUDENT (default)
    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hashed_password,
        role=UserRole.STUDENT
    )
    
    # 4. Save to database (permanent storage)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # 5. Return user data (no password)
    return UserResponse(full_name=new_user.full_name, email=new_user.email)
```

### 3. **Database Storage** (`db_models.py`)
Users are stored in the `users` table with:
- `id`: Primary key (auto-generated)
- `full_name`: User's full name
- `email`: Unique email address (index for fast lookup)
- `hashed_password`: bcrypt hashed password (never stored in plain text)
- `role`: User role (ADMIN, INSTRUCTOR, or STUDENT)
- `created_at`: Registration timestamp
- `updated_at`: Last update timestamp

### 4. **Login Flow**
After registration, users log in using their email and password:
```python
@app.post("/api/v1/auth/login")
async def login_for_access_token(form_data, db = Depends(get_db)):
    # 1. Query users table by email
    user_in_db = db.query(User).filter(User.email == form_data.username).first()
    
    # 2. Verify password hash matches
    if not verify_password(form_data.password, user_in_db.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # 3. Generate JWT token valid for 60 minutes
    access_token = create_access_token(data={"email": user_in_db.email})
    
    # 4. Return token to frontend
    return {"access_token": access_token, "token_type": "bearer"}
```

### 5. **Dashboard Access**
Once logged in, the dashboard:
1. Stores JWT token in `localStorage`
2. Fetches user profile via: `GET /api/v1/users/me` (requires Bearer token)
3. Backend returns user from `users` table based on JWT email claim
4. Displays user's `full_name` in welcome message

---

## Database Configuration

### SQLite Setup (`database.py`)
```python
DATABASE_URL = "sqlite:///./jijue_lms.db"  # Creates local database file

@app.on_event("startup")
async def startup_event():
    create_all_tables()  # Auto-creates users table on app start
```

### Auto-Creation on Startup
- When the backend starts, it automatically creates all database tables
- If tables already exist, they are skipped
- Database file: `backend/jijue_lms.db` (SQLite format, portable)

---

## Complete User Flow

### Registration Example:
```
1. User visits /register
2. Fills form:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Password: "SecurePass123"
3. Submits → Backend hashes password → Stores in users table
4. Redirects to /login
5. User logs in with email + password
6. Gets JWT token valid for 60 minutes
7. Token stored in localStorage
8. Navigates to /dashboard
9. Dashboard fetches user data from /api/v1/users/me
10. Shows "Welcome Back, John Doe!"
```

---

## Key Features

✅ **Permanent Storage** - Users saved in SQLite database, persist across app restarts
✅ **Security** - Passwords hashed with bcrypt, never stored in plain text
✅ **Email Uniqueness** - Duplicate email registration prevented
✅ **Auto-create Tables** - Database tables created automatically on startup
✅ **JWT Authentication** - Login returns secure, time-limited tokens
✅ **User Profile** - Can fetch user data at any time with valid token
✅ **Role System** - New users default to STUDENT role (can be changed by admins)

---

## Data Persistence Verification

### To verify users are permanently stored:

**1. Check database directly:**
```bash
cd backend
sqlite3 jijue_lms.db "SELECT * FROM users;"
```

**2. Test registration → login → dashboard flow:**
- Register new user
- Stop backend (kill process)
- Restart backend
- Login with same credentials → Should still work!

**3. Query users via API:**
```bash
# Login and get token
curl -X POST http://localhost:8000/api/v1/auth/login \
  -d "username=john@example.com&password=SecurePass123"

# Use token to fetch user data
curl -H "Authorization: Bearer {token}" \
  http://localhost:8000/api/v1/users/me
```

---

## User Registration Endpoints

| Method | Endpoint | Purpose | Returns |
|--------|----------|---------|---------|
| POST | `/api/v1/auth/register` | Register new user | `{ full_name, email }` |
| POST | `/api/v1/auth/login` | Login user | `{ access_token, token_type }` |
| GET | `/api/v1/users/me` | Get current user (requires Bearer token) | `{ full_name, email }` |

---

## Security Notes

1. **Passwords are hashed** - Never stored in plain text
2. **JWT tokens are time-limited** - Expire after 60 minutes
3. **Email must be unique** - Prevents duplicate accounts
4. **Database file** - Protected by filesystem permissions in production
5. **CORS configured** - Only frontend can access API

---

## Next Steps (Optional Enhancements)

- [ ] Email verification on registration
- [ ] Password reset functionality
- [ ] User profile update endpoint
- [ ] Admin user creation
- [ ] Email notifications
- [ ] Two-factor authentication

---

## Summary

✅ **Users are now permanently stored in the database**
✅ **Registration creates entries in the `users` table**
✅ **Passwords are securely hashed with bcrypt**
✅ **Users can log in and access dashboard with stored credentials**
✅ **Data persists across backend restarts**

The system is now production-ready for user management!
