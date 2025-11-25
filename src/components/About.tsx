'use client';

import React from 'react';
import { useInView } from '../hooks/useInView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faGraduationCap,
  faCode,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faPython,
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faNodeJs,
  faGitAlt,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';

const skills = [
  { name: 'HTML5', icon: faHtml5, level: 90 },
  { name: 'CSS3', icon: faCss3Alt, level: 90 },
  { name: 'JavaScript', icon: faJsSquare, level: 85 },
  { name: 'React', icon: faReact, level: 85 },
  { name: 'Python', icon: faPython, level: 80 },
  { name: 'Node.js', icon: faNodeJs, level: 75 },
  { name: 'Git', icon: faGitAlt, level: 85 },
  { name: 'C#', icon: faMicrosoft, level: 85 },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="about-tech"
      className={`about-tech-section fade-in ${inView ? 'visible' : ''}`}
      aria-labelledby="about-heading"
    >
      <div className="about-container">
        <h2 id="about-heading">About Me</h2>
        <div className="about-content">
          <p className="about-description">
            I&apos;m a Computing Graduate with a Bachelor&apos;s Honours degree. I have
            hands-on experience in full-stack development, software engineering,
            and project management, demonstrated through various projects,
            including a fitness social media platform and an Internet Relay Chat
            system. My skills span across C#, Python, Java, and web technologies,
            with a strong focus on creating efficient, user-centric applications.
          </p>

          <div className="about-details">
            <div className="detail-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} aria-hidden="true" />
              <span>London, UK</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />
              <span>BSc (Hons) Computing</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
              <span>Full Stack Developer</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faCode} aria-hidden="true" />
              <span>Proficient in C# & Python</span>
            </div>
          </div>
        </div>

        <h2 id="skills-heading">Tech Stack</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-item"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="skill-icon">
                <FontAwesomeIcon icon={skill.icon} />
              </div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{
                      width: inView ? `${skill.level}%` : '0%',
                      transition: `width 1s ease-out ${index * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

