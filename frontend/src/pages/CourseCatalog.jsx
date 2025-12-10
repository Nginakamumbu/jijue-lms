import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { Search } from "lucide-react";
import "./CourseCatalog.css";

const CourseCatalog = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    // Fetch courses from the backend API
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get unique categories from courses
  const categories = ["All Categories", ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <DashboardLayout>
      <div className="course-catalog-content">
        {/* Page Header */}
        <div className="catalog-header-section">
          <h1 className="catalog-title">Course Catalog</h1>
          <p className="catalog-subtitle">
            Enhance your knowledge on HIV/AIDS with our curated courses.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="catalog-search-filter">
          <div className="search-filter-group">
            <div className="search-input-container">
              <Search size={20} className="search-icon" />
              <input
                className="search-input"
                placeholder="Search for courses..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-select-container">
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="course-grid">
          {loading ? (
            <div className="no-courses">
              <p>Loading courses...</p>
            </div>
          ) : error ? (
            <div className="no-courses">
              <p>Error loading courses: {error}</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-card-header">
                  <h3 className="course-title">{course.title}</h3>
                  <span className="course-category">{course.category}</span>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-card-footer">
                  <button 
                    className="course-action-button button-primary"
                    onClick={() => handleStartCourse(course.id)}
                  >
                    Start Course
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-courses">
              <p>No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseCatalog;