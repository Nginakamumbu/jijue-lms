import React, { useState, useEffect } from 'react';
import { Moon, BookOpen, Clock, CheckCircle, CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import './CoursePage.css'; // Import the dedicated CSS file

const courseData = {
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
};

const Header = ({ darkMode, toggleDarkMode }) => (
  <header className="header">
    <div className="header-container">
      <div className="header-content">
        <a className="logo" href="#">
          <span className="logo-part-1">Tech</span>
          <span className="logo-part-2">Health</span>
        </a>
        <nav className="nav">
          {["Dashboard", "Courses", "Community"].map((item) => (
            <a
              key={item}
              className={`nav-link ${item === "Courses" ? "nav-link-active" : ""}`}
              href="#"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="user-controls">
          <button
            onClick={toggleDarkMode}
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
          >
            <Moon className="icon-lg" />
          </button>
          <img
            alt="User avatar"
            className="avatar-sm"
            src="https://placehold.co/40x40/C8A2C8/FFFFFF?text=J.D."
          />
        </div>
      </div>
    </div>
  </header>
);

const InstructorCard = ({ instructor }) => (
  <div className="card instructor-card">
    <h3 className="card-title-display">Expert Instructor</h3>
    <div className="instructor-details">
      <img
        alt={instructor.name}
        className="avatar-md"
        src={instructor.avatar}
      />
      <div>
        <h4 className="instructor-name">{instructor.name}</h4>
        <p className="instructor-title">{instructor.title}</p>
      </div>
    </div>
    <p className="instructor-bio">
      {instructor.bio}
    </p>
  </div>
);

const LessonItem = ({ lesson }) => {
  let icon, classes;

  switch (lesson.status) {
    case 'completed':
      icon = <CheckCircle2 className="icon-sm" />;
      classes = 'lesson-completed';
      break;
    case 'current':
      icon = <PlayCircle className="icon-sm lesson-current-icon" />;
      classes = 'lesson-current';
      break;
    case 'locked':
    default:
      icon = <Lock className="icon-sm" />;
      classes = 'lesson-locked';
      break;
  }

  return (
    <li className={`lesson-item ${classes}`}>
      <div className="lesson-info">
        <span className="lesson-icon">{icon}</span>
        <span className="lesson-title">{lesson.id} {lesson.title}</span>
      </div>
      <span className="lesson-duration">{lesson.duration}</span>
    </li>
  );
};

const CoursePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Sync dark mode state with the document class
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="app-container">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <div className="main-content-container">
          <div className="course-layout">
            {/* Left Column (Course Details & Curriculum) */}
            <div className="course-main-column">

              {/* Course Header */}
              <div className="card course-header-card">
                <span className="course-tag">Core Knowledge</span>
                <h1 className="course-title-display">
                  Course: {courseData.title}
                </h1>
                <p className="course-description">
                  {courseData.description}
                </p>
                <div className="course-meta">
                  <div className="meta-item">
                    <BookOpen className="icon-sm meta-icon" />
                    <span>{courseData.level}</span>
                  </div>
                  <div className="meta-item">
                    <Clock className="icon-sm meta-icon" />
                    <span>{courseData.duration}</span>
                  </div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="card outcomes-card">
                <h2 className="card-title-display">What You'll Learn</h2>
                <ul className="outcomes-list">
                  {courseData.learningOutcomes.map((item, index) => (
                    <li key={index} className="outcome-item">
                      <CheckCircle className="icon-sm outcome-icon" />
                      <span className="outcome-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Curriculum */}
              <div className="card curriculum-card">
                <h2 className="card-title-display">Course Curriculum</h2>
                <div className="curriculum-modules">
                  {courseData.curriculum.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="module-container">
                      <div className="module-header">
                        <h3 className="module-title">{module.title}</h3>
                      </div>
                      <ul className="module-lessons">
                        {module.lessons.map((lesson) => (
                          <LessonItem key={lesson.id} lesson={lesson} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="course-sidebar">
              {/* Course Progress Card */}
              <div className="card progress-card">
                <h3 className="card-title-display">Course Progress</h3>
                <div className="progress-bar-background">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="progress-text">{progress}% Complete</p>
                <button className="continue-button">
                  Continue Lesson 1.2
                </button>
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

export default CoursePage;