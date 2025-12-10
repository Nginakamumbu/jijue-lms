import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom'; // Ensure this is imported for real use!
import {
    Moon, BookOpen, Clock, CheckCircle, PlayCircle, Lock,
    Menu, X, ArrowLeft
} from 'lucide-react';
import "./CourseDetails.css"; // Import the CSS file

// --- Mock Data Store for Development ---
// Use a map/dictionary to store multiple courses keyed by their ID.
const MOCK_COURSE_DATA = {
    '1': {
        title: "Understanding HIV Basics",
        level: "Beginner Level",
        duration: "Approx. 3 hours",
        description: "Gain a foundational, fact-based understanding of HIV, including transmission, prevention, and the basics of living a healthy life with HIV.",
        learningOutcomes: [
            "Understand what HIV and AIDS are and the difference between them.",
            "Identify the primary modes of HIV transmission and, importantly, how it is not transmitted.",
            "Learn about effective prevention methods like condoms, PrEP, and PEP.",
            "Recognize the importance of testing and understand the different types of HIV tests available.",
        ],
        curriculum: [
            {
                title: "Module 1: Introduction to HIV/AIDS",
                lessons: [
                    { id: '1.1', title: "What is HIV? What is AIDS?", status: 'completed', duration: '12 min' },
                    { id: '1.2', title: "A Brief History of the Epidemic", status: 'current', duration: '15 min' },
                    { id: '1.3', title: "Stigma and Misconceptions", status: 'locked', duration: '10 min' },
                ]
            },
            {
                title: "Module 2: Transmission & Prevention",
                lessons: [
                    { id: '2.1', title: "How HIV is Transmitted", status: 'locked', duration: '18 min' },
                    { id: '2.2', title: "Effective Prevention Strategies", status: 'locked', duration: '25 min' },
                ]
            },
        ],
        instructor: {
            name: "Dr. Anya Sharma",
            title: "Public Health Specialist",
            bio: "Dr. Sharma has over 15 years of experience in infectious disease research and public health education, with a focus on community outreach in Kenya.",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAahoH6owtwhGVWUlxgNXoqfXMG49Lx84y4yCFtYmhlnYUsod7eIgV-SbcxO4NmkKKc2HbxcM2xoI4IvqAsW8k37qBZaGrF2vjTF9W1NAOdzXiVB6fk2GyP2QRNHhp0otBbeBsFS28H2B2RyTyXdKW2IQplu1SK_58NkgVfCSIvH7IzpxK5KLeUHI9xwlJs9JAXjMCE5xsTQfEMt0zoXTzrOA3_FViAulcwT4_-4Dv4mVENNfPznDv_HnqoG8GpdaHI829XlsRPXG0RHYTtOW1k_N7OjGx9Sk2j8mLY7qy3PMBZbKRQqe5RmWZ6"
        }
    },
    '2': {
        title: "Foundation of Mental Wellness",
        level: "Intermediate",
        duration: "Approx. 5 hours",
        description: "Explore core concepts of mental health, learn stress management techniques, and build resilience for long-term well-being.",
        learningOutcomes: [
            "Define mental health and recognize signs of common mental health challenges.",
            "Implement three effective mindfulness and relaxation techniques.",
            "Develop personal stress management and coping strategies.",
            "Understand the importance of professional help and available resources.",
        ],
        curriculum: [
            {
                title: "Module 1: The Mind-Body Connection",
                lessons: [
                    { id: '1.1', title: "Defining Mental Health", status: 'completed', duration: '20 min' },
                    { id: '1.2', title: "The Impact of Stress on the Body", status: 'completed', duration: '18 min' },
                    { id: '1.3', title: "Building a Daily Wellness Routine", status: 'completed', duration: '15 min' },
                ]
            },
            {
                title: "Module 2: Practical Resilience",
                lessons: [
                    { id: '2.1', title: "Mindfulness and Grounding Exercises", status: 'current', duration: '25 min' },
                    { id: '2.2', title: "Cognitive Reframing Techniques", status: 'locked', duration: '30 min' },
                    { id: '2.3', title: "Setting Healthy Boundaries", status: 'locked', duration: '20 min' },
                ]
            },
        ],
        instructor: {
            name: "Prof. Ben Carter",
            title: "Licensed Clinical Psychologist",
            bio: "Prof. Carter leads the Wellness Center at City University, specializing in anxiety, depression, and digital age mental health.",
            avatar: "https://placehold.co/64x64/20B2AA/FFFFFF?text=BC"
        }
    },
    '3': {
        title: "Essential Nutrition for a Healthy Life",
        level: "Beginner",
        duration: "Approx. 2 hours",
        description: "Learn the fundamentals of balanced nutrition, macronutrients, and making healthy dietary choices for sustained energy and health.",
        learningOutcomes: [
            "Differentiate between macronutrients and micronutrients.",
            "Understand the role of fiber and hydration in digestion.",
            "Plan a balanced meal using simple nutritional guidelines.",
            "Identify common pitfalls in modern diets and how to avoid them.",
        ],
        curriculum: [
            {
                title: "Module 1: Macros and Micros",
                lessons: [
                    { id: '1.1', title: "The Three Major Macronutrients", status: 'completed', duration: '15 min' },
                    { id: '1.2', title: "Vitamins and Minerals: The Essentials", status: 'completed', duration: '10 min' },
                ]
            },
            {
                title: "Module 2: Practical Meal Planning",
                lessons: [
                    { id: '2.1', title: "Reading Nutritional Labels Correctly", status: 'completed', duration: '18 min' },
                    { id: '2.2', title: "Quick & Healthy Breakfast Ideas", status: 'completed', duration: '20 min' },
                ]
            },
            {
                title: "Module 3: Diet Myths and Facts",
                lessons: [
                    { id: '3.1', title: "Debunking Popular Diet Trends", status: 'current', duration: '25 min' },
                ]
            }
        ],
        instructor: {
            name: "Sarah Kim, RD",
            title: "Registered Dietitian",
            bio: "Sarah is a certified dietitian focused on practical, sustainable nutrition for families and chronic disease prevention.",
            avatar: "https://placehold.co/64x64/FFB6C1/FFFFFF?text=SK"
        }
    }
};
// ------------------------------------------

