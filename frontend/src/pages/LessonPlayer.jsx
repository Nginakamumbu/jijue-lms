import React from "react";
import './LessonPlayer.css'; // Import the dedicated CSS file
import { 
    ArrowLeft, 
    CheckCircle, 
    PlayCircle, 
    Circle, 
    ArrowRight, // <--- CHANGED FROM ArrowForward 
    Moon
} from 'lucide-react';

// --- Data Structure ---
const lesson = {
  module: "Module 2: Transmission & Prevention",
  title: "Lesson: How HIV is Transmitted",
  videoUrl: "#", // Replace with actual video URL
  content: `
    This video provides essential, clear information about how HIV is transmitted from one person to another.
    It's important to separate myths from facts to protect yourself and others. HIV is found in specific body fluids
    of an infected person: blood, semen, pre-seminal fluid, rectal fluids, vaginal fluids, and breast milk.

    Transmission can only occur when these fluids come into contact with a mucous membrane (found in the rectum, vagina, penis, and mouth),
    damaged tissue, or are directly injected into the bloodstream. It's crucial to understand that HIV is not spread
    through casual contact like hugging, sharing food, or toilet seats.
  `,
  keyPoints: [
    "Sexual Contact: Anal and vaginal sex are the most common ways HIV is transmitted.",
    "Sharing Needles: Sharing needles, syringes, or other drug injection equipment with someone who has HIV.",
    "Mother to Child: During pregnancy, childbirth, or breastfeeding.",
  ],
  quiz: {
    question: "Which of the following is NOT a primary route for HIV transmission?",
    options: [
      { label: "Sexual contact", value: "sexual" },
      { label: "Sharing utensils", value: "utensils" },
      { label: "From mother to child during birth", value: "mother" },
    ],
  },
  progress: 50,
  lessons: [
    { module: 1, items: ["1.1 What is HIV?", "1.2 History", "1.3 Stigma"], completed: [true, true, true] },
    { module: 2, items: ["2.1 How HIV is Transmitted", "2.2 Prevention"], completed: [false, false] },
    { module: 3, items: ["3.1 Treatment", "3.2 Mental Health"], completed: [false, false] },
  ],
};

// --- Constants ---
const PRIMARY_COLOR = "#7C3AED"; // Placeholder for primary color (purple)
const SECONDARY_COLOR = "#06B6D4"; // Placeholder for secondary color (cyan)


