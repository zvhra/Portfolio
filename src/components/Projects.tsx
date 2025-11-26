'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Section from './Section';
import GitHubCalendar from './GitHubCalendar';

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  link: string;
  github?: string;
  preview: string;
  tags: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Fitness Social Media Platform',
    description:
      'Led full-stack development using C# and .NET, managing timelines and deliverables.',
    longDescription:
      'A comprehensive fitness social media platform built with C# and .NET. Features include user authentication, workout tracking, social interactions, and progress monitoring. Managed the entire development lifecycle from planning to deployment.',
    link: 'https://github.com/zvhra/fitnessplatform',
    github: 'https://github.com/zvhra/fitnessplatform',
    preview:
      'https://github.com/zvhra/fitnessplatform/blob/main/fitness-social-media-preview.jpg?raw=true',
    tags: ['Web App', 'C#', '.NET', 'Full Stack', 'Social Media'],
    featured: true,
  },
  {
    title: 'Internet Relay Chat System',
    description:
      'Developed a Java-based IRC system supporting private messaging and broadcasting features.',
    longDescription:
      'A robust Internet Relay Chat (IRC) system implemented in Java. Supports real-time private messaging, channel broadcasting, user management, and network protocols. Demonstrates strong understanding of networking concepts and concurrent programming.',
    link: 'https://github.com/zvhra/ircsystem',
    github: 'https://github.com/zvhra/ircsystem',
    preview:
      'https://github.com/zvhra/ircsystem/blob/main/irc-chat-system-preview.png?raw=true',
    tags: ['Java', 'Chat', 'Networking', 'Concurrent Programming'],
    featured: true,
  },
  {
    title: 'Banking App',
    description:
      'A console-based banking system in C# with JSON persistence, demonstrating OOP principles and data management.',
    longDescription:
      'A simple console-based banking system written in C#. Features include account creation with auto-generated account numbers, deposit/withdraw operations, fund transfers, transaction history, and data persistence using JSON. Demonstrates object-oriented programming, error handling, and clean architecture.',
    link: 'https://github.com/zvhra/BankingApp',
    github: 'https://github.com/zvhra/BankingApp',
    preview:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tags: ['C#', 'Console App', 'OOP', 'JSON', 'Banking'],
    featured: true,
  },
  {
    title: 'Movie API Solution',
    description:
      'A RESTful API built with ASP.NET Core and SQLite for managing movies, featuring Swagger UI integration.',
    longDescription:
      'A RESTful API built with ASP.NET Core 9.0 and SQLite for managing movies. Features include CRUD operations, Entity Framework Core integration, custom-themed Swagger UI with dark/light toggle, and xUnit testing. Demonstrates modern API development practices and database management.',
    link: 'https://github.com/zvhra/MovieApiSolution',
    github: 'https://github.com/zvhra/MovieApiSolution',
    preview:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    tags: ['ASP.NET Core', 'REST API', 'SQLite', 'Entity Framework', 'Swagger'],
    featured: true,
  },
  {
    title: 'HMCTS Task API',
    description:
      'A task management system for HMCTS built with ASP.NET Core, featuring comprehensive CRUD operations and testing.',
    longDescription:
      'A Task Management System for HMCTS built with ASP.NET Core. Features include full CRUD operations for tasks, comprehensive xUnit test coverage, proper error handling, validation, and clean architecture. Demonstrates professional API development with testing best practices.',
    link: 'https://github.com/zvhra/hmcts-task-api',
    github: 'https://github.com/zvhra/hmcts-task-api',
    preview:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    tags: ['ASP.NET Core', 'REST API', 'Task Management', 'Testing', 'C#'],
    featured: true,
  },
  {
    title: 'Gadgets Information System',
    description:
      'Created a C# desktop system with efficient data storage and an intuitive text-based menu.',
    longDescription:
      'A desktop application built with C# featuring efficient data storage mechanisms and an intuitive text-based user interface. Demonstrates proficiency in desktop application development and data management.',
    link: 'https://github.com/zvhra/gadgets',
    github: 'https://github.com/zvhra/gadgets',
    preview:
      'https://github.com/zvhra/gadgets/blob/main/preview-image.png?raw=true',
    tags: ['Desktop App', 'C#', 'Data Storage', 'Windows Forms'],
    featured: true,
  },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <Section
      id="projects"
      className="projects-section"
      ariaLabelledBy="projects-heading"
    >
      <h2 id="projects-heading" className="section-title">
        <span className="section-title-icon">
          <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
        </span>
        <span className="section-title-text">Featured Projects</span>
      </h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div
            key={`project-${project.title}-${index}`}
            className={`project-card ${project.featured ? 'featured' : ''}`}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => {
              if (typeof window !== 'undefined' && project.link) {
                window.open(project.link, '_blank', 'noopener');
              }
            }}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (typeof window !== 'undefined' && project.link) {
                  window.open(project.link, '_blank', 'noopener');
                }
              }
            }}
            aria-label={`View ${project.title} project`}
          >
            <div className="project-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.preview}
                alt={`${project.title} Preview`}
                className="project-image"
                loading="lazy"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x400/1a1a1f/8892b0?text=Project+Preview';
                  target.alt = `${project.title} Preview (Image unavailable)`;
                }}
              />
              <div
                className={`project-overlay ${hoveredProject === index ? 'visible' : ''}`}
              >
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      className="project-link-btn"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`View ${project.title} on GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
                    </a>
                  )}
                  <a
                    href={project.link}
                    className="project-link-btn"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={`${project.title}-tag-${tag}-${i}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="github-calendar-section">
        <GitHubCalendar />
      </div>
    </Section>
  );
}

