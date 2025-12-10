from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta, datetime, timezone
from typing import Annotated, List 

from bcrypt import hashpw, gensalt, checkpw
from jose import JWTError, jwt
from pydantic import ValidationError, BaseModel 

# Corrected absolute import for models
from models import UserRegistration, UserResponse, Token, TokenData
from database import SessionLocal, get_db
from db_models import Course

# --- Configuration ---
# In a real app, these would come from environment variables (.env file)
SECRET_KEY = "SUPER_SECRET_KEY"  # Replace this with a secure, long, random key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# --- Database Mock ---
# In a real application, this would be replaced with a database (e.g., PostgreSQL, MongoDB)
fake_users_db = {} 

# --- FastAPI Initialization ---
app = FastAPI(title="Jijue LMS API")

# Setup CORS (Cross-Origin Resource Sharing)
# Allows your React frontend (running on a different port) to talk to this API
origins = [
    "http://localhost:5177",  # other frontend ports (if used)
    "http://localhost:5176",
    "http://localhost:5175",
    "http://localhost:5174",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:5176",
    "http://127.0.0.1:5177",
    # Add your production frontend URL here when deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------
# DASHBOARD DATA MODELS (Pydantic) - NEW ADDITION
# ----------------------------------------------------

# Defining models here since they were not included in the 'from models import' list
class NavItem(BaseModel):
    name: str
    icon: str
    current: bool
    link: str

class CourseItem(BaseModel):
    title: str
    description: str
    icon: str
    color: str
    link: str

class ContinueLearning(BaseModel):
    moduleTitle: str
    description: str
    link: str

class DashboardData(BaseModel):
    userName: str
    progress: int
    modulesCompleted: int
    totalModules: int
    continueLearning: ContinueLearning
    featuredCourses: List[CourseItem]
    quickLinks: List[CourseItem]
    navigation: List[NavItem]

class CourseResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    icon: str
    color: str

    class Config:
        from_attributes = True

# ----------------------------------------------------
# DASHBOARD STATIC DATA SOURCE - NEW ADDITION
# ----------------------------------------------------

DASHBOARD_DATA_SOURCE = DashboardData(
    userName="Alex",
    progress=75,
    modulesCompleted=3,
    totalModules=4,
    continueLearning=ContinueLearning(
        moduleTitle="Module 2: Understanding Transmission",
        description="Learn about the ways HIV is transmitted and how it is not. Debunk common myths.",
        link="#",
    ),
    featuredCourses=[
        CourseItem(
            title="Living Well with HIV",
            description="Nutrition, mental health, and treatment adherence.",
            icon="HeartPulse",
            color='secondary',
            link="#",
        ),
        CourseItem(
            title="Prevention & PrEP",
            description="Understand the tools available for prevention.",
            icon="Shield",
            color='primary',
            link="#",
        )
    ],
    quickLinks=[
        CourseItem(
            title="Community Forum",
            description="Ask questions and share experiences.",
            icon="MessageSquare",
            color='primary',
            link="#",
        ),
        CourseItem(
            title="Find a Clinic",
            description="Locate testing and support centers.",
            icon="MapPin",
            color='secondary',
            link="#",
        ),
    ],
    navigation=[
        NavItem(name="Dashboard", icon="LayoutDashboard", current=True, link="/dashboard"),
        NavItem(name="Course Catalog", icon="School", current=False, link="/courses"),
        NavItem(name="My Courses", icon="PlayCircle", current=False, link="/my-courses"),
        NavItem(name="Community", icon="Users", current=False, link="/forum"),
        NavItem(name="Resources", icon="Zap", current=False, link="/resources"),
        NavItem(name="Settings", icon="Settings", current=False, link="/settings"),
    ]
)

# --- Authentication Utilities ---

def get_password_hash(password: str) -> str:
    """Hashes a password using bcrypt."""
    # Convert password string to bytes and hash it
    hashed = hashpw(password.encode('utf-8'), gensalt())
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against a hashed password."""
    # Convert both to bytes for comparison
    return checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Creates a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        
    to_encode.update({"exp": expire, "sub": data.get("email")})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- Authentication Routes ---

@app.post("/api/v1/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserRegistration):
    """Handles new user registration and stores the hashed password."""
    
    if user_data.email in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password for secure storage
    hashed_password = get_password_hash(user_data.password)
    
    # Store user data (simulating DB write)
    user = user_data.model_dump()
    user["hashed_password"] = hashed_password
    fake_users_db[user_data.email] = user
    
    # Return a response model (without the password hash)
    return UserResponse(full_name=user["full_name"], email=user["email"])

@app.post("/api/v1/auth/login", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    """Validates credentials and returns an access token upon successful login."""
    
    user_in_db = fake_users_db.get(form_data.username)
    
    # 1. Check if user exists
    if not user_in_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # 2. Check if password is correct
    if not verify_password(form_data.password, user_in_db["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 3. Create Access Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"email": user_in_db["email"]},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# --- Dependency for Protected Routes (Future Use) ---

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """Verifies the JWT token and returns the current user's data."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        if email is None:
            raise credentials_exception
            
        token_data = TokenData(email=email)
        
    except (JWTError, ValidationError):
        raise credentials_exception
        
    user_in_db = fake_users_db.get(token_data.email)
    if user_in_db is None:
        raise credentials_exception
        
    # In a real app, you would fetch the full UserResponse model from the DB here
    return UserResponse(full_name=user_in_db["full_name"], email=user_in_db["email"])

# --- Example Protected Route ---

@app.get("/api/v1/users/me", response_model=UserResponse)
async def read_users_me(current_user: Annotated[UserResponse, Depends(get_current_user)]):
    """Example route to demonstrate JWT protection (returns the logged-in user's data)."""
    return current_user
    
# ----------------------------------------------------
# DASHBOARD API ENDPOINT - NEW ADDITION
# ----------------------------------------------------

@app.get("/api/dashboard", response_model=DashboardData)
def get_dashboard_data():
    """
    Returns all data required to render the user dashboard.
    This is the endpoint your React component will call.
    """
    return DASHBOARD_DATA_SOURCE

# ----------------------------------------------------
# COURSES API ENDPOINT - NEW ADDITION
# ----------------------------------------------------

@app.get("/api/courses", response_model=List[CourseResponse])
def get_courses(db = Depends(get_db)):
    """
    Returns all available courses from the database.
    """
    courses = db.query(Course).all()
    return courses

@app.get("/api/courses/{course_id}")
def get_course_with_modules(course_id: int, db = Depends(get_db)):
    """
    Returns a specific course with its modules and lessons.
    """
    from db_models import Module, Lesson
    
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    modules = db.query(Module).filter(Module.course_id == course_id).all()
    
    course_data = {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "category": course.category,
        "icon": course.icon,
        "color": course.color,
        "modules": []
    }
    
    for module in modules:
        lessons = db.query(Lesson).filter(Lesson.module_id == module.id).all()
        module_data = {
            "id": module.id,
            "title": module.title,
            "description": module.description,
            "order": module.order,
            "lessons": [
                {
                    "id": lesson.id,
                    "title": lesson.title,
                    "description": lesson.description,
                    "content": lesson.content,
                    "duration_minutes": lesson.duration_minutes,
                    "order": lesson.order
                }
                for lesson in lessons
            ]
        }
        course_data["modules"].append(module_data)
    
    return course_data