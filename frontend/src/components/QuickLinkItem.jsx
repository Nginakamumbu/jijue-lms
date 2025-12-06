import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MessageSquare, MapPin, LayoutDashboard, School, Users, Zap, 
    Settings, HelpCircle, LogOut, HeartPulse, Shield, PlayCircle 
} from 'lucide-react';

// Map icon names (as strings from the Python backend) to Lucide components
const iconMap = {
    'MessageSquare': MessageSquare,
    'MapPin': MapPin,
    'LayoutDashboard': LayoutDashboard,
    'School': School,
    'Users': Users,
    'Zap': Zap,
    'Settings': Settings,
    'HelpCircle': HelpCircle,
    'LogOut': LogOut,
    'HeartPulse': HeartPulse,
    'Shield': Shield,
    'PlayCircle': PlayCircle
};

// Define color themes for cleaner dynamic styling
const colorThemes = {
    primary: {
        iconBg: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/50',
        hoverBorder: 'hover:border-indigo-400'
    },
    secondary: {
        // Default color for non-primary links (pink in this case)
        iconBg: 'text-pink-600 bg-pink-50 dark:text-pink-400 dark:bg-pink-900/50',
        hoverBorder: 'hover:border-pink-400'
    }
};


const QuickLinkItem = ({ link }) => {
    const { title, description, icon, color, link: url } = link;
    const IconComponent = iconMap[icon] || LayoutDashboard;

    // Determine the theme based on the 'color' prop, defaulting to secondary
    const theme = colorThemes[color] || colorThemes.secondary;

    const isExternal = typeof url === 'string' && (url.startsWith('http') || url.startsWith('#'));

    const content = (
        <div className={`flex items-start p-4 rounded-xl border border-gray-200 dark:border-gray-700 
                        shadow-sm transition duration-150 ease-in-out ${theme.hoverBorder} hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-800/50`}>
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg ${theme.iconBg}`}>
                <IconComponent className="w-5 h-5" />
            </div>

            {/* Text Content */}
            <div className="ml-3">
                <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-tight">{title}</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );

    if (isExternal) {
        return <a href={url} className="quick-link-item">{content}</a>;
    }

    return (
        <Link to={url} className="quick-link-item">{content}</Link>
    );
};

export default QuickLinkItem;