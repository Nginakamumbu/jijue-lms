import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import ProgressRing from '../components/ProgressRing';
import './CoursePage.css';

const CURRENT_USER_ID = 2; // Alex Johnson's user ID
const API_BASE_URL = 'http://localhost:8000';

const LessonItem = ({ lesson, status = 'not_started', courseId, onClick }) => {
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
    <li className={`lesson-item ${classes}`} onClick={onClick} style={{ cursor: 'pointer' }}>
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
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  const [lessonProgressMap, setLessonProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course with modules and lessons
        const courseRes = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
        if (!courseRes.ok) throw new Error('Failed to fetch course');
        const data = await courseRes.json();
        setCourseData(data);

        // Fetch course progress
        const progressRes = await fetch(
          `${API_BASE_URL}/api/users/${CURRENT_USER_ID}/course-progress/${courseId}`
        );
        if (progressRes.ok) {
          setCourseProgress(await progressRes.json());
        }

        // Fetch lesson progress for all lessons
        const allLessons = data.modules.flatMap(m => m.lessons || []);
        const progressMap = {};
        
        for (const lesson of allLessons) {
          const res = await fetch(
            `${API_BASE_URL}/api/users/${CURRENT_USER_ID}/lesson-progress/${lesson.id}`
          );
          if (res.ok) {
            const prog = await res.json();
            progressMap[lesson.id] = prog.status || 'not_started';
          }
        }
        setLessonProgressMap(progressMap);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`, { state: { courseId } });
  };

  if (loading) return <div className="loading-screen">Loading course...</div>;
  if (error) return <div className="error-screen">Error: {error}</div>;
  if (!courseData) return <div className="error-screen">Course not found</div>;

  const modules = courseData.modules || [];
  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const completedLessons = Object.values(lessonProgressMap).filter(s => s === 'completed').length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="course-page-wrapper">
        {/* Course Header */}
        <div className="course-header">
          <div className="course-header-content">
            <h1 className="course-title">{courseData.title}</h1>
            <p className="course-description">{courseData.description}</p>
            
            <div className="course-stats">
              <div className="stat-item">
                <BookOpen size={20} />
                <span>{totalLessons} Lessons</span>
              </div>
              <div className="stat-item">
                <Clock size={20} />
                <span>{modules.length} Modules</span>
              </div>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="course-progress-widget">
            <ProgressRing percentage={progressPercentage} />
            <p className="progress-label">{progressPercentage}% Complete</p>
          </div>
        </div>

        {/* Modules and Lessons */}
        <div className="modules-container">
          {modules.map((module, idx) => (
            <div key={module.id} className="module-card">
              <div className="module-header">
                <h2 className="module-title">{module.title}</h2>
                <span className="module-number">Module {idx + 1}</span>
              </div>

              <p className="module-description">{module.description}</p>

              {/* Lessons List */}
              <ul className="lessons-list">
                {(module.lessons || []).map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    status={lessonProgressMap[lesson.id] || 'not_started'}
                    courseId={courseId}
                    onClick={() => handleLessonClick(lesson.id)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursePage;
