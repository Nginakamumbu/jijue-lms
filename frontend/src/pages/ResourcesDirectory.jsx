// src/pages/ResourceDirectory.jsx
import React from "react";
import './ResourcesDirectory.css'; // Import the dedicated CSS file

// Assuming these colors based on the Tailwind classes in the original code
const PRIMARY_COLOR = "#7C3AED"; // Purple/Primary
const SECONDARY_COLOR = "#06B6D4"; // Cyan/Secondary

const ResourceDirectory = () => {
  return (
    // Note: The 'dark' class will be managed by a parent component or manually toggled on the <html> tag
    <div className="resource-directory-container">
      {/* Header */}
      <header className="header-bar">
        <div className="header-content-wrapper">
          <div className="header-flex-group">
            <a className="logo-link" href="#">
              <span className="logo-text-secondary" style={{ color: SECONDARY_COLOR }}>Tech</span>
              <span className="logo-text-primary" style={{ color: PRIMARY_COLOR }}>Health</span>
            </a>
            <nav className="navigation-menu">
              <a className="nav-link" href="#">Dashboard</a>
              <a className="nav-link" href="#">Courses</a>
              <a className="nav-link active" href="#" style={{ color: PRIMARY_COLOR }}>Resources</a>
              <a className="nav-link" href="#">Community</a>
            </nav>
            <div className="user-controls">
              <button className="dark-mode-toggle-icon-button">
                {/* Placeholder for Icon (Material Symbols) */}
                <span className="material-symbols-outlined icon-lg">dark_mode</span>
              </button>
              <img
                className="user-avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfk2rFVv5XShW8YoRysujKcZMjEC2kY-wxxxYI46A7FdNrpNeIlLe9_4gRVaCRzfq3HHr8722BIqeCID2sJOMVWNkSQOhSshtuMlik4urxl4PlPe_jYA3-WE5iispDu0ql8dTsKgaKtDV-6NHwjQUk2hs2aV2V1JhOuG8Ujns15WbhFViAulcwT4_-4Dv4mVENNfPznDv_HnqoG8GpdaHI829XlsRPXG0RHYTtOW1k_N7OjGx9Sk2j8mLY7qy3PMBZbKRQqe5RmWZ6"
                alt="User avatar"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/C8A2C8/FFFFFF?text=User" }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content-area">
        <div className="content-wrapper">
          <div className="hero-section">
            <h1 className="hero-title">
              Resources & Support
            </h1>
            <p className="hero-subtitle">
              Your central hub for finding testing centers, support services, and reliable information.
            </p>
          </div>

          <div className="main-grid-layout">
            {/* Left Content (Main Cards) */}
            <div className="main-cards-column">
              
              {/* HIV Testing Centers */}
              <div className="card">
                <h2 className="card-title">Find an HIV Testing Center</h2>
                <div className="relative">
                  <input
                    className="search-input"
                    placeholder="Enter your city, state, or ZIP code"
                    type="text"
                  />
                  <span className="material-symbols-outlined search-icon">
                    search
                  </span>
                </div>

                <div className="testing-center-list">
                  
                  {/* Center 1 */}
                  <div className="center-item">
                    <div>
                      <h3 className="center-name">Downtown Community Clinic</h3>
                      <p className="center-address">123 Wellness Ave, San Francisco, CA 94102</p>
                      <span className="status-badge status-open">
                        <span className="status-dot status-dot-open"></span>
                        Open Today
                      </span>
                    </div>
                    <a className="directions-link" href="#" style={{ color: PRIMARY_COLOR }}>
                      <span>Get Directions</span>
                      <span className="material-symbols-outlined directions-icon">arrow_forward</span>
                    </a>
                  </div>

                  {/* Center 2 */}
                  <div className="center-item">
                    <div>
                      <h3 className="center-name">Oakside Health Services</h3>
                      <p className="center-address">456 Care St, Oakland, CA 94607</p>
                      <span className="status-badge status-closed">
                        <span className="status-dot status-dot-closed"></span>
                        Closed Today
                      </span>
                    </div>
                    <a className="directions-link" href="#" style={{ color: PRIMARY_COLOR }}>
                      <span>Get Directions</span>
                      <span className="material-symbols-outlined directions-icon">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="card">
                <h2 className="card-title">Frequently Asked Questions</h2>
                <div className="faq-list">
                  
                  {/* FAQ 1 */}
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span className="faq-question">
                        How accurate are rapid HIV tests?
                      </span>
                      <span className="material-symbols-outlined faq-arrow">expand_more</span>
                    </summary>
                    <p className="faq-answer">
                      Rapid antibody tests are highly accurate, but they require a window period (usually 3-12 weeks) after exposure for antibodies to develop. A follow-up test is sometimes needed to confirm a preliminary positive result.
                    </p>
                  </details>

                  {/* FAQ 2 */}
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span className="faq-question">
                        Is PrEP the right choice for me?
                      </span>
                      <span className="material-symbols-outlined faq-arrow">expand_more</span>
                    </summary>
                    <p className="faq-answer">
                      PrEP (Pre-Exposure Prophylaxis) is a highly effective prevention tool for individuals at ongoing high risk for HIV. It's best to consult with a healthcare provider to discuss your specific situation, potential side effects, and required follow-up care.
                    </p>
                  </details>

                  {/* FAQ 3 */}
                  <details className="faq-item no-border">
                    <summary className="faq-summary">
                      <span className="faq-question">
                        What should I do if I think I've been exposed to HIV?
                      </span>
                      <span className="material-symbols-outlined faq-arrow">expand_more</span>
                    </summary>
                    <p className="faq-answer">
                      If you believe you've been exposed to HIV within the last 72 hours, you should seek medical care immediately to ask about PEP (Post-Exposure Prophylaxis). PEP is an emergency medication that can prevent HIV infection if started quickly.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="sidebar-column">
              
              {/* Support Services */}
              <div className="card">
                <h3 className="sidebar-title">Support Services</h3>
                <ul className="support-list">
                  <li className="support-item">
                    <span className="material-symbols-outlined support-icon" style={{ color: SECONDARY_COLOR }}>diversity_3</span>
                    <div>
                      <h4 className="support-heading">Counseling & Mental Health</h4>
                      <p className="support-text">
                        Connect with licensed therapists specializing in HIV-related issues.
                      </p>
                    </div>
                  </li>
                  <li className="support-item">
                    <span className="material-symbols-outlined support-icon" style={{ color: SECONDARY_COLOR }}>phone_in_talk</span>
                    <div>
                      <h4 className="support-heading">24/7 National Helpline</h4>
                      <p className="support-text">
                        Confidential support is just a call away. Dial 1-800-555-HELP.
                      </p>
                    </div>
                  </li>
                  <li className="support-item">
                    <span className="material-symbols-outlined support-icon" style={{ color: SECONDARY_COLOR }}>forum</span>
                    <div>
                      <h4 className="support-heading">Online Support Groups</h4>
                      <p className="support-text">
                        Join our community forums to share and learn from others.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Reputable Organizations */}
              <div className="card">
                <h3 className="sidebar-title">Reputable Organizations</h3>
                <ul className="org-list">
                  <li className="org-item">
                    <a className="org-link" href="#" style={{ color: PRIMARY_COLOR }}>
                      <span className="org-name">Centers for Disease Control (CDC) - HIV</span>
                      <span className="material-symbols-outlined org-arrow">arrow_forward</span>
                    </a>
                  </li>
                  <li className="org-item">
                    <a className="org-link" href="#" style={{ color: PRIMARY_COLOR }}>
                      <span className="org-name">World Health Organization (WHO) - HIV</span>
                      <span className="material-symbols-outlined org-arrow">arrow_forward</span>
                    </a>
                  </li>
                  <li className="org-item">
                    <a className="org-link" href="#" style={{ color: PRIMARY_COLOR }}>
                      <span className="org-name">The Trevor Project</span>
                      <span className="material-symbols-outlined org-arrow">arrow_forward</span>
                    </a>
                  </li>
                  <li className="org-item">
                    <a className="org-link" href="#" style={{ color: PRIMARY_COLOR }}>
                      <span className="flex-1">amfAR, The Foundation for AIDS Research</span>
                      <span className="material-symbols-outlined org-arrow">arrow_forward</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourceDirectory;