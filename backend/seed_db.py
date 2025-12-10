from database import SessionLocal, create_all_tables

from db_models import (

    User, Course, Module, Lesson, Enrollment, LessonProgress, UserRole, LessonStatus,

    ForumCategory, Discussion, Reply, ResourceCategory, Resource, MediaLibrary, MediaTag

)

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



        # --- Create Modules for Course 1 (Introduction to HIV) ---

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

       

        module1_3 = Module(

            course_id=course1.id,

            title="Module 3: CD4 and Viral Load",

            description="Understanding key markers of HIV progression.",

            order=3

        )



        # --- Create Modules for Course 2 (Prevention Strategies) ---

        module2_1 = Module(

            course_id=course2.id,

            title="Module 1: Prevention Methods Overview",

            description="Introduction to various HIV prevention strategies.",

            order=1

        )

       

        module2_2 = Module(

            course_id=course2.id,

            title="Module 2: PrEP and PEP",

            description="Learn about preventative medications.",

            order=2

        )



        # --- Create Modules for Course 3 (Treatment and Care) ---

        module3_1 = Module(

            course_id=course3.id,

            title="Module 1: Introduction to ART",

            description="Understanding antiretroviral therapy.",

            order=1

        )



        # --- Create Modules for Course 4 (HIV & Mental Health) ---

        module4_1 = Module(

            course_id=course4.id,

            title="Module 1: Mental Health and HIV",

            description="The psychological impact of HIV diagnosis.",

            order=1

        )



        # --- Create Modules for Course 5 (Combating Stigma) ---

        module5_1 = Module(

            course_id=course5.id,

            title="Module 1: Understanding Stigma",

            description="Recognizing and addressing HIV-related stigma.",

            order=1

        )



        # --- Create Modules for Course 6 (Legal Rights & HIV) ---

        module6_1 = Module(

            course_id=course6.id,

            title="Module 1: Legal Rights Overview",

            description="Understanding your rights as a person living with or affected by HIV.",

            order=1

        )



        db.add_all([module1_1, module1_2, module1_3, module2_1, module2_2, module3_1, module4_1, module5_1, module6_1])

        db.commit()

        print("✓ Modules created")



        # --- Create Lessons for Module 1_1 (HIV Basics) ---

        lesson1 = Lesson(

            module_id=module1_1.id,

            title="What is HIV?",

            description="Basic overview of HIV virus and its structure",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=10

        )

       

        lesson2 = Lesson(

            module_id=module1_1.id,

            title="HIV and the Immune System",

            description="How HIV affects CD4 cells and the immune response",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=2,

            duration_minutes=12

        )

       

        lesson3 = Lesson(

            module_id=module1_1.id,

            title="Common Myths About HIV",

            description="Debunking misconceptions about HIV transmission",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=3,

            duration_minutes=8

        )



        # --- Create Lessons for Module 1_2 (Transmission) ---

        lesson4 = Lesson(

            module_id=module1_2.id,

            title="Routes of Transmission",

            description="How HIV is transmitted and how it is not",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=15

        )

       

        lesson5 = Lesson(

            module_id=module1_2.id,

            title="Window Period",

            description="Understanding the window period after potential exposure",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=2,

            duration_minutes=11

        )



        # --- Create Lessons for Module 1_3 (CD4 and Viral Load) ---

        lesson6 = Lesson(

            module_id=module1_3.id,

            title="Understanding CD4 Count",

            description="What CD4 count means and why it matters",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=13

        )

       

        lesson7 = Lesson(

            module_id=module1_3.id,

            title="Viral Load Explained",

            description="Understanding viral load and treatment effectiveness",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=2,

            duration_minutes=14

        )



        # --- Create Lessons for Module 2_1 (Prevention Methods) ---

        lesson8 = Lesson(

            module_id=module2_1.id,

            title="Prevention Overview",

            description="Introduction to HIV prevention strategies",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=12

        )

       

        lesson9 = Lesson(

            module_id=module2_1.id,

            title="Condom Use and Effectiveness",

            description="Understanding condom use and effectiveness rates",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=2,

            duration_minutes=10

        )



        # --- Create Lessons for Module 2_2 (PrEP and PEP) ---

        lesson10 = Lesson(

            module_id=module2_2.id,

            title="What is PrEP?",

            description="Pre-exposure prophylaxis: Prevention medication",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=16

        )

       

        lesson11 = Lesson(

            module_id=module2_2.id,

            title="What is PEP?",

            description="Post-exposure prophylaxis: Emergency prevention",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=2,

            duration_minutes=12

        )



        # --- Create Lessons for Module 3_1 (ART) ---

        lesson12 = Lesson(

            module_id=module3_1.id,

            title="Introduction to ART",

            description="Understanding antiretroviral therapy and how it works",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=15

        )

       

        lesson13 = Lesson(

            module_id=module3_1.id,

            title="Adherence to Treatment",

            description="The importance of medication adherence",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=2,

            duration_minutes=13

        )



        # --- Create Lessons for Module 4_1 (Mental Health) ---

        lesson14 = Lesson(

            module_id=module4_1.id,

            title="Mental Health Impact",

            description="Understanding the psychological impact of HIV diagnosis",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=18

        )



        # --- Create Lessons for Module 5_1 (Stigma) ---

        lesson15 = Lesson(

            module_id=module5_1.id,

            title="What is Stigma?",

            description="Defining and recognizing HIV-related stigma",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=14

        )



        # --- Create Lessons for Module 6_1 (Legal Rights) ---

        lesson16 = Lesson(

            module_id=module6_1.id,

            title="Your Legal Rights",

            description="Understanding your legal rights in Kenya",

            content="https://www.youtube.com/embed/dQw4w9WgXcQ",

            order=1,

            duration_minutes=17

        )



        db.add_all([lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8,

                    lesson9, lesson10, lesson11, lesson12, lesson13, lesson14, lesson15, lesson16])

        db.commit()

        print("✓ Lessons created")



        # --- Create Enrollments ---

        enrollment1 = Enrollment(

            user_id=student_user.id,

            course_id=course1.id,

            progress_percentage=55

        )

       

        enrollment2 = Enrollment(

            user_id=student_user.id,

            course_id=course2.id,

            progress_percentage=0

        )

       

        enrollment3 = Enrollment(

            user_id=student_user.id,

            course_id=course3.id,

            progress_percentage=100

        )



        db.add_all([enrollment1, enrollment2, enrollment3])

        db.commit()

        print("✓ Enrollments created")



        # --- Create Lesson Progress ---

        # Course 1 progress

        progress1 = LessonProgress(

            user_id=student_user.id,

            lesson_id=lesson1.id,

            status=LessonStatus.COMPLETED,

            progress_percentage=100

        )

       

        progress2 = LessonProgress(

            user_id=student_user.id,

            lesson_id=lesson2.id,

            status=LessonStatus.COMPLETED,

            progress_percentage=100

        )

       

        progress3 = LessonProgress(

            user_id=student_user.id,

            lesson_id=lesson3.id,

            status=LessonStatus.IN_PROGRESS,

            progress_percentage=50

        )

       

        progress4 = LessonProgress(

            user_id=student_user.id,

            lesson_id=lesson4.id,

            status=LessonStatus.NOT_STARTED,

            progress_percentage=0

        )



        # Course 3 progress (completed)

        progress5 = LessonProgress(

            user_id=student_user.id,

            lesson_id=lesson12.id,

            status=LessonStatus.COMPLETED,

            progress_percentage=100

        )

       

        progress6 = LessonProgress(

            user_id=student_user.id,

            lesson_id=lesson13.id,

            status=LessonStatus.COMPLETED,

            progress_percentage=100

        )



        db.add_all([progress1, progress2, progress3, progress4, progress5, progress6])

        db.commit()

        print("✓ Lesson progress created")



        # --- Create Forum Categories ---

        forum_cat1 = ForumCategory(

            name="General Support",

            description="General questions and support discussions",

            icon="MessageSquare",

            color="primary"

        )

        forum_cat2 = ForumCategory(

            name="Prevention (PrEP, PEP, Condoms)",

            description="Discussion on prevention strategies",

            icon="Shield",

            color="secondary"

        )

        forum_cat3 = ForumCategory(

            name="Treatment & Adherence",

            description="Treatment options and medication adherence",

            icon="Pill",

            color="primary"

        )

        forum_cat4 = ForumCategory(

            name="Personal Stories",

            description="Share and read personal experiences",

            icon="Heart",

            color="secondary"

        )

        forum_cat5 = ForumCategory(

            name="Mental Health & Wellbeing",

            description="Mental health support and wellness",

            icon="Brain",

            color="primary"

        )

       

        db.add_all([forum_cat1, forum_cat2, forum_cat3, forum_cat4, forum_cat5])

        db.commit()

        print("✓ Forum categories created")



        # --- Create Forum Discussions ---

        discussion1 = Discussion(

            user_id=student_user.id,

            category_id=forum_cat1.id,

            title="Nervous about my first appointment. What should I expect?",

            content="I'm scheduled for my first HIV clinic appointment next week and I'm quite anxious. What should I bring? What questions should I ask?",

            avatar="https://placehold.co/48x48/A569BD/FFFFFF?text=JD",

            replies_count=12,

            views_count=45

        )

       

        discussion2 = Discussion(

            user_id=student_user.id,

            category_id=forum_cat4.id,

            title="Sharing my story: Living with HIV for 10+ years",

            content="I wanted to share my journey of living with HIV for over a decade. It's been challenging but rewarding, and I'm happy to answer any questions.",

            avatar="https://placehold.co/48x48/C8A2C8/FFFFFF?text=AS",

            replies_count=34,

            views_count=210

        )

       

        discussion3 = Discussion(

            user_id=student_user.id,

            category_id=forum_cat3.id,

            title="Tips for remembering to take medication every day?",

            content="I struggle with remembering to take my medication daily. Does anyone have tips or strategies that work for them?",

            avatar="https://placehold.co/48x48/B06FCB/FFFFFF?text=CR",

            replies_count=25,

            views_count=150

        )

       

        discussion4 = Discussion(

            user_id=student_user.id,

            category_id=forum_cat2.id,

            title="Is PrEP really as effective as they say?",

            content="I've heard about PrEP but want to know more about its effectiveness and side effects before considering it.",

            avatar="https://placehold.co/48x48/A569BD/FFFFFF?text=KM",

            replies_count=18,

            views_count=89

        )

       

        db.add_all([discussion1, discussion2, discussion3, discussion4])

        db.commit()

        print("✓ Forum discussions created")



        # --- Create Resource Categories ---

        res_cat1 = ResourceCategory(

            name="Guides & Fact Sheets",

            description="Comprehensive guides and informational fact sheets",

            icon="FileText",

            color="primary"

        )

        res_cat2 = ResourceCategory(

            name="Videos & Webinars",

            description="Educational video content and recorded webinars",

            icon="PlayCircle",

            color="secondary"

        )

        res_cat3 = ResourceCategory(

            name="Research & Statistics",

            description="Latest research findings and statistics",

            icon="BarChart3",

            color="primary"

        )

        res_cat4 = ResourceCategory(

            name="Support Services",

            description="Information on support services and helplines",

            icon="Users",

            color="secondary"

        )

       

        db.add_all([res_cat1, res_cat2, res_cat3, res_cat4])

        db.commit()

        print("✓ Resource categories created")



        # --- Create Resources ---

        resource1 = Resource(

            category_id=res_cat1.id,

            title="HIV Basics: Everything You Need to Know",

            description="A comprehensive guide covering HIV transmission, testing, and treatment options.",

            url="https://example.com/hiv-basics.pdf",

            resource_type="PDF",

            icon="FileText"

        )

       

        resource2 = Resource(

            category_id=res_cat1.id,

            title="PrEP and PEP: Prevention Strategies",

            description="Detailed information on preventative medications and their effectiveness.",

            url="https://example.com/prep-pep-guide.pdf",

            resource_type="PDF",

            icon="FileText"

        )

       

        resource3 = Resource(

            category_id=res_cat2.id,

            title="Understanding Antiretroviral Therapy",

            description="Video explanation of how HIV medication works and why adherence matters.",

            url="https://example.com/art-video",

            resource_type="Video",

            icon="PlayCircle"

        )

       

        resource4 = Resource(

            category_id=res_cat3.id,

            title="2024 HIV Statistics & Epidemiology Report",

            description="Latest global statistics on HIV prevalence and treatment outcomes.",

            url="https://example.com/hiv-2024-report.pdf",

            resource_type="PDF",

            icon="BarChart3"

        )

       

        resource5 = Resource(

            category_id=res_cat4.id,

            title="National HIV Support Helpline Directory",

            description="Complete list of support services and counseling hotlines.",

            url="https://example.com/helpline-directory",

            resource_type="Guide",

            icon="Users"

        )

       

        db.add_all([resource1, resource2, resource3, resource4, resource5])

        db.commit()

        print("✓ Resources created")



        # --- Create Media Library Items ---

        media1 = MediaLibrary(

            title="HIV 101: Understanding the Basics",

            description="An introductory video on what HIV is, how it spreads, and how to protect yourself.",

            media_type="video",

            url="https://example.com/hiv-101.mp4",

            thumbnail="https://placehold.co/300x200/7C3AED/FFFFFF?text=HIV+101",

            duration_minutes=12

        )

       

        media2 = MediaLibrary(

            title="Living Well with HIV: Daily Management",

            description="Tips and strategies for managing HIV as part of your daily life.",

            media_type="video",

            url="https://example.com/living-well.mp4",

            thumbnail="https://placehold.co/300x200/06B6D4/FFFFFF?text=Living+Well",

            duration_minutes=18

        )

       

        media3 = MediaLibrary(

            title="Mental Health Matters: Coping Strategies",

            description="Podcast episode discussing mental health challenges and coping mechanisms.",

            media_type="podcast",

            url="https://example.com/mental-health-podcast.mp3",

            thumbnail="https://placehold.co/300x200/7C3AED/FFFFFF?text=Mental+Health",

            duration_minutes=35

        )

       

        media4 = MediaLibrary(

            title="Community Stories: Real Experiences",

            description="Documentary-style video featuring interviews with people living with HIV.",

            media_type="video",

            url="https://example.com/community-stories.mp4",

            thumbnail="https://placehold.co/300x200/06B6D4/FFFFFF?text=Community",

            duration_minutes=45

        )

       

        db.add_all([media1, media2, media3, media4])

        db.commit()

        print("✓ Media library items created")



        # --- Create Media Tags ---

        tag1 = MediaTag(media_id=media1.id, tag="HIV Basics")

        tag2 = MediaTag(media_id=media1.id, tag="Education")

        tag3 = MediaTag(media_id=media2.id, tag="Wellness")

        tag4 = MediaTag(media_id=media2.id, tag="Daily Life")

        tag5 = MediaTag(media_id=media3.id, tag="Mental Health")

        tag6 = MediaTag(media_id=media3.id, tag="Wellness")

        tag7 = MediaTag(media_id=media4.id, tag="Community")

        tag8 = MediaTag(media_id=media4.id, tag="Stories")

       

        db.add_all([tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8])

        db.commit()

        print("✓ Media tags created")



        print("\n✅ Database seeded successfully!")

        print(f"   - Admin: admin@jijue.com / admin123")

        print(f"   - Student: alex@example.com / student123")

        print(f"   - 6 Courses with 16 total lessons")

        print(f"   - 5 Forum categories with 4 discussions")

        print(f"   - 4 Resource categories with 5 resources")

        print(f"   - 4 Media library items with tags")



    except Exception as e:

        db.rollback()

        print(f"❌ Error seeding database: {e}")

    finally:

        db.close()



if __name__ == "__main__":

    seed_database()