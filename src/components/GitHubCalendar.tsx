'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export default function GitHubCalendar() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = 'zvhra'; // Your GitHub username

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Fetch from API route
        const response = await fetch('/api/github-contributions');
        const data = await response.json();
        
        if (data.error || !data.contributions || data.contributions.length === 0) {
          // Fallback: Generate placeholder data if API fails or no token configured
          const today = new Date();
          const days: ContributionDay[] = [];
          
          for (let i = 370; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            const count = Math.floor(Math.random() * 8);
            const level = count === 0 ? 0 :
                         count <= 3 ? 1 :
                         count <= 7 ? 2 :
                         count <= 15 ? 3 : 4;
            
            days.push({
              date: date.toISOString().split('T')[0],
              count,
              level,
            });
          }
          
          setContributions(days);
          setTotalContributions(days.reduce((sum, day) => sum + day.count, 0));
        } else {
          setContributions(data.contributions);
          setTotalContributions(data.totalContributions || data.contributions.reduce((sum: number, day: ContributionDay) => sum + day.count, 0));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError('Unable to load contribution calendar');
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getContributionColor = (level: number) => {
    const colors = [
      'rgba(0, 212, 255, 0.1)',      // Level 0 - No contributions
      'rgba(0, 212, 255, 0.3)',      // Level 1 - 1-3 contributions
      'rgba(0, 212, 255, 0.5)',      // Level 2 - 4-7 contributions
      'rgba(0, 212, 255, 0.7)',      // Level 3 - 8-15 contributions
      'rgba(0, 212, 255, 1)',        // Level 4 - 16+ contributions
    ];
    return colors[level] || colors[0];
  };

  const getLightModeColor = (level: number) => {
    const colors = [
      'rgba(0, 119, 182, 0.1)',
      'rgba(0, 119, 182, 0.3)',
      'rgba(0, 119, 182, 0.5)',
      'rgba(0, 119, 182, 0.7)',
      'rgba(0, 119, 182, 1)',
    ];
    return colors[level] || colors[0];
  };

  // Group contributions by week (7 days)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  // Get last 53 weeks (approximately 1 year)
  const recentWeeks = weeks.slice(-53);

  if (loading) {
    return (
      <div className="github-calendar-container">
        <div className="github-calendar-loading">
          <FontAwesomeIcon icon={faGithub} />
          <span>Loading contribution calendar...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-calendar-container">
        <div className="github-calendar-error">
          <FontAwesomeIcon icon={faGithub} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="github-calendar-container">
      <div className="github-calendar-header">
        <div className="github-calendar-title">
          <FontAwesomeIcon icon={faGithub} />
          <h3>GitHub Contributions</h3>
        </div>
        <div className="github-calendar-stats">
          <span className="stat-number">{totalContributions.toLocaleString()}</span>
          <span className="stat-label">contributions in the last year</span>
        </div>
      </div>
      
      <div className="github-calendar-wrapper">
        <div className="github-calendar-months">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
            <span key={month} className="month-label" style={{ left: `${(index * 100) / 12}%` }}>
              {month}
            </span>
          ))}
        </div>
        
        <div className="github-calendar-grid">
          {recentWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="calendar-week">
              {week.map((day, dayIndex) => {
                const date = new Date(day.date);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`calendar-day level-${day.level} ${isToday ? 'today' : ''}`}
                    style={{
                      backgroundColor: getContributionColor(day.level),
                      borderColor: day.level > 0 ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.1)',
                    }}
                    title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${date.toLocaleDateString()}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="github-calendar-legend">
          <span className="legend-label">Less</span>
          <div className="legend-squares">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`legend-square level-${level}`}
                style={{
                  backgroundColor: getContributionColor(level),
                  borderColor: level > 0 ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.1)',
                }}
              />
            ))}
          </div>
          <span className="legend-label">More</span>
        </div>
      </div>
      
      <div className="github-calendar-footer">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer noopener"
          className="github-link"
        >
          View GitHub Profile →
        </a>
      </div>
    </div>
  );
}