// --- Helper Components (No changes needed) ---

const LessonItem = ({ lesson }) => {
    const { id, title, status, duration } = lesson;
    let IconComponent;
    let textClasses = 'text-base';
    let itemClasses = 'lesson-item';
    let iconColorClass = 'text-muted';

    switch (status) {
        case 'completed':
            IconComponent = CheckCircle;
            iconColorClass = 'text-green';
            itemClasses += ' lesson-item-completed';
            break;
        case 'current':
            IconComponent = PlayCircle;
            iconColorClass = 'text-primary';
            textClasses += ' font-semibold text-primary-dark';
            itemClasses += ' lesson-item-current';
            break;
        case 'locked':
        default:
            IconComponent = Lock;
            itemClasses += ' lesson-item-locked';
            break;
    }

    return (
        <li className={`flex items-center justify-between p-4 transition-colors duration-200 ${itemClasses}`}>
            <div className="flex items-center">
                <IconComponent className={`w-5 h-5 mr-3 flex-shrink-0 ${iconColorClass}`} />
                <span className={textClasses}>{id} {title}</span>
            </div>
            <span className="text-sm text-muted">{duration}</span>
        </li>
    );
};

const InstructorCard = ({ instructor }) => (
    <div className="card-surface instructor-card">
        <h3 className="card-title-lg font-display">Expert Instructor</h3>
        <div className="flex items-center space-x-4">
            <img
                alt={instructor.name}
                className="h-16 w-16 rounded-full object-cover shadow-md"
                src={instructor.avatar}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/C8A2C8/FFFFFF?text=Dr" }}
            />
            <div>
                <h4 className="font-bold text-lg">{instructor.name}</h4>
                <p className="text-sm text-primary">{instructor.title}</p>
            </div>
        </div>
        <p className="mt-4 text-sm text-muted leading-relaxed">
            {instructor.bio}
        </p>
    </div>
);

