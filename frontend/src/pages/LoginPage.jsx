import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 👈 ADDED useNavigate
import { Sun, Moon, Loader } from 'lucide-react'; // 👈 ADDED Loader
import './LoginPage.css'; // Import the dedicated CSS file
const API_BASE_URL = 'http://127.0.0.1:8000';
// NOTE: Login endpoint in main.py is /api/v1/auth/login.
// We must ensure the constant reflects the correct path if it differs from /auth/login
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/v1/auth/login`; 


// --- Internal Constants for Styling (Passed to CSS via variables) ---
const PRIMARY_COLOR = "#C8A2C8"; // Your defined primary color
const LIGHT_TITLE_COLOR = "#111827"; 

// --- Status Box Component (Replaces alert()) ---
const StatusBox = ({ message, type }) => {
    if (!message) return null;

    const baseStyle = {
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: '600'
    };

    const styles = type === 'success'
        ? { ...baseStyle, backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }
        : { ...baseStyle, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };

    return <div style={styles}>{message}</div>;
};

// --- App Component ---
export default function LoginPage() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // ADDED: Loading state
    const [status, setStatus] = useState({ message: '', type: '' }); // ADDED: Status message state

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
        setStatus({ message: '', type: '' }); // Clear status on input change
    };

    const handleSubmit = async (e) => { // CHANGED to async
        e.preventDefault();
        setStatus({ message: '', type: '' });
        setIsLoading(true);

        try {
            // CRITICAL FIX: Encode data for application/x-www-form-urlencoded
            const params = new URLSearchParams({
                username: formData.username,
                password: formData.password,
            }).toString();

            const response = await fetch(LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    // CRITICAL: Must be form-urlencoded for FastAPI OAuth2PasswordRequestForm
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params // Send the URL encoded string
            });

            if (response.ok) {
                const result = await response.json(); 
                
                // Store the access token for future API calls
                localStorage.setItem('accessToken', result.access_token);
                
                setStatus({ message: "Login successful! Redirecting...", type: 'success' });
                
                // Redirect to the dashboard/home page after a short delay
                setTimeout(() => navigate('/dashboard'), 1500); 

            } else {
                const errorData = await response.json();
                const errorMessage = errorData.detail || "Invalid username or password.";
                
                setStatus({ message: `Login failed: ${errorMessage}`, type: 'error' });
            }
        } catch (error) {
            // Handle network errors (e.g., backend is down, CORS issue)
            setStatus({ 
                message: "Network Error: Could not connect to the backend API. Please ensure the server is running and CORS is configured.", 
                type: 'error' 
            });
            console.error('Network Error during login:', error);
        } finally {
            setIsLoading(false);
        }
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
                                </h1> 
                                <p className="marketing-subtitle" style={{ color: PRIMARY_COLOR }}>
                                    Accurate, stigma-free HIV awareness for every Kenyan. Privacy guaranteed.
                                </p> 
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
                            
                            {/* Status Message Box */}
                            <StatusBox message={status.message} type={status.type} />


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
                                            disabled={isLoading}
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
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                
                                {/* Submit Button */}
                                <div className="submit-button-wrapper">
                                    <button 
                                        className="submit-button" 
                                        type="submit"
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loader size={20} className="animate-spin mr-2" />
                                        ) : (
                                            'LOGIN'
                                        )}
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