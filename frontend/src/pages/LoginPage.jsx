import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 👈 IMPORTED LINK for navigation
import { Sun, Moon } from 'lucide-react';
import './LoginPage.css'; // Import the dedicated CSS file

// --- Internal Constants for Styling (Passed to CSS via variables) ---
const PRIMARY_COLOR = "#C8A2C8"; // Your defined primary color
const LIGHT_TITLE_COLOR = "#111827"; 

// --- App Component ---
export default function LoginPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

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

        // Set CSS variables for colors (good practice for unified styling)
        document.documentElement.style.setProperty('--primary-color', PRIMARY_COLOR);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Attempted with Data:", formData);
        // Add actual login logic here (e.g., API call)

        // Use a custom message box instead of alert()
        alert("Login Attempted (Simulated). Check console for data.");
    };

    return (
        <div className="login-root-container">
            <div 
                className="login-page-wrapper"
            >
                {/* Dark Mode Toggle */}
                <button
                    className="dark-mode-toggle"
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? <Sun className="icon-lg" /> : <Moon className="icon-lg" />}
                </button>

                <div className="login-content-container">
                    <div className="login-grid-layout">
                        
                        {/* Left Panel: Marketing Content */}
                        <div className="marketing-panel">
                            <header className="marketing-header">
                                {/* Use Link or simple a for home navigation */}
                                <Link className="logo-group" to="/"> 
                                    <span className="logo-part-blue">Tech</span>
                                    <span style={{ color: PRIMARY_COLOR }}>Health</span>
                                </Link>
                            </header>
                            <main className="marketing-main">
                                <h1 
                                    className="marketing-title"
                                    style={{ color: isDarkMode ? 'var(--color-text-dark)' : LIGHT_TITLE_COLOR }}
                                >
                                    Jijue: Know Better. Live Freely.
                                </h1> {/* 👈 ERROR FIXED: Added closing </h1> tag */}
                                <p className="marketing-subtitle" style={{ color: PRIMARY_COLOR }}>
                                    Accurate, stigma-free HIV awareness for every Kenyan. Privacy guaranteed.
                                </p> {/* 👈 ERROR FIXED: Now properly closed <p> tag */}
                            </main>
                        </div>
                        
                        {/* Rest of the component remains the same */}
                        <div 
                            className="login-form-card"
                            style={{ 
                                backgroundColor: isDarkMode ? 'var(--color-surface-dark)' : 'var(--color-surface-light)'
                            }}
                        >
                            <h2 
                                className="form-title"
                                style={{ color: isDarkMode ? 'var(--color-text-dark)' : LIGHT_TITLE_COLOR }}
                            >
                                Login To Your Account
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-fields-group">
                                    
                                    {/* Username Input */}
                                    <div className="form-field">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <input
                                            className="form-input"
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="your_username"
                                            autoComplete="username"
                                            required
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            style={{ 
                                                '--focus-ring-color': PRIMARY_COLOR,
                                                borderColor: PRIMARY_COLOR, 
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Password Input */}
                                    <div className="form-field">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input
                                            className="form-input"
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            style={{ 
                                                '--focus-ring-color': PRIMARY_COLOR,
                                                borderColor: PRIMARY_COLOR,
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Submit Button */}
                                <div className="submit-button-wrapper">
                                    <button 
                                        className="submit-button" 
                                        type="submit"
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                    >
                                        LOGIN
                                    </button>
                                </div>
                                
                                {/* 🌟 CORRECTED SIGNUP LINK 🌟 */}
                                <p className="signup-link-text">
                                    Don't have an account? 
                                    <Link // 👈 REPLACED <a> with <Link>
                                        to="/register" // 👈 Set the navigation path to the signup page
                                        className="signup-link" 
                                        style={{ 
                                            color: isDarkMode ? 'var(--primary-color)' : PRIMARY_COLOR, // Using primary color for consistency
                                        }}
                                    >
                                        SIGNUP HERE
                                    </Link>
                                </p>
                                {/* 🌟 END CORRECTED SIGNUP LINK 🌟 */}
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}