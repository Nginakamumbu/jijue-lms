import React from 'react';
import { Link } from 'react-router-dom';
import { getIconComponent } from '../pages/Dashboard'; // Import icon helper

/**
 * FeatureCard Component: Renders a large card for Featured Courses.
 * @param {object} course - Course data (title, description, icon, color).
 */
export default function FeatureCard({ course }) {
    const Icon = getIconComponent(course.icon);
    const colorClass = course.color === 'secondary' ? 'course-secondary' : 'course-primary';
    const url = course.link || '#';
    const isExternal = typeof url === 'string' && (url.startsWith('http') || url.startsWith('#'));

    const cardContent = (
        <div className={`course-card`}>
            <div className={`course-icon-wrapper ${colorClass}`}>
                <Icon className="icon-lg" />
            </div>
            <h4 className="course-title">{course.title}</h4>
            <p className="course-description">{course.description}</p>
        </div>
    );

    if (isExternal) {
        return <a href={url} className="course-link">{cardContent}</a>;
    }

    return (
        <Link to={url} className="course-link">
            {cardContent}
        </Link>
    );
}