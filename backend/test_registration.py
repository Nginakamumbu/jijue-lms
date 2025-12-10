#!/usr/bin/env python3
"""
Test script to verify registration flow works correctly.
"""
from database import SessionLocal, create_all_tables
from db_models import User, UserRole
from bcrypt import hashpw, gensalt

def test_registration():
    """Test user registration flow."""
    print("Testing user registration...")
    
    # Create tables
    create_all_tables()
    print("✓ Tables created")
    
    # Get database session
    db = SessionLocal()
    
    try:
        # Check if test user exists
        test_email = "testuser@example.com"
        existing = db.query(User).filter(User.email == test_email).first()
        
        if existing:
            print(f"✓ Test user already exists: {existing.full_name}")
            return
        
        # Create new test user
        hashed_pw = hashpw("testpass123".encode('utf-8'), gensalt()).decode('utf-8')
        
        new_user = User(
            full_name="Test User",
            email=test_email,
            hashed_password=hashed_pw,
            role=UserRole.STUDENT
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        print(f"✓ User created successfully!")
        print(f"  - ID: {new_user.id}")
        print(f"  - Name: {new_user.full_name}")
        print(f"  - Email: {new_user.email}")
        print(f"  - Role: {new_user.role}")
        
    except Exception as e:
        print(f"✗ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    test_registration()
