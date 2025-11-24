# backend/models.py
from pydantic import BaseModel, EmailStr
from typing import Optional

# --- User Data Schemas ---

class UserRegistration(BaseModel):
    """
    Schema for new user registration input.
    Used for POST /api/v1/auth/register
    """
    full_name: str
    email: EmailStr # Ensures the field is a valid email format
    password: str

class UserResponse(BaseModel):
    """
    Schema for user data returned to the client (excluding sensitive data).
    Used for successful response from /api/v1/auth/register or /api/v1/users/me
    """
    full_name: str
    email: EmailStr
    
    # Allows additional arbitrary fields if needed, common in ORM models
    class Config:
        from_attributes = True 

class Token(BaseModel):
    """
    Schema for the JWT access token and token type (Bearer).
    Used for successful response from /api/v1/auth/login
    """
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    """
    Schema for data contained within the JWT payload.
    Used internally for dependency injection (getting the current user).
    """
    email: Optional[EmailStr] = None