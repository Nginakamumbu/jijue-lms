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
    userName: "Student",
    progress: 0,
    modulesCompleted: 0,
    totalModules: 4,
    continueLearning: { 
        moduleTitle: "Module 1: HIV Basics", 
        description: "Learn the fundamentals of HIV and how it affects the immune system.", 
        link: "/course/1" 
    },
    featuredCourses: [
        { 
            title: 'Introduction to HIV', 
            description: 'Understand the fundamentals of HIV and transmission.', 
            icon: 'HeartPulse', 
            color: 'primary', 
            link: '/course/1' 
        },
        { 
            title: 'Prevention Strategies', 
            description: 'Learn about prevention: PrEP, PEP, and safe practices.', 
            icon: 'Shield', 
            color: 'secondary', 
            link: '/course/2' 
        }
    ],
    quickLinks: [
        { 
            title: 'Community Forum', 
            description: 'Ask questions and share experiences with others.', 
            icon: 'MessageSquare', 
            color: 'primary', 
            link: '/forum' 
        },
        { 
            title: 'Resources', 
            description: 'Access helpful materials and educational content.', 
            icon: 'Zap', 
            color: 'secondary', 
            link: '/resources' 
        },
        { 
            title: 'My Courses', 
            description: 'View all courses you are currently enrolled in.', 
            icon: 'PlayCircle', 
            color: 'primary', 
            link: '/my-courses' 
        },
        { 
            title: 'Settings', 
            description: 'Manage your account preferences and profile.', 
            icon: 'Settings', 
            color: 'secondary', 
            link: '/settings' 
        }
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

const getInitials = (name = '') => {
    const trimmed = name.trim();
    if (!trimmed) return 'U';
    const parts = trimmed.split(/\s+/);
    const first = parts[0]?.[0] || '';
    const second = parts[1]?.[0] || '';
    const initials = `${first}${second}`.toUpperCase();
    return initials || trimmed.slice(0, 2).toUpperCase();
};

export const getIconComponent = (iconName) => iconMap[iconName] || LayoutDashboard;


// --- Main App Component ---

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [data, setData] = useState(INITIAL_DASHBOARD_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [userProgress, setUserProgress] = useState(null);
    const userInitials = useMemo(() => getInitials(data.userName), [data.userName]);

    // --- 1. Data Fetching Effect ---
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                
                // Fetch user data if logged in
                if (token) {
                    const userRes = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (userRes.ok) {
                        const userData = await userRes.json();
                        setData(prevData => ({
                            ...prevData,
                            userName: userData.full_name
                        }));
                    }
                    
                    // Fetch user's continue learning data
                    const continueRes = await fetch(`${API_BASE_URL}/api/v1/users/me/continue-learning`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (continueRes.ok) {
                        const continueData = await continueRes.json();
                        setUserProgress(continueData);
                        
                        // Update the continue learning card with actual data
                        setData(prevData => ({
                            ...prevData,
                            continueLearning: {
                                moduleTitle: continueData.module_title || "Start your first course",
                                description: continueData.course_title || "No courses yet",
                                link: continueData.link || "/course/1",
                                courseId: continueData.course_id,
                                isStarted: continueData.status === 'in_progress'
                            }
                        }));
                    }
                }
                
                // Fetch courses for featured courses section
                const coursesRes = await fetch(`${API_BASE_URL}/api/courses`);
                let featuredCourses = INITIAL_DASHBOARD_DATA.featuredCourses;
                if (coursesRes.ok) {
                    const courses = await coursesRes.json();
                    // Use first 2 courses as featured
                    featuredCourses = courses.slice(0, 2).map(course => ({
                        title: course.title,
                        description: course.description,
                        icon: course.icon,
                        color: course.color,
                        link: `/course/${course.id}`
                    }));
                }
                
                // Fetch quick links - combine forum and resources
                const forumRes = await fetch(`${API_BASE_URL}/api/forum/categories`);
                const resourcesRes = await fetch(`${API_BASE_URL}/api/resources/categories`);
                
                let quickLinks = INITIAL_DASHBOARD_DATA.quickLinks;
                
                if (forumRes.ok && resourcesRes.ok) {
                    const forumCategories = await forumRes.json();
                    const resourceCategories = await resourcesRes.json();
                    
                    quickLinks = [
                        {
                            title: 'Community Forum',
                            description: `${forumCategories.length || 5} discussion categories`,
                            icon: 'MessageSquare',
                            color: 'primary',
                            link: '/forum'
                        },
                        {
                            title: 'Resources',
                            description: `${resourceCategories.length || 4} resource categories`,
                            icon: 'Zap',
                            color: 'secondary',
                            link: '/resources'
                        },
                        {
                            title: 'My Courses',
                            description: 'View your enrolled courses',
                            icon: 'PlayCircle',
                            color: 'primary',
                            link: '/my-courses'
                        },
                        {
                            title: 'Settings',
                            description: 'Manage your preferences',
                            icon: 'Settings',
                            color: 'secondary',
                            link: '/settings'
                        }
                    ];
                }
                
                // Fetch first course for continue learning
                const firstCourseRes = await fetch(`${API_BASE_URL}/api/courses/1`);
                let continueLearning = INITIAL_DASHBOARD_DATA.continueLearning;
                if (firstCourseRes.ok) {
                    const courseData = await firstCourseRes.json();
                    if (courseData.modules && courseData.modules.length > 0) {
                        const firstModule = courseData.modules[0];
                        continueLearning = {
                            moduleTitle: firstModule.title,
                            description: firstModule.description,
                            link: `/course/1`
                        };
                    }
                }
                
                setData(prevData => {
                    const existingContinue = prevData.continueLearning;
                    const useExistingContinue = existingContinue && existingContinue.link && existingContinue.link !== '/courses';

                    return {
                        ...prevData,
                        featuredCourses,
                        quickLinks,
                        continueLearning: useExistingContinue ? existingContinue : continueLearning
                    };
                });
                
            } catch (error) {
                console.error("Could not fetch dashboard data:", error);
                // Keep the initial data if fetch fails
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
                        <div>
                            <h1 className="welcome-title">Welcome Back, {data.userName}!</h1> 
                            <p className="welcome-message">You are making great progress. Keep it up!</p>
                        </div>

                        <div className="user-actions">
                            <button className="icon-btn" aria-label="Open notifications">
                                <Bell className="icon-lg" />
                            </button>
                            <button 
                                className="icon-btn dark-mode-toggle-desktop"
                                onClick={toggleDarkMode}
                                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDarkMode ? <Sun className="icon-lg" /> : <Moon className="icon-lg" />}
                            </button>
                            <div 
                                className="user-avatar user-avatar-initials" 
                                aria-label={`User avatar for ${data.userName}`}
                                title={data.userName}
                            >
                                {userInitials}
                            </div>
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
                                            {data.continueLearning.isStarted ? 'Continue' : 'Start'}
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