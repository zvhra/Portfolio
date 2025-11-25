'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faPython,
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faNodeJs,
  faGitAlt,
  faMicrosoft,
  faVuejs,
  faDocker,
  faAws,
  faJava,
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Section from './Section';
import GitHubCalendar from './GitHubCalendar';

const skills = [
  { name: 'HTML5', icon: faHtml5, color: '#E34F26', isImage: false },
  { name: 'CSS3', icon: faCss3Alt, color: '#1572B6', isImage: false },
  { name: 'JavaScript', icon: faJsSquare, color: '#F7DF1E', isImage: false },
  { name: 'TypeScript', icon: null, color: '#3178C6', isImage: true, imagePath: '/typescript.svg' },
  { name: 'React', icon: faReact, color: '#61DAFB', isImage: false },
  { name: 'Vue.js', icon: faVuejs, color: '#4FC08D', isImage: false },
  { name: 'Tailwind CSS', icon: null, color: '#06B6D4', isImage: true, imagePath: '/Tailwind_CSS_Logo.svg' },
  { name: 'Node.js', icon: faNodeJs, color: '#339933', isImage: false },
  { name: 'Python', icon: faPython, color: '#3776AB', isImage: false },
  { name: 'Java', icon: faJava, color: '#ED8B00', isImage: false },
  { name: 'C#', icon: faMicrosoft, color: '#239120', isImage: false },
  { name: '.NET Core', icon: faMicrosoft, color: '#512BD4', isImage: false },
  { name: 'ASP.NET', icon: faMicrosoft, color: '#512BD4', isImage: false },
  { name: 'MongoDB', icon: faDatabase, color: '#47A248', isImage: false },
  { name: 'SQL Server', icon: faDatabase, color: '#CC2927', isImage: false },
  { name: 'Docker', icon: faDocker, color: '#2496ED', isImage: false },
  { name: 'AWS', icon: faAws, color: '#FF9900', isImage: false },
  { name: 'Azure', icon: faMicrosoft, color: '#0078D4', isImage: false },
  { name: 'Git', icon: faGitAlt, color: '#F05032', isImage: false },
];

export default function About() {
  return (
    <Section
      id="about-tech"
      className="about-tech-section"
      ariaLabelledBy="about-heading"
    >
      <div className="about-container">
        <h2 id="skills-heading" className="section-title">
          <span className="section-title-icon">
            <FontAwesomeIcon icon={faCode} />
          </span>
          <span className="section-title-text">Tech Stack</span>
        </h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-item"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.isImage ? (
                  <Image 
                    src={skill.imagePath!} 
                    alt={skill.name} 
                    width={48} 
                    height={48}
                    unoptimized
                    className={skill.name === 'TypeScript' ? 'typescript-icon' : ''}
                    style={skill.name === 'TypeScript' ? { width: '48px', height: '48px' } : {}}
                  />
                ) : (
                  <FontAwesomeIcon icon={skill.icon!} />
                )}
              </div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="github-calendar-section">
          <GitHubCalendar />
        </div>
      </div>
    </Section>
  );
}

