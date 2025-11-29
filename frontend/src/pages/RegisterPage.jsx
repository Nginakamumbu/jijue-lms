import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Sun, Moon, Quote } from 'lucide-react'; // Changed Info to Quote icon
import './RegisterPage.css'; 

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration Attempted with Data:", formData);
        alert("Account Registered successfully! Redirecting to login.");
        navigate('/login');
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
                                >
                                    SIGNUP
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