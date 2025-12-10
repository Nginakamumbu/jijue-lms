import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Sun, Moon, Quote } from 'lucide-react'; // Changed Info to Quote icon
import './RegisterPage.css'; 

const API_BASE_URL = 'http://localhost:8000'; 
const REGISTER_ENDPOINT = `${API_BASE_URL}/api/v1/auth/register`;

// --- Internal Constants for Styling ---
const PRIMARY_COLOR = "#C8A2C8";

// --- Data: Rotating HIV Quotes/Facts ---
const HIV_FACTS = [
    "“Modern treatment means HIV is no longer a death sentence; it's a manageable condition.”",
    "“Undetectable = Untransmittable (U=U). Knowing this changes everything.”",
    "“PEP can stop HIV after exposure, but time is critical. Act fast.”",
    "“PrEP offers powerful protection against HIV for those at risk. Prevention is key.”",
    "“HIV is not spread by casual contact. Educate, don't stigmatize.”",
    "“With early diagnosis and consistent care, people with HIV can lead long, healthy lives.”",
    "“Knowledge is power. Understanding HIV protects yourself and others.”",
    "“Stigma against HIV is often more damaging than the virus itself.”",
    "“Testing is the first step towards prevention and treatment.”",
    "“Support, not judgment, is what truly helps individuals living with HIV.”"
];

// --- Register Page Component ---
export default function RegisterPage() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentFactIndex, setCurrentFactIndex] = useState(0); 
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Dark Mode, CSS Variable Setup, and Fact Rotation Effect
    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark' ||
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
        document.documentElement.classList.toggle('dark-mode', isDark);
        document.documentElement.style.setProperty('--primary-color', PRIMARY_COLOR);

        // Fact Rotation Logic (Rotates every 8 seconds for quotes)
        const rotationTimer = setTimeout(() => {
            setCurrentFactIndex((prevIndex) => 
                (prevIndex + 1) % HIV_FACTS.length
            );
        }, 8000); // Increased time for quotes

        return () => clearTimeout(rotationTimer);
    }, [currentFactIndex]);


    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark-mode', newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Map form data fields to the backend's expected UserRegistration model (full_name, email, password)
        const userData = {
            full_name: formData.name, // Mapping 'name' from form to 'full_name' for API
            email: formData.email,
            password: formData.password,
            // 'username' is ignored as it's not in the UserRegistration model
        };
        
        console.log("Submitting registration with data:", userData);
        console.log("API Endpoint:", REGISTER_ENDPOINT);
        
        try {
            const response = await fetch(REGISTER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            console.log("Response status:", response.status);
            
            if (!response.ok) {
                // Read the JSON response to get the error detail from FastAPI
                const errorData = await response.json();
                const errorMessage = errorData.detail || 'Registration failed due to an unknown error.';
                console.error("API Error Response:", errorData);
                throw new Error(errorMessage);
            }
            
            // Success
            const successData = await response.json();
            console.log("Registration Successful!", successData);
            alert("Account Registered successfully! Redirecting to login.");
            navigate('/login');

        } catch (err) {
            console.error("Registration Error:", err.message);
            setError(err.message); // Set error message state
        } finally {
            setLoading(false);
        }
    };

    // --- Fact Card Component (Modified for Quotes) ---
    const FactCard = ({ fact }) => (
        <div className="fact-card" style={{ borderColor: PRIMARY_COLOR }}> {/* Border color now around the card */}
            <div className="fact-header">
                <Quote size={24} style={{ color: PRIMARY_COLOR }} /> {/* Larger quote icon */}
                <h3 className="fact-title">Quote on HIV Awareness</h3>
            </div>
            <blockquote className="fact-quote"> {/* Using blockquote for semantic quoting */}
                "{fact}"
            </blockquote>
        </div>
    );

    return (
        <div className="app-root-container">
            <div className="register-layout-container">
                <div className="side-panel">
                    <div className="header-logo-group">
                        <div className="logo-icon-wrapper">
                            <Link to="/"> 
                                <Globe className="logo-icon-light" style={{ color: PRIMARY_COLOR }} />
                            </Link>
                        </div>
                        <span className="logo-text">
                            Tech Health
                        </span>
                    </div>

                    <div className="fact-rotation-area">
                        <FactCard fact={HIV_FACTS[currentFactIndex]} />
                    </div>

                    <div className="side-panel-footer">
                        <p>© 2024 Tech Health Inc. All rights reserved.</p>
                    </div>
                </div>

                <div className="form-panel-wrapper">
                    <button
                        className="dark-mode-toggle"
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <Sun className="icon-lg" /> : <Moon className="icon-lg" />}
                    </button>
                    
                    <div className="form-content-area">
                        <div className="form-header">
                            <h1 className="form-title">Register Your Account</h1>
                            <p className="form-subtitle">Create an account to get started.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="input-form-group">
                            {error && (
                                <div className="error-message" style={{ 
                                    backgroundColor: '#fee2e2', 
                                    color: '#991b1b', 
                                    padding: '0.75rem',
                                    borderRadius: '0.375rem',
                                    marginBottom: '1rem',
                                    border: '1px solid #fecaca'
                                }}>
                                    <strong>Error:</strong> {error}
                                </div>
                            )}
                            {['name', 'username', 'email', 'password'].map((field) => (
                                <div className="input-field" key={field}>
                                    <label className="input-label" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <div className="mt-1">
                                        <input
                                            className="form-input"
                                            id={field}
                                            name={field}
                                            type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                                            required
                                            autoComplete={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            style={{ borderColor: PRIMARY_COLOR }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div>
                                <button 
                                    className="submit-button" 
                                    type="submit"
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                    disabled={loading}
                                >
                                    {loading ? 'REGISTERING...' : 'SIGNUP'}
                                </button>
                            </div>
                        </form>

                        <div className="login-link-wrapper">
                            <p className="login-link-text">
                                Already have an account?
                                <Link to="/login" className="login-link-anchor" style={{ color: PRIMARY_COLOR }}>
                                    LOGIN HERE
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}