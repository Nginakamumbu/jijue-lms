import React, { useState, useEffect } from 'react';
import {
    Menu, X, Sun, Moon, LayoutDashboard, School, Users, Zap, Settings, HelpCircle, LogOut,
    PlayCircle, Shield, HeartPulse, Bell, MessageSquare, MapPin
} from 'lucide-react';
import './Dashboard.css'; // Import the dedicated CSS file

// --- Data Structure ---
const dashboardData = {
    userName: "Alex",
    progress: 75, // Percentage
    modulesCompleted: 3,
    totalModules: 4,
    continueLearning: {
        moduleTitle: "Module 2: Understanding Transmission",
        description: "Learn about the ways HIV is transmitted and how it is not. Debunk common myths.",
        link: "#",
    },
    featuredCourses: [
        {
            title: "Living Well with HIV",
            description: "Nutrition, mental health, and treatment adherence.",
            icon: HeartPulse,
            color: 'secondary',
            link: "#",
        },
        {
            title: "Prevention & PrEP",
            description: "Understand the tools available for prevention.",
            icon: Shield,
            color: 'primary',
            link: "#",
        }
    ],
    quickLinks: [
        {
            title: "Community Forum",
            description: "Ask questions and share experiences.",
            icon: MessageSquare,
            color: 'primary',
            link: "#",
        },
        {
            title: "Find a Clinic",
            description: "Locate testing and support centers.",
            icon: MapPin,
            color: 'secondary',
            link: "#",
        },
    ],
    navigation: [
        { name: "Dashboard", icon: LayoutDashboard, current: true, link: "#" },
        { name: "My Courses", icon: School, current: false, link: "#" },
        { name: "Community", icon: Users, current: false, link: "#" },
        { name: "Resources", icon: Zap, current: false, link: "#" },
        { name: "Settings", icon: Settings, current: false, link: "#" },
    ]
};

// --- Helper Components ---

const NavItem = ({ item }) => {
    const Icon = item.icon;
    const activeClasses = item.current ? "nav-link-active" : "nav-link-inactive";

    return (
        <a className={`nav-link ${activeClasses}`} href={item.link}>
            <Icon className="icon-sm" /> {item.name}
        </a>
    );
};

const Sidebar = ({ navigation, isMobileOpen, setIsMobileOpen }) => (
    <>
        {/* Backdrop for mobile */}
        {isMobileOpen && (
            <div className="sidebar-backdrop" onClick={() => setIsMobileOpen(false)}></div>
        )}
        
        <aside 
            className={`sidebar ${isMobileOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        >
            <div className="mobile-sidebar-close">
                <button className="sidebar-close-btn" onClick={() => setIsMobileOpen(false)}>
                    <X className="icon-lg" />
                </button>
            </div>
            
            <div className="sidebar-top">
                <a className="logo-sidebar" href="#">
                    <span className="logo-part-1">Jijue</span>
                    <span className="logo-part-2">Platform</span>
                </a>
                <nav className="nav-list">
                    {navigation.map(item => (
                        <NavItem key={item.name} item={item} />
                    ))}
                </nav>
            </div>
            <div className="sidebar-bottom">
                <a className="sidebar-utility-link" href="#">
                    <HelpCircle className="icon-sm" /> Help & Support
                </a>
                <a className="sidebar-logout-link" href="#">
                    <LogOut className="icon-sm" /> Logout
                </a>
            </div>
        </aside>
    </>
);

const ProgressRing = ({ percentage }) => {
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${percentage}, 100`;

    // The strokeDashoffset is calculated in the CSS for the transition effect (using the style attribute on the SVG path for the percentage is cleaner)
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
};

// --- Main App Component ---

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Dark Mode Logic
    useEffect(() => {
        // Initial check for system preference or stored theme
        const storedTheme = localStorage.getItem('theme');
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let initialDark = false;
        if (storedTheme === 'dark') {
            initialDark = true;
        } else if (storedTheme === 'light') {
            initialDark = false;
        } else if (systemPreference) {
            initialDark = true;
        }
        
        setIsDarkMode(initialDark);
        if (initialDark) {
            document.documentElement.classList.add('dark-mode');
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

    return (
        <div className="dashboard-layout">
            
            {/* Sidebar */}
            <Sidebar 
                navigation={dashboardData.navigation} 
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen} 
            />

            <main className="main-content">
                <div className="main-content-container">
                    
                    {/* Top Header Bar */}
                    <header className="header-bar">
                        {/* Mobile Menu Button & Welcome */}
                        <div className="welcome-section">
                            <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(true)}>
                                <Menu className="icon-lg" />
                            </button>
                            <div>
                                <h1 className="welcome-title">Welcome Back, {dashboardData.userName}!</h1>
                                <p className="welcome-message">You are making great progress. Keep it up!</p>
                            </div>
                        </div>

                        {/* Actions and Profile */}
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
                                        <h2 className="continue-card-title">{dashboardData.continueLearning.moduleTitle}</h2>
                                        <p className="continue-card-description">{dashboardData.continueLearning.description}</p>
                                    </div>
                                    <a className="continue-button" href={dashboardData.continueLearning.link}>
                                        Start Lesson
                                    </a>
                                </div>
                            </div>

                            {/* Featured Courses */}
                            <div className="featured-courses-section">
                                <h3 className="section-title">Featured Courses</h3>
                                <div className="featured-courses-grid">
                                    {dashboardData.featuredCourses.map((course, index) => {
                                        const Icon = course.icon;
                                        const colorClass = course.color === 'secondary' ? 'course-secondary' : 'course-primary';

                                        return (
                                            <div key={index} className={`course-card ${colorClass}`}>
                                                <div className={`course-icon-wrapper`}>
                                                    <Icon className="icon-lg" />
                                                </div>
                                                <h4 className="course-title">{course.title}</h4>
                                                <p className="course-description">{course.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Sidebar Widgets) */}
                        <div className="sidebar-column">
                            
                            {/* Overall Progress Card */}
                            <div className="card progress-card">
                                <h3 className="card-title">Overall Progress</h3>
                                <ProgressRing percentage={dashboardData.progress} />
                                <p className="progress-summary">
                                    You have completed <span className="progress-highlight">{dashboardData.modulesCompleted}</span> out of <span className="progress-highlight-total">{dashboardData.totalModules}</span> core modules.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div className="card quick-links-card">
                                <h3 className="card-title">Quick Links</h3>
                                <div className="quick-links-list">
                                    {dashboardData.quickLinks.map((link, index) => {
                                        const Icon = link.icon;
                                        const colorClass = link.color === 'secondary' ? 'link-secondary' : 'link-primary';

                                        return (
                                            <a key={index} className="quick-link-item" href={link.link}>
                                                <div className={`quick-link-icon-wrapper ${colorClass}`}>
                                                    <Icon className="icon-sm" />
                                                </div>
                                                <div className="quick-link-text">
                                                    <p className="quick-link-title">{link.title}</p>
                                                    <p className="quick-link-description">{link.description}</p>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}