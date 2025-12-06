"""
Database seeding script for initial test data.
Run this to populate the database with sample courses, modules, and lessons.
"""
from database import SessionLocal, create_all_tables
from db_models import User, Course, Module, Lesson, Enrollment, LessonProgress, UserRole, LessonStatus
from bcrypt import hashpw, gensalt

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

def seed_database():
    """Create tables and seed with initial data."""
    # Create all tables
    create_all_tables()
    print("✓ Database tables created")

    db = SessionLocal()
    try:
        # Check if data already exists
        if db.query(User).first():
            print("⚠ Database already seeded. Skipping...")
            return

        # --- Create Test Users ---
        admin_user = User(
            full_name="Admin User",
            email="admin@jijue.com",
            hashed_password=hash_password("admin123"),
            role=UserRole.ADMIN
        )
        
        student_user = User(
            full_name="Alex Johnson",
            email="alex@example.com",
            hashed_password=hash_password("student123"),
            role=UserRole.STUDENT
        )
        
        db.add_all([admin_user, student_user])
        db.commit()
        print("✓ Test users created")

        # --- Create Courses ---
        course1 = Course(
            title="Introduction to HIV",
            description="Understand the fundamentals of HIV, how it is transmitted, and its impact on the immune system.",
            category="HIV Basics",
            icon="HeartPulse",
            color="primary"
        )
        
        course2 = Course(
            title="Prevention Strategies",
            description="Learn about various methods of HIV prevention, including safe practices, PrEP, and PEP.",
            category="Prevention",
            icon="Shield",
            color="secondary"
        )

        course3 = Course(
            title="Treatment and Care",
            description="An overview of antiretroviral therapy (ART), adherence, and managing life with HIV.",
            category="Treatment & Care",
            icon="HeartPulse",
            color="primary"
        )

        course4 = Course(
            title="HIV & Mental Health",
            description="Explore the connection between HIV and mental well-being, and learn coping strategies.",
            category="Living with HIV",
            icon="Brain",
            color="secondary"
        )

        course5 = Course(
            title="Combating Stigma",
            description="Learn to identify and challenge HIV-related stigma and discrimination in communities.",
            category="Living with HIV",
            icon="Heart",
            color="primary"
        )

        course6 = Course(
            title="Legal Rights & HIV",
            description="Understand the legal and human rights of people living with HIV in Kenya.",
            category="HIV Basics",
            icon="Scale",
            color="secondary"
        )

        db.add_all([course1, course2, course3, course4, course5, course6])
        db.commit()
        print("✓ Courses created")

        # --- Create Modules for Course 1 ---
        module1_1 = Module(
            course_id=course1.id,
            title="Module 1: HIV Basics",
            description="Introduction to what HIV is and how it affects the body.",
            order=1
        )
        
        module1_2 = Module(
            course_id=course1.id,
            title="Module 2: Understanding Transmission",
            description="Learn the ways HIV is transmitted and how it is not.",
            order=2
        )

        db.add_all([module1_1, module1_2])
        db.commit()
        print("✓ Modules created")

        # --- Create Lessons for Module 1_1 ---
        lesson1 = Lesson(
            module_id=module1_1.id,
            title="What is HIV?",
            description="Basic overview of HIV virus",
            content="https://example.com/video1",
            order=1,
            duration_minutes=10
        )
        
        lesson2 = Lesson(
            module_id=module1_1.id,
            title="HIV and the Immune System",
            description="How HIV affects CD4 cells",
            content="https://example.com/video2",
            order=2,
            duration_minutes=12
        )

        lesson3 = Lesson(
            module_id=module1_2.id,
            title="Routes of Transmission",
            description="How HIV is transmitted",
            content="https://example.com/video3",
            order=1,
            duration_minutes=15
        )

        db.add_all([lesson1, lesson2, lesson3])
        db.commit()
        print("✓ Lessons created")

        # --- Create Enrollments ---
        enrollment1 = Enrollment(
            user_id=student_user.id,
            course_id=course1.id,
            progress_percentage=75
        )
        
        enrollment2 = Enrollment(
            user_id=student_user.id,
            course_id=course2.id,
            progress_percentage=0
        )

        db.add_all([enrollment1, enrollment2])
        db.commit()
        print("✓ Enrollments created")

        # --- Create Lesson Progress ---
        progress1 = LessonProgress(
            user_id=student_user.id,
            lesson_id=lesson1.id,
            status=LessonStatus.COMPLETED,
            progress_percentage=100
        )
        
        progress2 = LessonProgress(
            user_id=student_user.id,
            lesson_id=lesson2.id,
            status=LessonStatus.IN_PROGRESS,
            progress_percentage=50
        )

        db.add_all([progress1, progress2])
        db.commit()
        print("✓ Lesson progress created")

        print("\n✅ Database seeded successfully!")
        print(f"   - Admin: admin@jijue.com / admin123")
        print(f"   - Student: alex@example.com / student123")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
