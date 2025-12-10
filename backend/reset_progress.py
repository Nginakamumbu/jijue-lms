#!/usr/bin/env python3
"""
Reset all user progress to zero.
Sets all enrollment progress_percentage to 0 and clears lesson_progress records.
"""
from database import SessionLocal, create_all_tables
from db_models import Enrollment, LessonProgress

def reset_all_progress():
    """Reset all user progress in the system."""
    print("Resetting all user progress...")
    
    # Create tables if they don't exist
    create_all_tables()
    
    db = SessionLocal()
    try:
        # Get count before reset
        enrollment_count = db.query(Enrollment).count()
        lesson_progress_count = db.query(LessonProgress).count()
        
        print(f"Before reset:")
        print(f"  - Enrollments: {enrollment_count}")
        print(f"  - Lesson progress records: {lesson_progress_count}")
        
        # Reset all enrollments to 0% progress
        db.query(Enrollment).update({Enrollment.progress_percentage: 0, Enrollment.completed_at: None})
        print("✓ Reset all enrollment progress to 0%")
        
        # Clear all lesson progress records
        db.query(LessonProgress).delete()
        print("✓ Cleared all lesson progress records")
        
        db.commit()
        
        # Verify
        new_enrollment_count = db.query(Enrollment).filter(Enrollment.progress_percentage == 0).count()
        new_lesson_progress_count = db.query(LessonProgress).count()
        
        print(f"\nAfter reset:")
        print(f"  - Enrollments with 0% progress: {new_enrollment_count}/{enrollment_count}")
        print(f"  - Lesson progress records: {new_lesson_progress_count}")
        print("\n✅ All user progress has been reset to zero!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_all_progress()
