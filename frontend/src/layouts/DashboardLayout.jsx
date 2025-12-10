import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Sidebar from '../components/Sidebar';

/**
 * DashboardLayout: A wrapper that includes the persistent sidebar.
 * Use this layout for all authenticated pages (Dashboard, CourseCatalog, etc.)
 */
export default function DashboardLayout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [navigation, setNavigation] = useState([]);

    // Dark Mode & Navigation Initialization
    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark' ||
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }

        // Fetch navigation from backend
        const fetchNavigation = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/dashboard');
                if (response.ok) {
                    const data = await response.json();
                    setNavigation(data.navigation || []);
                }
            } catch (error) {
                console.error('Failed to fetch navigation:', error);
            }
        };

        fetchNavigation();
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
        <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar 
                navigation={navigation}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
            />
            <main className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}
