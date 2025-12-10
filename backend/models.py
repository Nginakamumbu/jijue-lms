# backend/models.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum

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

# --- Course Data Schemas ---

class LessonResponse(BaseModel):
    """Schema for lesson data."""
    id: int
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    duration_minutes: int
    order: int
    
    class Config:
        from_attributes = True

class ModuleResponse(BaseModel):
    """Schema for module data with lessons."""
    id: int
    title: str
    description: Optional[str] = None
    order: int
    lessons: List[LessonResponse] = []
    
    class Config:
        from_attributes = True

class CourseDetailResponse(BaseModel):
    """Schema for detailed course data with modules and lessons."""
    id: int
    title: str
    description: Optional[str] = None
    category: str
    icon: str
    color: str
    modules: List[ModuleResponse] = []
    
    class Config:
        from_attributes = True

class CourseResponse(BaseModel):
    """Schema for course listing."""
    id: int
    title: str
    description: Optional[str] = None
    category: str
    icon: str
    color: str
    
    class Config:
        from_attributes = True

class LessonStatusEnum(str, Enum):
    """Enum for lesson status."""
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class LessonProgressResponse(BaseModel):
    """Schema for lesson progress data."""
    id: int
    lesson_id: int
    status: LessonStatusEnum
    progress_percentage: int
    
    class Config:
        from_attributes = True

class ModuleProgressResponse(BaseModel):
    """Schema for module progress calculation."""
    module_id: int
    module_title: str
    total_lessons: int
    completed_lessons: int
    progress_percentage: int

class UpdateLessonProgressRequest(BaseModel):
    """Schema for updating lesson progress."""
    status: LessonStatusEnum
    progress_percentage: int