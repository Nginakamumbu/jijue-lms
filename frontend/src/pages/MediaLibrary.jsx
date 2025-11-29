import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './MediaLibrary.css'; // <-- Renamed to MediaLibrary.css

// --- Internal Constants for Styling ---
const PRIMARY_COLOR = "#C895FF";

// --- App Component ---
export default function MediaLibrary() { // <-- Renamed the component to MediaLibrary
    const [isDarkMode, setIsDarkMode] = useState(false);

    // ... (rest of the React logic)

    const toggleDarkMode = () => {
        // ... (toggle logic using 'dark-mode' class, not 'dark')
    };

    return (
        <div className="app-root-container">
            <div 
                className="landing-page-wrapper"
            >
                {/* Background Image Container */}
                <div className="background-image-container">
                    {/* ... (image tag) */}
                    {/* Gradient Overlay (Styled in CSS via class) */}
                    <div className="gradient-overlay" />
                </div>

                {/* Header with Logo and Dark Mode Toggle */}
                <header className="header-bar">
                    <div className="header-content-container">
                        <div className="logo-group">
                            {/* ... (Logo SVG and text) */}
                        </div>
                        {/* Dark Mode Toggle */}
                        <button
                            className="dark-mode-toggle"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="icon-lg" /> : <Moon className="icon-lg" />}
                        </button>
                    </div>
                </header>

                {/* Main Content (Hero Section) */}
                <main className="hero-section">
                    <div className="hero-content-container">
                        <div className="hero-text-area">
                            <div className="text-alignment-wrapper">
                                <h1 className="hero-title">Welcome to JIJUE</h1>
                                <p 
                                    className="hero-subtitle" 
                                    style={{ color: PRIMARY_COLOR }}
                                >
                                    Accurate, stigma-free HIV awareness for every Kenyan. Privacy guaranteed.
                                </p>
                                <div className="hero-buttons">
                                    <a 
                                        className="btn btn-primary" 
                                        href="#"
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                    >
                                        LOGIN
                                    </a>
                                    <a 
                                        className="btn btn-secondary" 
                                        href="#"
                                    >
                                        SIGNUP
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}