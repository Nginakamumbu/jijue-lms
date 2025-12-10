import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * LogoutPage Component: Clears authentication data and redirects to login.
 */
export default function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear authentication tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        
        // Redirect to login after a short delay
        const timer = setTimeout(() => {
            navigate('/login');
        }, 500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h1>Logging out...</h1>
                <p>You are being redirected to the login page.</p>
            </div>
        </div>
    );
}
