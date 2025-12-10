import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, ShieldCheck, Users, Eye, Reply } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import './CommunityForum.css';

const API_BASE_URL = 'http://localhost:8000';

export default function CommunityForum() {
  const [discussions, setDiscussions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const discussionsRes = await fetch(`${API_BASE_URL}/api/forum/discussions`);
        if (discussionsRes.ok) {
          setDiscussions(await discussionsRes.json());
        }

        const categoriesRes = await fetch(`${API_BASE_URL}/api/forum/categories`);
        if (categoriesRes.ok) {
          setCategories(await categoriesRes.json());
        }
      } catch (error) {
        console.error('Could not fetch forum data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForumData();
  }, []);

  if (isLoading) return <div className="loading-screen">Loading forum...</div>;

  return (
    <DashboardLayout>
      <div className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Community</p>
            <h1 className="page-title">Community Forum</h1>
            <p className="page-subtitle">Ask questions, share experiences, and connect with peers.</p>
          </div>
          <button className="primary-btn">
            <Plus size={16} />
            Start a Discussion
          </button>
        </div>

        <div className="page-grid">
          <div className="main-column">
            <div className="card">
              <div className="card-header">
                <div className="card-title-row">
                  <MessageSquare size={20} />
                  <h2 className="card-title">Recent Discussions</h2>
                </div>
                <a className="link-muted" href="#">View all</a>
              </div>
              <ul className="discussion-list">
                {discussions.map((d) => (
                  <li key={d.id} className="discussion-row">
                    <div className="discussion-meta">
                      <div className="avatar-fallback">{(d.author || 'U')[0]}</div>
                      <div>
                        <p className="discussion-title-text">{d.title}</p>
                        <p className="discussion-byline">{d.author} · {d.category}</p>
                      </div>
                    </div>
                    <div className="discussion-stats">
                      <span className="stat-chip"><Reply size={14} /> {d.replies}</span>
                      <span className="stat-chip"><Eye size={14} /> {d.views}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="side-column">
            <div className="card">
              <div className="card-title-row">
                <Users size={18} />
                <h3 className="card-title">Categories</h3>
              </div>
              <ul className="pill-list">
                {categories.map((c) => (
                  <li key={c.id} className="pill-item">
                    <span className="pill-label">{c.name}</span>
                    <span className="pill-count">{c.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="card-title-row">
                <ShieldCheck size={18} />
                <h3 className="card-title">Safe Space Policy</h3>
              </div>
              <p className="body-text">
                We keep discussions respectful and supportive. Review our guidelines before posting.
              </p>
              <a className="link-strong" href="#">Read guidelines</a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}