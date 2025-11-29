import React from 'react';
import './CommunityForum.css'; // Import the new CSS file

// ==================== Main Page ====================
export default function CommunityForum() {
  const discussions = [
    {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAahoH6owtwhGVWUlxgNXoqfXMG49Lx84y4yCFtYmhlnYUsod7eIgV-SbcxO4NmkKKc2HbxcM2xoI4IvqAsW8k37qBZaGrF2vjTF9W1NAOdzXiVB6fk2GyP2QRNHhp0otBbeBsFS28H2B2RyTyXdKW2IQplu1SK_58NkgVfCSIvH7IzpxK5KLeUHI9xwlJs9JAXjMCE5xsTQfEMt0zoXTzrOA2SLlURlehpr0XIfSnGES9qpTxdtqfVkAnZFkC8He7kmW0QO6ghM50x',
      title: 'Nervous about my first appointment. What should I expect?',
      author: 'J. Doe',
      category: 'General Support',
      time: '2h ago',
      replies: 12,
      views: 45,
    },
    {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfk2rFVv5XShW8YoRysujKcZMjEC2kY-wxxxYI46A7FdNrpNeIlLe9_4gRVaCRzfq3HHr8722BIqeCID2sJOMVWNkSQOhSshtuMlik4urxl4PlPe_jYA3-WE5iispDu0ql8dTsKgaKtDV-6NHwjQUk2hs2aV2V1JhOuG8Ujns15WbhFViAulcwT4_-4Dv4mVENNfPznDv_HnqoG8GpdaHI829XlsRPXG0RHYTtOW1k_N7OjGx9Sk2j8mLY7qy3PMBZbKRQqe5RmWZ6',
      title: 'Sharing my story: Living with HIV for 10+ years',
      author: 'A. Smith',
      category: 'Personal Stories',
      time: '1d ago',
      replies: 34,
      views: 210,
    },
    {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw0pJumWWTqMb0x0gflhHpbHXqz5eYpkQw6gHq1NMRKR-if7xzpiQEid3MJTzQPHVSzmaqmcsAElIIiOfjR7X-OynZI132mlVH0hkHfeT6cHBfIX40ojCJTB0ONcVaEmd9g2x4jVAfVJElGksu8l7E3wS33iMrUnW9a9E180O_6bJXeHDQ2McnuH-euHz0CDfvqgDNlxB8rG0it_ph_E1xD0WPHJ4ylKr09qyZhjmoI8_1qlQD_1NMQcNaIptUBGjBgZnfwFzt10Bw',
      title: 'Tips for remembering to take medication every day?',
      author: 'C. Rodriguez',
      category: 'Treatment & Adherence',
      time: '3d ago',
      replies: 25,
      views: 150,
    },
  ];

  const categories = [
    { name: 'General Support', count: 128 },
    { name: 'Prevention (PrEP, PEP, Condoms)', count: 92 },
    { name: 'Treatment & Adherence', count: 76 },
    { name: 'Personal Stories', count: 45 },
    { name: 'Mental Health & Wellbeing', count: 61 },
  ];

  return (
    <div className="forum-page-wrapper">
      <Header />
      <main className="forum-main-content">
        <div className="forum-container">
          <div className="forum-header-section">
            <div className="forum-title-group">
              <h1 className="forum-title">Community Forum</h1>
              <p className="forum-subtitle">
                A safe space to ask questions, share experiences, and connect with peers.
              </p>
            </div>
            <button className="new-discussion-button">
              <span className="material-symbols-outlined new-discussion-icon">
                add_comment
              </span>
              Start a New Discussion
            </button>
          </div>

          <div className="forum-layout">
            <div className="forum-content-col">
              <DiscussionList discussions={discussions} />
            </div>

            <div className="forum-sidebar-col">
              <Categories categories={categories} />
              <SafeSpacePolicy />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ==================== Header ====================
const Header = () => (
  <header className="forum-header">
    <div className="forum-container header-content">
      <a className="forum-logo" href="#">
        <span className="logo-part-1">Tech</span>
        <span className="logo-part-2">Health</span>
      </a>
      <nav className="header-nav">
        <a className="nav-link" href="#">
          Dashboard
        </a>
        <a className="nav-link" href="#">
          Courses
        </a>
        <a className="nav-link nav-link-active" href="#">
          Community
        </a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle-button">
          <span className="material-symbols-outlined theme-toggle-icon">
            dark_mode
          </span>
        </button>
        <img
          alt="User avatar"
          className="user-avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfk2rFVv5XShW8YoRysujKcZMjEC2kY-wxxxYI46A7FdNrpNeIlLe9_4gRVaCRzfq3HHr8722BIqeCID2sJOMVWNkSQOhSshtuMlik4urxl4PlPe_jYA3-WE5iispDu0ql8dTsKgaKtDV-6NHwjQUk2hs2aV2V1JhOuG8Ujns15WbhFViAulcwT4_-4Dv4mVENNfPznDv_HnqoG8GpdaHI829XlsRPXG0RHYTtOW1k_N7OjGx9Sk2j8mLY7qy3PMBZbKRQqe5RmWZ6"
        />
      </div>
    </div>
  </header>
);

// ==================== Discussions List ====================
const DiscussionList = ({ discussions }) => (
  <div className="discussion-list-card">
    <div className="discussion-list-header">
      <h2 className="discussion-list-title">Recent Discussions</h2>
      <a className="discussion-list-view-all" href="#">
        View All
      </a>
    </div>
    <ul className="discussion-items-list">
      {discussions.map((d, idx) => (
        <li key={idx} className="discussion-item">
          <div className="discussion-item-content">
            <img
              alt="User avatar"
              className="discussion-avatar"
              src={d.avatar}
            />
            <div className="discussion-details">
              <div className="discussion-meta-top">
                <div className="discussion-info">
                  <p className="discussion-title">{d.title}</p>
                  <p className="discussion-author-category">
                    <span className="discussion-author">{d.author}</span> in{' '}
                    <a className="discussion-category-link" href="#">
                      {d.category}
                    </a>
                  </p>
                </div>
                <span className="discussion-time">{d.time}</span>
              </div>
              <div className="discussion-stats">
                <div className="discussion-stat-item">
                  <span className="material-symbols-outlined discussion-stat-icon">
                    forum
                  </span>
                  <span>{d.replies} replies</span>
                </div>
                <div className="discussion-stat-item">
                  <span className="material-symbols-outlined discussion-stat-icon">
                    visibility
                  </span>
                  <span>{d.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// ==================== Categories ====================
const Categories = ({ categories }) => (
  <div className="categories-card">
    <h3 className="categories-title">Categories</h3>
    <ul className="categories-list">
      {categories.map((c, idx) => (
        <li key={idx}>
          <a className="category-item-link" href="#">
            <span className="category-name">{c.name}</span>
            <span className="category-count">{c.count}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// ==================== Safe Space Policy ====================
const SafeSpacePolicy = () => (
  <div className="safe-space-policy-card">
    <div className="safe-space-header">
      <span className="material-symbols-outlined safe-space-icon">
        health_and_safety
      </span>
      <h3 className="safe-space-title">Safe Space Policy</h3>
    </div>
    <p className="safe-space-text">
      This is a moderated forum. We are committed to maintaining a respectful and
      supportive environment for everyone. Please review our community guidelines
      before posting.
    </p>
    <a className="safe-space-link" href="#">
      Read Guidelines
    </a>
  </div>
);