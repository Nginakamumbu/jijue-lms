import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users, Medal, Settings, LogOut, Globe } from "lucide-react";
import './Statistics.css'; // Import the dedicated CSS file

// --- Constants ---
const PRIMARY_COLOR = "#C084FC"; // purple-400

// --- Statistics Component ---
export default function Statistics() {
  
  // Chart Initialization Effect
  useEffect(() => {
    const ctx = document.getElementById("trendsChart");
    if (!ctx) return;

    // Destroy existing chart if it exists (for strict React cleanup)
    if (Chart.getChart("trendsChart")) {
      Chart.getChart("trendsChart").destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2023"],
        datasets: [
          {
            label: "New Infections (in millions)",
            data: [2.1, 1.9, 1.8, 1.7, 1.6, 1.5, 1.3, 1.3],
            borderColor: PRIMARY_COLOR,
            backgroundColor: PRIMARY_COLOR + '40', // Semi-transparent
            tension: 0.3,
            fill: false
          },
          {
            label: "AIDS-Related Deaths (in millions)",
            data: [1.3, 1.2, 1.0, 0.9, 0.8, 0.7, 0.65, 0.63],
            borderColor: '#EF4444', // Red
            backgroundColor: '#EF4444' + '40',
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'var(--color-text-base)' // Set legend color using CSS variable
            }
          }
        },
        scales: {
            x: {
                grid: { color: 'var(--color-border-subtle)' },
                ticks: { color: 'var(--color-text-muted)' }
            },
            y: {
                grid: { color: 'var(--color-border-subtle)' },
                ticks: { color: 'var(--color-text-muted)' }
            }
        }
      }
    });
  }, []);

  return (
    <div className="stats-page-container">
      
      {/* Sidebar */}
      <aside className="sidebar-container">
        <div className="logo-group">
          <Globe className="logo-icon" style={{ color: PRIMARY_COLOR }} />
          <span className="logo-text" style={{ color: PRIMARY_COLOR }}>JIJUE</span>
        </div>

        <nav className="sidebar-nav">
          <Link className="nav-link" to="/dashboard">
            <LayoutDashboard className="nav-icon" /> Dashboard
          </Link>

          <Link className="nav-link" to="/courses">
            <BookOpen className="nav-icon" /> Courses
          </Link>

          <Link className="nav-link active" to="/statistics" style={{ backgroundColor: PRIMARY_COLOR + '20', color: PRIMARY_COLOR }}>
            <Globe className="nav-icon" /> Statistics
          </Link>

          <Link className="nav-link" to="#">
            <Medal className="nav-icon" /> Badges
          </Link>

          <Link className="nav-link" to="#">
            <Settings className="nav-icon" /> Settings
          </Link>
        </nav>

        <div className="mt-auto">
          <Link className="nav-link" to="/login">
            <LogOut className="nav-icon" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content-wrapper">
        <div className="main-content-container">
          
          {/* Header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Global HIV/AIDS Statistics</h1>
              <p className="page-subtitle">
                Data as of end of 2023, sourced from UNAIDS & WHO
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <section className="stats-cards-grid">
            <StatCard icon="group" label="People Living with HIV" value="39 M" />
            <StatCard icon="person_add" label="New Infections" value="1.3 M" />
            <StatCard icon="heart_broken" label="AIDS-Related Deaths" value="630 K" />
            <StatCard icon="medication" label="On ART" value="29.8 M" />
          </section>

          {/* Chart + Treatment */}
          <section className="chart-treatment-grid">
            {/* Chart Panel */}
            <div className="chart-panel">
              <h2 className="panel-title">Global Trends (2010 – 2023)</h2>
              <div className="chart-wrapper">
                <canvas id="trendsChart"></canvas>
              </div>
            </div>

            {/* Treatment Access Panel */}
            <div className="treatment-panel">
              <h2 className="panel-title">Treatment Access</h2>
              
              <div className="access-donut-wrapper">
                <Globe className="access-donut-icon" />
                <span className="access-percentage" style={{ color: PRIMARY_COLOR }}>76%</span>
                {/* Note: In a real app, this should be a Chart.js Doughnut chart */}
              </div>

              <p className="access-info-text access-info-top">
                of people with HIV have access to treatment
              </p>

              <p className="access-info-text access-info-bottom">
                This means that about <strong>9.2 million</strong> people are still waiting for access to life-saving ART.
              </p>
            </div>
          </section>

          {/* Regional Table */}
          <section className="regional-table-section">
            <h2 className="regional-table-title">Regional Breakdown</h2>
            <div className="regional-table-panel">
              <div className="table-wrapper">
                <table className="regional-table">
                  <thead>
                    <tr className="table-header-row">
                      <th className="table-header-cell">Region</th>
                      <th className="table-header-cell text-center">People with HIV</th>
                      <th className="table-header-cell text-center">New Infections</th>
                      <th className="table-header-cell text-center">Deaths</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <TableRow region="Eastern & Southern Africa" hiv="20.8 M" infections="570 K" deaths="260 K" />
                    <TableRow region="Western & Central Africa" hiv="4.8 M" infections="160 K" deaths="110 K" />
                    <TableRow region="Asia & Pacific" hiv="6.5 M" infections="290 K" deaths="150 K" />
                    <TableRow region="Latin America & Caribbean" hiv="2.5 M" infections="130 K" deaths="45 K" />
                    <TableRow region="Eastern Europe & Central Asia" hiv="2.0 M" infections="130 K" deaths="48 K" />
                    <TableRow region="Europe & North America" hiv="2.3 M" infections="64 K" deaths="20 K" />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// =============== Helper components ===============

const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon-wrapper" style={{ backgroundColor: PRIMARY_COLOR + '1A' }}>
      <span className="material-symbols-outlined stat-icon" style={{ color: PRIMARY_COLOR }}>{icon}</span>
    </div>
    <div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  </div>
);

const TableRow = ({ region, hiv, infections, deaths }) => (
  <tr className="table-row">
    <td className="table-data-cell font-medium">{region}</td>
    <td className="table-data-cell text-center">{hiv}</td>
    <td className="table-data-cell text-center">{infections}</td>
    <td className="table-data-cell text-center">{deaths}</td>
  </tr>
);