import React from 'react';
import { Link } from 'react-router-dom';
import { X, HelpCircle, LogOut, Sun, Moon } from 'lucide-react';
import NavItem from './NavItem'; // Assumes NavItem is also in the components directory

/**
 * Sidebar Component: Renders the main left navigation area.
 * @param {object[]} navigation - List of navigation items.
 * @param {boolean} isMobileOpen - State controlling mobile visibility.
 * @param {function} setIsMobileOpen - Function to close the mobile sidebar.
 * @param {function} toggleDarkMode - Function to switch the theme.
 * @param {boolean} isDarkMode - Current theme state.
 */
export default function Sidebar({ navigation, isMobileOpen, setIsMobileOpen, toggleDarkMode, isDarkMode }) {
    
    return (
        <>
            {/* Backdrop for mobile (covers main content when sidebar is open) */}
            {isMobileOpen && (
                <div className="sidebar-backdrop" onClick={() => setIsMobileOpen(false)}></div>
            )}
            
            <aside 
                className={`sidebar ${isMobileOpen ? 'sidebar-open' : 'sidebar-closed'}`}
            >
                <div className="mobile-sidebar-close">
                    <button className="sidebar-close-btn icon-btn" onClick={() => setIsMobileOpen(false)}>
                        <X className="icon-lg" />
                    </button>
                    {/* Mobile Dark Mode Toggle */}
                    <button 
                        className="icon-btn dark-mode-toggle-mobile"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? <Sun className="icon-lg" /> : <Moon className="icon-lg" />}
                    </button>
                </div>
                
                <div className="sidebar-top">
                    <Link className="logo-sidebar" to="/">
                        <span className="logo-part-1">Jijue</span>
                        <span className="logo-part-2">Platform</span>
                    </Link>
                    <nav className="nav-list">
                        {navigation.map(item => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </nav>
                </div>
                <div className="sidebar-bottom">
                    <Link className="sidebar-utility-link" to="/help">
                        <HelpCircle className="icon-sm" /> Help & Support
                    </Link>
                    <Link className="sidebar-logout-link" to="/logout">
                        <LogOut className="icon-sm" /> Logout
                    </Link>
                </div>
            </aside>
        </>
    );
}