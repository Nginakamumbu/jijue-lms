import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProgressRing from "../components/ProgressRing";
import { ArrowLeft, CheckCircle, PlayCircle, Circle } from 'lucide-react';
import './LessonPlayer.css';

const PRIMARY_COLOR = "#A569BD";
const API_BASE_URL = 'http://localhost:8000';
const CURRENT_USER_ID = 2; // Alex Johnson's user ID

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [module, setModule] = useState(null);
  const [course, setCourse] = useState(null);
  const [moduleProgress, setModuleProgress] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch lesson details
        const lessonRes = await fetch(`${API_BASE_URL}/api/lessons/${lessonId}`);
        if (!lessonRes.ok) throw new Error('Failed to fetch lesson');
        const lessonData = await lessonRes.json();
        setLesson(lessonData);
        
        // Fetch module details
        const moduleRes = await fetch(`${API_BASE_URL}/api/modules/${lessonData.module_id}`);
        if (!moduleRes.ok) throw new Error('Failed to fetch module');
        const moduleData = await moduleRes.json();
        setModule(moduleData);
        
        // Fetch course details
        const courseRes = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
        if (!courseRes.ok) throw new Error('Failed to fetch course');
        const courseData = await courseRes.json();
        setCourse(courseData);
        
        // Fetch lesson progress
        const progressRes = await fetch(
          `${API_BASE_URL}/api/users/${CURRENT_USER_ID}/lesson-progress/${lessonId}`
        );
        if (progressRes.ok) {
          const progressData = await progressRes.json();
          setLessonProgress(progressData);
        }
        
        // Fetch module progress
        const moduleProgressRes = await fetch(
          `${API_BASE_URL}/api/users/${CURRENT_USER_ID}/module-progress/${lessonData.module_id}`
        );
        if (moduleProgressRes.ok) {
          const moduleProgressData = await moduleProgressRes.json();
          setModuleProgress(moduleProgressData);
        }
        
      } catch (error) {
        console.error('Error fetching lesson data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId && courseId) {
      fetchLessonData();
    }
  }, [lessonId, courseId]);

  const handleMarkComplete = async () => {
    try {
      const newStatus = lessonProgress?.progress_percentage === 100 ? 0 : 100;
      const newLessonStatus = newStatus === 100 ? "completed" : "in_progress";
      
      const response = await fetch(
        `${API_BASE_URL}/api/users/${CURRENT_USER_ID}/lesson-progress/${lessonId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: newLessonStatus,
            progress_percentage: newStatus
          })
        }
      );
      
      if (response.ok) {
        const updatedProgress = await response.json();
        setLessonProgress(updatedProgress);
        
        // Refresh module progress
        const moduleProgressRes = await fetch(
          `${API_BASE_URL}/api/users/${CURRENT_USER_ID}/module-progress/${module?.id}`
        );
        if (moduleProgressRes.ok) {
          const moduleProgressData = await moduleProgressRes.json();
          setModuleProgress(moduleProgressData);
        }
      }
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading lesson...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !lesson || !module || !course) {
    return (
      <DashboardLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>{error || 'Lesson not found.'}</p>
          <button 
            onClick={() => navigate('/courses')} 
            style={{ 
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: PRIMARY_COLOR,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Back to Courses
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const isCompleted = lessonProgress?.progress_percentage === 100;

  return (
    <DashboardLayout>
      <div className="lesson-player-container">
        {/* Back Navigation */}
        <button 
          onClick={() => navigate(`/course/${courseId}`)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: `1px solid ${PRIMARY_COLOR}`,
            color: PRIMARY_COLOR,
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={18} />
          Back to {course.title}
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Main Content */}
          <div>
            {/* Video Player */}
            <div style={{
              backgroundColor: '#000',
              borderRadius: '0.75rem',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              overflow: 'hidden'
            }}>
              <iframe
                width="100%"
                height="100%"
                src={lesson.content?.replace('watch?v=', 'embed/')}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '0.75rem' }}
              />
            </div>

            {/* Lesson Content */}
            <div style={{
              backgroundColor: 'var(--bg-card, #fff)',
              padding: '2rem',
              borderRadius: '0.75rem',
              marginBottom: '2rem'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: `${PRIMARY_COLOR}20`,
                  color: PRIMARY_COLOR,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {module.title}
                </span>
              </div>

              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--text-primary, #111)'
              }}>
                {lesson.title}
              </h1>

              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary, #666)',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {lesson.description}
              </p>

              <div style={{
                backgroundColor: '#f5f5f5',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginTop: '1.5rem',
                borderLeft: `4px solid ${PRIMARY_COLOR}`
              }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary, #111)' }}>
                  About This Lesson
                </h3>
                <p style={{
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary, #111)'
                }}>
                  {lesson.content || 'No additional content available.'}
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button
                  onClick={handleMarkComplete}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: isCompleted ? '#58D68D' : PRIMARY_COLOR,
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {isCompleted ? <CheckCircle size={18} /> : <Circle size={18} />}
                  {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Module Progress */}
            {moduleProgress && (
              <div style={{
                backgroundColor: 'var(--bg-card, #fff)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--text-primary, #111)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Module Progress
                </h3>
                <ProgressRing percentage={moduleProgress.progress_percentage} />
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary, #666)',
                  marginTop: '1rem'
                }}>
                  {moduleProgress.completed_lessons} of {moduleProgress.total_lessons} lessons completed
                </p>
              </div>
            )}

            {/* Module Lessons */}
            <div style={{
              backgroundColor: 'var(--bg-card, #fff)',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--text-primary, #111)'
              }}>
                Module Lessons
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {module.lessons && module.lessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => navigate(`/course/${courseId}/lesson/${l.id}`)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: lesson.id === l.id ? `${PRIMARY_COLOR}20` : 'transparent',
                      border: `1px solid ${lesson.id === l.id ? PRIMARY_COLOR : '#e5e7eb'}`,
                      borderRadius: '0.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'var(--text-primary, #111)',
                      transition: 'all 0.2s',
                      fontSize: '0.9rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {lesson.id === l.id ? (
                        <PlayCircle size={16} color={PRIMARY_COLOR} />
                      ) : (
                        <Circle size={16} color="#999" />
                      )}
                      <span style={{ flex: 1 }}>{l.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Course Info */}
            <div style={{
              backgroundColor: 'var(--bg-card, #fff)',
              padding: '1.5rem',
              borderRadius: '0.75rem'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: 'var(--text-primary, #111)'
              }}>
                Duration
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary, #666)'
              }}>
                {lesson.duration_minutes} minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}