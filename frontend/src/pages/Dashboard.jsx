import React, { useState, useEffect, useMemo } from 'react';
import {
    Menu, X, Sun, Moon, LayoutDashboard, School, Users, Zap, Settings, HelpCircle, LogOut,
    PlayCircle, Shield, HeartPulse, Bell, MessageSquare, MapPin,
    // Import all required Lucide icons
} from 'lucide-react';
import './Dashboard.css'; // <--- CORRECTED IMPORT PATH
import FeatureCard from '../components/FeatureCard';
import QuickLinkItem from '../components/QuickLinkItem';
import Sidebar from '../components/Sidebar';
import ProgressRing from '../components/ProgressRing';


// --- CONFIGURATION ---
// IMPORTANT: Set the URL for your FastAPI backend
const API_BASE_URL = 'http://localhost:8000'; // Change if your backend runs on a different port

// --- DEFAULT STATE (for initial render before data loads) ---
const INITIAL_DASHBOARD_DATA = {
    userName: "Loading...",
    progress: 0,
    modulesCompleted: 0,
    totalModules: 4,
    continueLearning: { moduleTitle: "Loading Module...", description: "", link: "#" },
    featuredCourses: [
        { title: 'Introduction to HIV', description: 'Understand the fundamentals of HIV and transmission.', icon: '📚', color: '#A569BD', link: '/course/1' },
        { title: 'Prevention Strategies', description: 'Learn about prevention: PrEP, PEP, and safe practices.', icon: '🛡️', color: '#58D68D', link: '/course/2' }
    ],
    quickLinks: [
        { title: 'Community Forum', description: 'Ask questions and share experiences.', icon: 'MessageSquare', color: 'primary', link: '/forum' },
        { title: 'Media Library', description: 'Browse videos and resources.', icon: 'PlayCircle', color: 'secondary', link: '/media' }
    ],
    navigation: [
        { name: "Dashboard", icon: "LayoutDashboard", current: true, link: "/dashboard" },
        { name: "Course Catalog", icon: "School", current: false, link: "/courses" },
        { name: "My Courses", icon: "PlayCircle", current: false, link: "/my-courses" },
        { name: "Community", icon: "Users", current: false, link: "/forum" },
        { name: "Resources", icon: "Zap", current: false, link: "/resources" },
        { name: "Settings", icon: "Settings", current: false, link: "/settings" },
    ]
};

// --- Helper Functions (used by this component and its children) ---
const iconMap = {
    'LayoutDashboard': LayoutDashboard, 'School': School, 'Users': Users, 'Zap': Zap,
    'Settings': Settings, 'HelpCircle': HelpCircle, 'LogOut': LogOut, 'PlayCircle': PlayCircle,
    'Shield': Shield, 'HeartPulse': HeartPulse, 'Bell': Bell, 'MessageSquare': MessageSquare,
    'MapPin': MapPin
};

export const getIconComponent = (iconName) => iconMap[iconName] || LayoutDashboard;


// --- Main App Component ---

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [data, setData] = useState(INITIAL_DASHBOARD_DATA);
    const [isLoading, setIsLoading] = useState(true);

    // --- 1. Data Fetching Effect ---
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Ensure the port here matches your FastAPI backend port (e.g., 8000)
                const response = await fetch(`${API_BASE_URL}/api/dashboard`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error) {
                console.error("Could not fetch dashboard data:", error);
                // Fallback to initial data if fetch fails
                setData(INITIAL_DASHBOARD_DATA); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // --- 2. Dark Mode Logic ---
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let initialDark = false;
        if (storedTheme === 'dark') {
            initialDark = true;
        } else if (storedTheme === 'light') {
            initialDark = false;
        } else if (systemPreference) {
            // initialDark = true; 
        }
        
        setIsDarkMode(initialDark);
        if (initialDark) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
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
    
    // --- Render Logic ---
    if (isLoading) {
        // Simple loading state implementation
        return <div className="loading-screen">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-layout">
            
            <Sidebar 
                navigation={data.navigation} 
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen}
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
            />

            <main className="main-content">
                <div className="main-content-container">
                    
                    {/* Header Bar */}
                    <header className="header-bar">
                        <div className="welcome-section">
                            <button className="mobile-menu-btn icon-btn" onClick={() => setIsMobileOpen(true)}>
                                <Menu className="icon-lg" />
                            </button>
                            <div>
                                <h1 className="welcome-title">Welcome Back, {data.userName}!</h1> 
                                <p className="welcome-message">You are making great progress. Keep it up!</p>
                            </div>
                        </div>

                        <div className="user-actions">
                            <button className="icon-btn">
                                <Bell className="icon-lg" />
                            </button>
                            <button 
                                className="icon-btn dark-mode-toggle-desktop"
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? <Sun className="icon-lg" /> : <Moon className="icon-lg" />}
                            </button>
                            <img 
                                alt="User avatar" 
                                className="user-avatar" 
                                src="https://placehold.co/48x48/A569BD/FFFFFF?text=A.X."
                            />
                        </div>
                    </header>
                    
                    <div className="dashboard-grid">
                        
                        {/* Left Column (Main Content) */}
                        <div className="main-column">
                            
                            {/* Continue Learning Card */}
                            <div className="continue-card">
                                <div className="continue-card-content">
                                    <div className="continue-card-icon-wrapper">
                                        <PlayCircle className="continue-card-icon" />
                                    </div>
                                    <div className="continue-card-text">
                                        <p className="continue-card-tag">Continue Learning</p>
                                        <h2 className="continue-card-title">{data.continueLearning.moduleTitle}</h2>
                                        <p className="continue-card-description">{data.continueLearning.description}</p>
                                        <a className="continue-button" href={data.continueLearning.link}>
                                            Start
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Courses */}
                            <div className="featured-courses-section">
                                <h3 className="section-title">Featured Courses</h3>
                                <div className="featured-courses-grid">
                                    {/* Use the modular FeatureCard component */}
                                    {data.featuredCourses.map((course, index) => (
                                        <FeatureCard key={index} course={course} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Sidebar Widgets) */}
                        <div className="sidebar-column">
                            
                            {/* Overall Progress Card */}
                            <div className="card progress-card">
                                <h3 className="card-title">Overall Progress</h3>
                                <ProgressRing percentage={data.progress} /> 
                                <p className="progress-summary">
                                    You have completed <span className="progress-highlight">{data.modulesCompleted}</span> out of <span className="progress-highlight-total">{data.totalModules}</span> core modules.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div className="card quick-links-card">
                                <h3 className="card-title">Quick Links</h3>
                                <div className="quick-links-list">
                                    {/* Use the modular QuickLinkItem component */}
                                    {data.quickLinks.map((link, index) => (
                                        <QuickLinkItem key={index} link={link} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}