const LessonPlayer = () => {
    // Helper function to render Lucide icon based on completion status
    const LessonIcon = ({ isCompleted, isCurrent }) => {
        if (isCompleted) {
            return <CheckCircle className="lesson-icon-sm lesson-completed-icon" />;
        }
        if (isCurrent) {
            return <PlayCircle className="lesson-icon-sm lesson-current-icon" />;
        }
        // Using Circle instead of RadioButton as a common Lucide alternative for an unchecked state
        return <Circle className="lesson-icon-sm lesson-uncompleted-icon" />; 
    };

    return (
        <div className="lesson-player-page">
            {/* Header */}
            <header className="header-bar">
                <div className="header-content-container">
                    <a className="logo-header" href="#">
                        <span className="logo-part-secondary" style={{ color: SECONDARY_COLOR }}>Tech</span>
                        <span className="logo-part-primary" style={{ color: PRIMARY_COLOR }}>Health</span>
                    </a>
                    <nav className="nav-menu">
                        <a className="nav-link" href="#">Dashboard</a>
                        <a className="nav-link nav-link-active" href="#" style={{ color: PRIMARY_COLOR }}>Courses</a>
                        <a className="nav-link" href="#">Community</a>
                    </nav>
                    <div className="user-actions">
                        {/* Dark Mode Toggle Placeholder */}
                        <button className="icon-btn">
                            <Moon className="icon-lg" />
                        </button>
                        <img className="user-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfk2rFVv5XShW8YoRysujKcZMjEC2kY-wxxxYI46A7FdNrpNeIlLe9_4gRVaCRzfq3HHr8722BIqeCID2sJOMVWNkSQOhSshtuMlik4urxl4PlPe_jYA3-WE5iispDu0ql8dTsKgaKtDV-6NHwjQUk2hs2aV2V1JhOuG8Ujns15WbhFViAulcwT4_-4Dv4mVENNfPznDv_HnqoG8GpdaHI829XlsRPXG0RHYTtOW1k_N7OjGx9Sk2j8mLY7qy3PMBZbKRQqe5RmWZ6" alt="User avatar" />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="main-content-area">
                {/* Back link */}
                <div className="back-link-wrapper">
                    <a className="back-link" href="#">
                        <ArrowBack className="icon-xs mr-1" />
                        Back to Module Overview
                    </a>
                </div>

                <div className="main-grid-layout">
                    {/* Lesson content */}
                    <div className="lesson-main-column">
                        {/* Video */}
                        <div className="video-player-card">
                            <div className="video-placeholder">
                                <PlayCircle className="video-play-icon" />
                            </div>
                        </div>

                        {/* Lesson details */}
                        <div className="content-card lesson-details-card">
                            <span className="module-tag" style={{ backgroundColor: PRIMARY_COLOR + '20', color: PRIMARY_COLOR }}>
                                {lesson.module}
                            </span>
                            <h1 className="lesson-title">
                                {lesson.title}
                            </h1>
                            <article className="lesson-prose">
                                {lesson.content.split("\n").map((line, i) => <p key={i}>{line}</p>)}
                                <h3>Key Transmission Routes:</h3>
                                <ul>
                                    {lesson.keyPoints.map((kp, i) => {
                                        const parts = kp.split(":");
                                        return <li key={i}><strong>{parts[0]}:</strong> {parts[1]}</li>;
                                    })}
                                </ul>
                            </article>
                        </div>

                        {/* Quiz */}
                        <div className="content-card quiz-card">
                            <h2 className="quiz-title">Knowledge Check</h2>
                            <div className="quiz-container">
                                <div>
                                    <p className="quiz-question">{lesson.quiz.question}</p>
                                    <div className="quiz-options-list">
                                        {lesson.quiz.options.map((opt, i) => (
                                            <label key={i} className="quiz-option-label">
                                                <input type="radio" name="quiz-q1" className="quiz-radio-input" />
                                                <span className="quiz-option-text">{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <button className="quiz-submit-btn" style={{ backgroundColor: PRIMARY_COLOR, color: '#FFFFFF' }}>
                                    Check Answer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lesson-sidebar-column">
                        {/* Module Progress */}
                        <div className="content-card progress-card">
                            <h3 className="card-title">Module Progress</h3>
                            <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{ width: `${lesson.progress}%`, backgroundColor: PRIMARY_COLOR }}></div>
                            </div>
                            <p className="progress-summary">
                                2 of 4 lessons complete
                            </p>

                            <div className="navigation-links">
                                <a className="nav-link-prev" href="#">
                                    <div className="nav-link-group">
                                        <ArrowBack className="icon-sm" />
                                        <span className="nav-link-text">Previous Lesson</span>
                                    </div>
                                    <span className="nav-link-id">1.3</span>
                                </a>
                                <button className="nav-link-next" style={{ backgroundColor: PRIMARY_COLOR, color: '#FFFFFF' }}>
                                    <div className="nav-link-group">
                                        <span className="nav-link-text nav-link-text-bold">Next Lesson</span>
                                    </div>
                                    <div className="nav-link-group">
                                        <span className="nav-link-id">2.2</span>
                                        <ArrowForward className="icon-sm" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Course Contents */}
                        <div className="content-card contents-card">
                            <h3 className="card-title">Course Contents</h3>
                            <ul className="course-modules-list">
                                {lesson.lessons.map((mod, idx) => (
                                    <li key={idx}>
                                        <span className="module-title">Module {mod.module}</span>
                                        <ul className={`lessons-list ${mod.module === 2 ? "lessons-list-active" : "lessons-list-inactive"}`}>
                                            {mod.items.map((item, i) => (
                                                <li key={i}>
                                                    <a className={`lesson-item ${mod.completed[i] ? "lesson-completed" : mod.module === 2 && i === 0 ? "lesson-current" : "lesson-uncompleted"}`} href="#">
                                                        <LessonIcon 
                                                            isCompleted={mod.completed[i]} 
                                                            isCurrent={mod.module === 2 && i === 0}
                                                        />
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LessonPlayer;