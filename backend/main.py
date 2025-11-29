# backend/main.py

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta, datetime, timezone
from typing import Annotated

from bcrypt import hashpw, gensalt, checkpw
from jose import JWTError, jwt
from pydantic import ValidationError

# Corrected absolute import for models
from models import UserRegistration, UserResponse, Token, TokenData

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
    "http://localhost:5173",  # Default React development port
    # Add your production frontend URL here when deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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