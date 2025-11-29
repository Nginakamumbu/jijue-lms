import React from "react";
import "./CourseCatalog.css"; // Import the CSS file

// Dummy data for courses
const courses = [
  {
    title: "Introduction to HIV",
    description:
      "Understand the fundamentals of HIV, how it is transmitted, and its impact on the immune system.",
    progress: 75,
    buttonText: "Continue Learning",
    buttonType: "primary",
  },
  {
    title: "Prevention Strategies",
    description:
      "Learn about various methods of HIV prevention, including safe practices, PrEP, and PEP.",
    progress: 0,
    buttonText: "Start Course",
    buttonType: "secondary",
  },
  {
    title: "Treatment and Care",
    description:
      "An overview of antiretroviral therapy (ART), adherence, and managing life with HIV.",
    progress: 30,
    buttonText: "Continue Learning",
    buttonType: "primary",
  },
  {
    title: "HIV & Mental Health",
    description:
      "Explore the connection between HIV and mental well-being, and learn coping strategies.",
    progress: 0,
    buttonText: "Start Course",
    buttonType: "secondary",
  },
  {
    title: "Combating Stigma",
    description:
    // Added a simple placeholder to manage the missing buttonClass logic based on completion
      "Learn to identify and challenge HIV-related stigma and discrimination in communities.",
    progress: 100,
    buttonText: "Course Completed",
    buttonType: "completed",
    progressColorClass: "progress-completed", // Custom class for 100%
  },
  {
    title: "Legal Rights & HIV",
    description:
      "Understand the legal and human rights of people living with HIV in Kenya.",
    progress: 0,
    buttonText: "Start Course",
    buttonType: "secondary",
  },
];

const CourseCatalog = () => {
  return (
    <div className="course-catalog-wrapper">
      {/* Header */}
      <header className="catalog-header">
        <nav className="catalog-container header-nav-content">
          <div className="flex justify-between items-center w-full">
            <a className="catalog-logo" href="#">
              <span className="logo-part-1">Tech</span>
              <span className="logo-part-2">Health</span>
            </a>
            <div className="header-actions">
              <button className="notification-button">
                <span className="material-symbols-outlined notification-icon">notifications</span>
              </button>
              <div className="user-profile">
                <div className="user-avatar-placeholder">
                  <span>JD</span>
                </div>
                <div className="user-info-text">
                  <p className="user-name">John Doe</p>
                  <p className="user-profile-link">View Profile</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="catalog-main-content">
        {/* Heading */}
        <div className="catalog-heading-section">
          <h1 className="catalog-title">
            Explore Courses
          </h1>
          <p className="catalog-subtitle">
            Enhance your knowledge on HIV/AIDS with our curated courses.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="catalog-search-filter">
          <div className="search-filter-group">
            <div className="search-input-container">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
              <input
                className="search-input"
                placeholder="Search for courses..."
                type="text"
              />
            </div>
            <div className="filter-select-container">
              <select className="filter-select">
                <option>All Categories</option>
                <option>HIV Basics</option>
                <option>Prevention</option>
                <option>Treatment & Care</option>
                <option>Living with HIV</option>
              </select>
              <span className="material-symbols-outlined filter-arrow">
                expand_more
              </span>
            </div>
            <button className="filter-button">
              Filter
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="course-grid">
          {courses.map((course, index) => (
            <div
              key={index}
              className="course-card"
            >
              <div className="course-card-content">
                <h3 className="course-title">
                  {course.title}
                </h3>
                <p className="course-description">
                  {course.description}
                </p>
              </div>
              <div className="course-card-footer">
                <div className="progress-bar-container">
                  <div className="progress-labels">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className={`progress-bar ${course.progressColorClass || "bg-primary-default"}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <a
                  className={`course-action-button button-type-${course.buttonType}`}
                  href="#"
                >
                  {course.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseCatalog;