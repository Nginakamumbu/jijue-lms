import React from 'react';

/**
 * ProgressRing Component: Renders a circular progress indicator based on a percentage.
 * @param {number} percentage - The completion percentage (0-100).
 */
export default function ProgressRing({ percentage }) {
    // Calculates the arc length for the SVG path
    const strokeDasharray = `${percentage}, 100`;

    return (
        <div className="progress-ring-container">
            <svg className="progress-ring-svg" viewBox="0 0 36 36">
                {/* Background circle */}
                <path 
                    className="progress-bg" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    strokeWidth="3"
                />
                {/* Progress arc */}
                <path 
                    className="progress-fill" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    strokeDasharray={strokeDasharray} 
                    strokeDashoffset={0}
                    strokeLinecap="round" 
                    strokeWidth="3"
                />
            </svg>
            <div className="progress-ring-text">
                <span className="progress-percentage-value">{percentage}%</span>
                <span className="progress-label">Completed</span>
            </div>
        </div>
    );
}