const Header = ({ toggleDarkMode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="header-bar shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a className="inline-flex items-center text-2xl font-bold font-display text-text" href="#">
                        <span className="text-secondary">Tech</span>
                        <span className="text-primary">Health</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        {["Dashboard", "Courses", "Community"].map(item => (
                            <a
                                key={item}
                                className={`nav-link font-medium transition-colors p-2 rounded-lg ${
                                    item === "Courses"
                                        ? "nav-link-active"
                                        : "nav-link-default"
                                }`}
                                href="#"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button
                            className="icon-button text-muted hover-bg-light"
                            aria-label="Toggle dark mode"
                            onClick={toggleDarkMode}
                        >
                            <Moon className="w-6 h-6" />
                        </button>
                        <img
                            alt="User avatar"
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary"
                            src="https://placehold.co/40x40/C8A2C8/FFFFFF?text=J.D."
                        />
                        <button
                            className="icon-button md:hidden text-muted hover-bg-light"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu md:hidden">
                    <nav className="flex flex-col space-y-2">
                        {["Dashboard", "Courses", "Community"].map(item => (
                            <a
                                key={item}
                                className={`block px-3 py-2 rounded-lg text-lg font-medium transition-colors ${
                                    item === "Courses"
                                        ? "nav-link-active"
                                        : "nav-link-default"
                                }`}
                                href="#"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};


// --- Main App Component ---

const CourseDetail = () => {
    // 1. Get the course ID from the URL (e.g., /courses/1 -> courseId = '1')
    const { courseId } = useParams();

    // --- State for Data Management ---
    // Change courseData from static object to dynamic state, initialized to null
    const [courseData, setCourseData] = useState(null); 
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0);

    // --- Data Fetching/Selection Logic (Mocked) ---
    // Simulate fetching the data using useEffect
    useEffect(() => {
        // Find the course data corresponding to the URL ID
        const selectedCourse = MOCK_COURSE_DATA[courseId];
        
        if (selectedCourse) {
            // Simulate a brief loading time if needed, but for mock data, just set it
            setCourseData(selectedCourse);
        } else {
            // Handle case where courseId is not found in mock data
            setCourseData(null); 
        }
    }, [courseId]); // Dependency on courseId ensures data changes when the route changes

    // Dark Mode Logic (Kept as is)
    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark' ||
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // --- Memoized Calculations (Now dependent on courseData state) ---

    // Calculate next lesson for the continue button text
    const nextLesson = useMemo(() => {
        if (!courseData) return null; // Guard clause for when data is not yet loaded
        for (const module of courseData.curriculum) {
            const current = module.lessons.find(l => l.status === 'current');
            if (current) {
                return current;
            }
        }
        return null; // All completed or locked
    }, [courseData]); // Dependency array updated

    // Function to calculate progress
    const calculateProgress = useMemo(() => {
        if (!courseData) return 0; // Guard clause for when data is not yet loaded
        let totalLessons = 0;
        let completedOrCurrentLessons = 0;

        courseData.curriculum.forEach(module => {
            module.lessons.forEach(lesson => {
                totalLessons++;
                if (lesson.status === 'completed') {
                    completedOrCurrentLessons++;
                } else if (lesson.status === 'current') {
                    // Count the current lesson as a partial step (e.g., 50% complete)
                    completedOrCurrentLessons += 0.5;
                }
            });
        });

        if (totalLessons === 0) return 0;

        let progress = (completedOrCurrentLessons / totalLessons) * 100;
        return Math.min(100, Math.round(progress));

    }, [courseData]); // Dependency array updated

    // Update currentProgress with calculated value
    useEffect(() => {
        setCurrentProgress(calculateProgress);
    }, [calculateProgress]);

    // --- Loading/Error/Not Found Handling ---
    if (!courseData) {
        // You would typically differentiate between 'loading' and 'not found', 
        // but for mock data, a simple check works.
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background text-text">
                <h1 className="text-3xl font-bold">Course Not Found (ID: {courseId})</h1>
                <p className="mt-4 text-lg">Please check the course ID in the URL. Try ID 1, 2, or 3.</p>
            </div>
        );
    }
    // --- End Loading/Error Handling ---


    return (
        <div className="course-detail-page-wrapper">

            {/* Header */}
            <Header toggleDarkMode={toggleDarkMode} />

            {/* Main Content Area */}
            <main className="main-content-area py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="main-grid">

                        {/* Left Column (Details & Curriculum) */}
                        <div className="details-column space-y-8">

                            {/* Back Button for mobile/contextual navigation */}
                            <button className="back-button" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to All Courses
                            </button>


                            {/* Course Header */}
                            <div className="card-surface course-header-card">
                                <span className="pill-tag">Core Knowledge</span>
                                <h1 className="course-title-main">
                                    Course: {courseData.title}
                                </h1>
                                <p className="mt-4 text-lg text-muted leading-relaxed">
                                    {courseData.description}
                                </p>
                                <div className="mt-6 flex flex-wrap items-center space-x-6 text-sm text-muted">
                                    <div className="flex items-center space-x-1.5">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                        <span>{courseData.level}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <span>{courseData.duration}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Learning Outcomes */}
                            <div className="card-surface learning-outcomes-card">
                                <h2 className="card-title-lg font-display">What You'll Learn</h2>
                                <ul className="space-y-4">
                                    {courseData.learningOutcomes.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                                            <span className="flex-1 text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Course Curriculum */}
                            <div className="card-surface curriculum-card">
                                <h2 className="card-title-lg font-display">Course Curriculum</h2>
                                <div className="space-y-6">
                                    {courseData.curriculum.map((module, moduleIndex) => (
                                        <div key={moduleIndex} className="module-container">
                                            <div className="module-header">
                                                <h3 className="font-bold text-lg">{module.title}</h3>
                                            </div>
                                            <ul className="lesson-list">
                                                {module.lessons.map(lesson => (
                                                    <LessonItem key={lesson.id} lesson={lesson} />
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Sidebar) */}
                        <div className="sidebar-column space-y-8">

                            {/* Course Progress Card */}
                            <div className="card-surface progress-card">
                                <h3 className="card-title-lg font-display">Course Progress</h3>

                                {/* Progress Bar */}
                                <div className="progress-track">
                                    <div
                                        className="progress-bar bg-secondary"
                                        style={{ width: `${currentProgress}%` }}
                                        role="progressbar"
                                        aria-valuenow={currentProgress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>

                                <p className="text-center mt-3 text-sm font-medium text-muted">{currentProgress}% Complete</p>

                                {/* Continue Button */}
                                {nextLesson && (
                                    <button
                                        className="action-button primary-action-button"
                                        onClick={() => console.log(`Starting lesson ${nextLesson.id}`)}
                                    >
                                        Continue Lesson {nextLesson.id}
                                    </button>
                                )}
                                {!nextLesson && (
                                    <button
                                        className="action-button completed-action-button"
                                        disabled
                                    >
                                        Course Completed! 🎉
                                    </button>
                                )}
                            </div>

                            {/* Instructor Card */}
                            <InstructorCard instructor={courseData.instructor} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDetail;