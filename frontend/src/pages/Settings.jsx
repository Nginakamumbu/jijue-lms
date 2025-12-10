import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Shield, Bell, Sun, Moon, Save } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import './Settings.css';

const Settings = () => {
  const [profile, setProfile] = useState({ name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 (555) 123-4567' });
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setTheme('dark');
    }
  }, []);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleThemeChange = (value) => {
    setTheme(value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Profile saved', { profile, notifications, theme });
  };

  return (
    <DashboardLayout>
      <div className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Settings</p>
            <h1 className="page-title">Account Settings</h1>
            <p className="page-subtitle">Manage your profile, notifications, and appearance.</p>
          </div>
          <button className="primary-btn" onClick={handleSave}>
            <Save size={16} /> Save changes
          </button>
        </div>

        <div className="page-grid">
          <div className="main-column">
            <form className="card" onSubmit={handleSave}>
              <div className="card-title-row">
                <User size={18} />
                <h2 className="card-title">Profile</h2>
              </div>

              <label className="form-field">
                <span className="field-label">Full name</span>
                <div className="input-wrap">
                  <User size={16} />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
              </label>

              <label className="form-field">
                <span className="field-label">Email</span>
                <div className="input-wrap">
                  <Mail size={16} />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </label>

              <label className="form-field">
                <span className="field-label">Phone</span>
                <div className="input-wrap">
                  <Phone size={16} />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </label>
            </form>

            <div className="card">
              <div className="card-title-row">
                <Bell size={18} />
                <h2 className="card-title">Notifications</h2>
              </div>
              <ul className="toggle-list">
                <li className="toggle-row">
                  <div>
                    <p className="toggle-title">Email updates</p>
                    <p className="toggle-subtitle">Course reminders and announcements</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
                    <span className="slider" />
                  </label>
                </li>
                <li className="toggle-row">
                  <div>
                    <p className="toggle-title">Push notifications</p>
                    <p className="toggle-subtitle">Progress milestones and new replies</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.push} onChange={() => toggleNotification('push')} />
                    <span className="slider" />
                  </label>
                </li>
                <li className="toggle-row">
                  <div>
                    <p className="toggle-title">SMS alerts</p>
                    <p className="toggle-subtitle">Time-sensitive reminders</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.sms} onChange={() => toggleNotification('sms')} />
                    <span className="slider" />
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div className="side-column">
            <div className="card">
              <div className="card-title-row">
                <Shield size={18} />
                <h3 className="card-title">Security</h3>
              </div>
              <ul className="bullet-list">
                <li>Use a strong password with at least 12 characters.</li>
                <li>Enable two-factor authentication when available.</li>
                <li>Sign out on shared devices after each session.</li>
              </ul>
              <button className="ghost-btn">Update password</button>
            </div>

            <div className="card">
              <div className="card-title-row">
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                <h3 className="card-title">Appearance</h3>
              </div>
              <div className="pill-row">
                <button
                  type="button"
                  className={`pill ${theme === 'light' ? 'pill-active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </button>
                <button
                  type="button"
                  className={`pill ${theme === 'dark' ? 'pill-active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </button>
              </div>
              <p className="body-text">Your preference is saved for this device.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
