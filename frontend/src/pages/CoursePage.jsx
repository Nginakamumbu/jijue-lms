import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import './CoursePage.css';

const LessonItem = ({ lesson, status = 'not_started' }) => {
  let icon, classes;

  switch (status) {
    case 'completed':
      icon = <CheckCircle2 className="icon-sm" />;
      classes = 'lesson-completed';
      break;
    case 'in_progress':
      icon = <PlayCircle className="icon-sm lesson-current-icon" />;
      classes = 'lesson-current';
      break;
    case 'not_started':
    default:
      icon = <Lock className="icon-sm" />;
      classes = 'lesson-locked';
      break;
  }

  return (
    <li className={`lesson-item ${classes}`}>
      <div className="lesson-info">
        <span className="lesson-icon">{icon}</span>
        <span className="lesson-title">{lesson.title}</span>
      </div>
      <span className="lesson-duration">{lesson.duration_minutes} min</span>
    </li>
  );
};

const CoursePage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        const data = await response.json();
        setCourseData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCourseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="course-container">
          <p>Loading course...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="course-container">
          <p>Error: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!courseData) {
    return (
      <DashboardLayout>
        <div className="course-container">
          <p>Course not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="course-container">
        <div className="course-layout">
          {/* Left Column (Course Details & Curriculum) */}
          <div className="course-main-column">

            {/* Course Header */}
            <div className="card course-header-card">
              <span className="course-tag">{courseData.category}</span>
              <h1 className="course-title-display">
                {courseData.title}
              </h1>
              <p className="course-description">
                {courseData.description}
              </p>
              <div className="course-meta">
                <div className="meta-item">
                  <BookOpen className="icon-sm meta-icon" />
                  <span>{courseData.modules?.length || 0} Modules</span>
                </div>
                <div className="meta-item">
                  <Clock className="icon-sm meta-icon" />
                  <span>Approx. {(courseData.modules || []).reduce((sum, m) => sum + (m.lessons || []).reduce((ls, l) => ls + (l.duration_minutes || 0), 0), 0)} minutes</span>
                </div>
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="card curriculum-card">
              <h2 className="card-title-display">Course Curriculum</h2>
              <div className="curriculum-modules">
                {courseData.modules && courseData.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="module-container">
                    <div className="module-header">
                      <h3 className="module-title">{module.title}</h3>
                    </div>
                    <ul className="module-lessons">
                      {module.lessons && module.lessons.map((lesson) => (
                        <LessonItem key={lesson.id} lesson={lesson} status="not_started" />
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
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursePage;