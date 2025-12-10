import React, { useState, useEffect } from "react";
import { BookOpen, Filter, Link2, PlayCircle, FileText, ArrowUpRight, Heart, Phone, Users, MessageSquare } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import './ResourcesDirectory.css';

const API_BASE_URL = 'http://localhost:8000';

const ResourceDirectory = () => {
  const [resourceCategories, setResourceCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        const categoriesRes = await fetch(`${API_BASE_URL}/api/resources/categories`);
        if (categoriesRes.ok) setResourceCategories(await categoriesRes.json());

        const resourcesRes = await fetch(`${API_BASE_URL}/api/resources`);
        if (resourcesRes.ok) setResources(await resourcesRes.json());
      } catch (error) {
        console.error("Could not fetch resources data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResourcesData();
  }, []);

  const filteredResources = selectedCategory
    ? resources.filter((r) => r.category === selectedCategory)
    : resources;

  if (isLoading) return <div className="loading-screen">Loading resources...</div>;

  return (
    <DashboardLayout>
      <div className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Resources</p>
            <h1 className="page-title">Resources & Support</h1>
            <p className="page-subtitle">Find trusted guides, tools, and support services in one place.</p>
          </div>
          <div className="header-actions">
            <button className="chip-button" onClick={() => setSelectedCategory(null)}>
              <Filter size={14} /> Clear filters
            </button>
          </div>
        </div>

        <div className="page-grid">
          <div className="main-column">
            <div className="card">
              <div className="card-header">
                <div className="card-title-row">
                  <BookOpen size={20} />
                  <h2 className="card-title">Educational Resources</h2>
                </div>
              </div>

              <div className="pill-row">
                <button
                  className={`pill ${!selectedCategory ? 'pill-active' : ''}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All resources
                </button>
                {resourceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`pill ${selectedCategory === cat.name ? 'pill-active' : ''}`}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="resources-grid">
                {filteredResources.map((resource) => (
                  <article key={resource.id} className="resource-card">
                    <div className="resource-top">
                      <span className="resource-icon">
                        {resource.type === 'Video' && <PlayCircle size={18} />}
                        {resource.type === 'PDF' && <FileText size={18} />}
                        {resource.type !== 'Video' && resource.type !== 'PDF' && <Link2 size={18} />}
                      </span>
                      <span className="type-badge">{resource.type}</span>
                    </div>
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                    <a href={resource.url} target="_blank" rel="noreferrer" className="resource-link">
                      Open resource <ArrowUpRight size={14} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="side-column">
            <div className="card">
              <div className="card-title-row">
                <Heart size={18} />
                <h3 className="card-title">Support Services</h3>
              </div>
              <ul className="support-list">
                <li className="support-item">
                  <Users size={16} />
                  <div>
                    <p className="support-title">Counseling & Mental Health</p>
                    <p className="support-text">Connect with licensed therapists specializing in HIV-related topics.</p>
                  </div>
                </li>
                <li className="support-item">
                  <Phone size={16} />
                  <div>
                    <p className="support-title">24/7 Helpline</p>
                    <p className="support-text">Confidential support anytime. Dial 1-800-555-HELP.</p>
                  </div>
                </li>
                <li className="support-item">
                  <MessageSquare size={16} />
                  <div>
                    <p className="support-title">Online Support Groups</p>
                    <p className="support-text">Join moderated peer groups to share and learn from others.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="card-title-row">
                <Link2 size={18} />
                <h3 className="card-title">Reputable Organizations</h3>
              </div>
              <ul className="org-list">
                {organizationLinks.map((org) => (
                  <li key={org.name} className="org-item">
                    <a className="org-link" href={org.url || '#'} target="_blank" rel="noreferrer">
                      <span>{org.name}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const organizationLinks = [
  { name: 'CDC – HIV', url: 'https://www.cdc.gov/hiv' },
  { name: 'WHO – HIV', url: 'https://www.who.int/health-topics/hiv-aids' },
  { name: 'The Trevor Project', url: 'https://www.thetrevorproject.org' },
  { name: 'amfAR', url: 'https://www.amfar.org' },
];

export default ResourceDirectory;