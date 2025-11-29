import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 👈 IMPORTED LINK
import { Sun, Moon } from 'lucide-react';
import './LandingPage.css'; // Import the dedicated CSS file

// --- Internal Constants for Styling ---
const PRIMARY_COLOR = "#C895FF";
const BACKGROUND_DARK = "#121212";

// --- App Component ---
export default function LandingPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Dark Mode Initialization & Effect
    useEffect(() => {
        // Check local storage or system preference
        const isDark = localStorage.getItem('theme') === 'dark' ||
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }

        // Set CSS variables for colors (essential for CSS access)
        document.documentElement.style.setProperty('--primary-color', PRIMARY_COLOR);
        document.documentElement.style.setProperty('--background-dark', BACKGROUND_DARK);

    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        
        if (newMode) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="app-root-container">
            <div className="landing-page-container">
                {/* Background Image Container */}
                <div className="background-image-container">
                    <img 
                        alt="Diverse hands held together in a circle, symbolizing unity and support." 
                        className="background-image" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDw1iqD7mnkeQ6GdlA6M46ZdK3UCacdnWQwI4xdR8OeQGOfcgoRrsCO0fiR--qC-m_7tG1o3rHDTmuD7T3_oOQcaL7tCbt4xLz0Gy8pFnw6gviVIfbUfPsZwdYlQE10kZ11Z7EtXKZYrWNb2kCcPO6Oo6vQdAwEi4tOl46Z5juRZCRsm69Kbf0eUh826nM-YGsYsI-Rb4_WyQTh4Z5u4pk9BrHUnsopnVQT3YreEpO3b-vogd9Ijc2YdlHrdncWczMghiR20UaCvoL"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1200x800/6B4E99/FFFFFF?text=Community+Support+Background" }}
                    />
                    {/* Gradient Overlay (Styled in CSS) */}
                    <div className="gradient-overlay" />
                </div>

                {/* Header with Logo and Dark Mode Toggle */}
                <header className="header">
                    <div className="header-content">
                        <div className="logo-group">
                            {/* Logo Icon (Using inline SVG for simplicity) */}
                            <svg className="logo-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <span className="logo-text">Tech Health</span>
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
                                <h1 
                                    className="hero-title"
                                >
                                    Welcome to JIJUE
                                </h1>
                                <p 
                                    className="hero-subtitle" 
                                    style={{ color: PRIMARY_COLOR }}
                                >
                                    Accurate, stigma-free HIV awareness for every Kenyan. Privacy guaranteed.
                                </p>
                                
                                {/* 🌟 CORRECTED BUTTONS USING <Link> 🌟 */}
                                <div className="hero-buttons">
                                    <Link 
                                        to="/login" // 👈 Set the navigation path
                                        className="btn btn-primary" // 👈 Apply button styling
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                    >
                                        LOGIN
                                    </Link>
                                    <Link 
                                        to="/register" // 👈 Set the navigation path
                                        className="btn btn-secondary" // 👈 Apply button styling
                                    >
                                        SIGNUP
                                    </Link>
                                </div>
                                {/* 🌟 END CORRECTED BUTTONS 🌟 */}

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}