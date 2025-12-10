"""
SQLAlchemy ORM models for Jijue LMS.
Defines User, Course, Module, Lesson, and Enrollment schemas.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from database import Base
import enum

# --- Enums ---
class UserRole(enum.Enum):
    """User role types."""
    ADMIN = "admin"
    INSTRUCTOR = "instructor"
    STUDENT = "student"

class LessonStatus(enum.Enum):
    """Lesson completion status."""
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

# --- Models ---
class User(Base):
    """User model for authentication and profile."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.STUDENT)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    enrollments = relationship("Enrollment", back_populates="user", cascade="all, delete-orphan")
    lesson_progress = relationship("LessonProgress", back_populates="user", cascade="all, delete-orphan")

class Course(Base):
    """Course model."""
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    icon = Column(String)  # Icon name (e.g., "HeartPulse", "Shield")
    color = Column(String, default="primary")  # Color variant (primary/secondary)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")

class Module(Base):
    """Module/Chapter model within a course."""
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    order = Column(Integer, default=0)  # Order within the course
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    course = relationship("Course", back_populates="modules")
    lessons = relationship("Lesson", back_populates="module", cascade="all, delete-orphan")

class Lesson(Base):
    """Lesson/Video content within a module."""
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    content = Column(Text)  # Video URL, markdown, or HTML content
    order = Column(Integer, default=0)  # Order within the module
    duration_minutes = Column(Integer, default=0)  # Video/lesson duration
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    module = relationship("Module", back_populates="lessons")
    progress = relationship("LessonProgress", back_populates="lesson", cascade="all, delete-orphan")

class Enrollment(Base):
    """User enrollment in a course."""
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    progress_percentage = Column(Integer, default=0)  # 0-100

    # Relationships
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

class LessonProgress(Base):
    """Track user progress through individual lessons."""
    __tablename__ = "lesson_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    status = Column(SQLEnum(LessonStatus), default=LessonStatus.NOT_STARTED)
    progress_percentage = Column(Integer, default=0)  # 0-100
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="lesson_progress")
    lesson = relationship("Lesson", back_populates="progress")