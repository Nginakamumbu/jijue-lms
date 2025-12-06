import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Search, BookOpen, Clock } from "lucide-react";
import "./MyCoursesPage.css";

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all courses and enrollment data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all courses
        const coursesResponse = await fetch("http://localhost:8000/api/courses");
        if (!coursesResponse.ok) throw new Error("Failed to fetch courses");
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch enrollments for current user (from dashboard)
        const dashResponse = await fetch("http://localhost:8000/api/dashboard");
        if (!dashResponse.ok) throw new Error("Failed to fetch dashboard");
        const dashData = await dashResponse.json();

        // For now, we'll assume the student has enrollments with progress
        // In a real app, this would come from /api/users/me/enrollments
        const enrolled = coursesData.slice(0, 2).map((course, index) => ({
          ...course,
          progress: [75, 0][index] || 0,
          status: [75, 0][index] > 0 ? "in-progress" : "not-started",
          lastAccessed: index === 0 ? "2 hours ago" : null,
        }));

        setEnrolledCourses(enrolled);
        setError(null);
      } catch (err) {
        setError(err.message);
        setEnrolledCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = enrolledCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartCourse = (courseId) => {
    // Navigate to course detail page with modules and lessons
    window.location.href = `/course/${courseId}`;
  };

  return (
    <DashboardLayout>
      <div className="my-courses-container">
        <div className="page-header">
          <h1 className="page-title">My Courses</h1>
          <p className="page-subtitle">
            Continue your learning journey with our curated courses
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-wrapper">
            <Search size={20} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search your courses..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-container">
          {loading ? (
            <div className="loading-state">
              <p>Loading your courses...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error loading courses: {error}</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <>
              {/* In Progress Courses */}
              {filteredCourses.filter((c) => c.progress > 0).length > 0 && (
                <div className="courses-section">
                  <h2 className="section-title">In Progress</h2>
                  <div className="course-cards-grid">
                    {filteredCourses
                      .filter((c) => c.progress > 0)
                      .map((course) => (
                        <div key={course.id} className="course-card-my">
                          <div className="card-header-my">
                            <div className="course-icon-badge">{course.icon}</div>
                            <div className="course-meta">
                              <h3 className="course-title-my">{course.title}</h3>
                              <p className="course-category-my">{course.category}</p>
                            </div>
                          </div>

                          <p className="course-description-my">
                            {course.description}
                          </p>

                          <div className="progress-section">
                            <div className="progress-header">
                              <span>Progress</span>
                              <span className="progress-percentage">
                                {course.progress}%
                              </span>
                            </div>
                            <div className="progress-bar-wrapper">
                              <div className="progress-track-my">
                                <div
                                  className="progress-fill"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {course.lastAccessed && (
                            <p className="last-accessed">
                              Last accessed {course.lastAccessed}
                            </p>
                          )}

                          <button
                            className="continue-button-my"
                            onClick={() => handleStartCourse(course.id)}
                          >
                            Continue Learning
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Not Started Courses */}
              {filteredCourses.filter((c) => c.progress === 0).length > 0 && (
                <div className="courses-section">
                  <h2 className="section-title">Not Started</h2>
                  <div className="course-cards-grid">
                    {filteredCourses
                      .filter((c) => c.progress === 0)
                      .map((course) => (
                        <div key={course.id} className="course-card-my">
                          <div className="card-header-my">
                            <div className="course-icon-badge">
                              {course.icon}
                            </div>
                            <div className="course-meta">
                              <h3 className="course-title-my">{course.title}</h3>
                              <p className="course-category-my">
                                {course.category}
                              </p>
                            </div>
                          </div>

                          <p className="course-description-my">
                            {course.description}
                          </p>

                          <button
                            className="start-button-my"
                            onClick={() => handleStartCourse(course.id)}
                          >
                            Start Course
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <BookOpen size={64} className="empty-icon" />
              <h2>No courses found</h2>
              <p>Enroll in courses from the Course Catalog to get started!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyCoursesPage;
