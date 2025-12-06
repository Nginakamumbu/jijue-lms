import React from 'react';
import { NavLink } from 'react-router-dom';
import { getIconComponent } from '../pages/Dashboard'; // Import icon helper from main file

/**
 * NavItem Component: Renders a single navigation link in the sidebar.
 * Uses `NavLink` for internal routes so active state is provided by react-router.
 * Falls back to a normal anchor for hash or external links.
 * @param {object} item - Navigation item data (name, icon, current, link).
 */
export default function NavItem({ item }) {
    const Icon = getIconComponent(item.icon);
    const link = item.link || '/';
    const isExternal = typeof link === 'string' && (link.startsWith('http') || link.startsWith('#'));

    if (isExternal) {
        const activeClasses = item.current ? 'nav-link-active' : 'nav-link-inactive';
        return (
            <a className={`nav-link ${activeClasses}`} href={link}>
                <Icon className="icon-sm" /> {item.name}
            </a>
        );
    }

    return (
        <NavLink
            to={link}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
        >
            <Icon className="icon-sm" /> {item.name}
        </NavLink>
    );
}