'use client';
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
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import Section from './Section';

interface Skill {
  name: string;
  icon: IconDefinition | null;
  color: string;
  isImage: boolean;
  imagePath?: string;
  category: 'frontend' | 'backend' | 'tools';
}

const frontendSkills: Skill[] = [
  { name: 'HTML5', icon: faHtml5, color: '#E34F26', isImage: false, category: 'frontend' },
  { name: 'CSS3', icon: faCss3Alt, color: '#1572B6', isImage: false, category: 'frontend' },
  { name: 'JavaScript', icon: faJsSquare, color: '#F7DF1E', isImage: false, category: 'frontend' },
  { name: 'TypeScript', icon: null, color: '#3178C6', isImage: true, imagePath: '/typescript.svg', category: 'frontend' },
  { name: 'React', icon: faReact, color: '#61DAFB', isImage: false, category: 'frontend' },
  { name: 'Vue.js', icon: faVuejs, color: '#4FC08D', isImage: false, category: 'frontend' },
  { name: 'Tailwind CSS', icon: null, color: '#06B6D4', isImage: true, imagePath: '/Tailwind_CSS_Logo.svg', category: 'frontend' },
];

const backendSkills: Skill[] = [
  { name: 'Node.js', icon: faNodeJs, color: '#339933', isImage: false, category: 'backend' },
  { name: 'Python', icon: faPython, color: '#3776AB', isImage: false, category: 'backend' },
  { name: 'Java', icon: faJava, color: '#ED8B00', isImage: false, category: 'backend' },
  { name: 'C#', icon: faMicrosoft, color: '#239120', isImage: false, category: 'backend' },
  { name: '.NET Core', icon: faMicrosoft, color: '#512BD4', isImage: false, category: 'backend' },
  { name: 'ASP.NET', icon: faMicrosoft, color: '#512BD4', isImage: false, category: 'backend' },
  { name: 'MongoDB', icon: faDatabase, color: '#47A248', isImage: false, category: 'backend' },
  { name: 'SQL Server', icon: faDatabase, color: '#CC2927', isImage: false, category: 'backend' },
  { name: 'Docker', icon: faDocker, color: '#2496ED', isImage: false, category: 'backend' },
  { name: 'AWS', icon: faAws, color: '#FF9900', isImage: false, category: 'backend' },
  { name: 'Azure', icon: faMicrosoft, color: '#0078D4', isImage: false, category: 'backend' },
];

const toolsSkills: Skill[] = [
  { name: 'VS Code', icon: null, color: '#007ACC', isImage: false, category: 'tools' },
  { name: 'Rider', icon: null, color: '#000000', isImage: false, category: 'tools' },
  { name: 'Eclipse', icon: null, color: '#2C2255', isImage: false, category: 'tools' },
  { name: 'Git', icon: faGitAlt, color: '#F05032', isImage: false, category: 'tools' },
];

const skillCategories = [
  { title: 'Frontend', skills: frontendSkills },
  { title: 'Backend', skills: backendSkills },
  { title: 'Tools', skills: toolsSkills },
];

export default function About() {
  return (
    <Section
      id="about-tech"
      className="about-tech-section"
      ariaLabelledBy="skills-heading"
    >
      <div className="about-container">
        <h2 id="skills-heading" className="section-title">
          <span className="section-title-icon">
            <FontAwesomeIcon icon={faCode} aria-hidden="true" />
          </span>
          <span className="section-title-text">Tech Stack</span>
        </h2>
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.title} className="skill-category">
            <h3 className="skill-category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-item"
                  style={{
                    animationDelay: `${(categoryIndex * category.skills.length + index) * 0.1}s`,
                  }}
                >
                  <div className="skill-icon" style={{ color: skill.color }}>
                    {skill.isImage && skill.imagePath ? (
                      <Image 
                        src={skill.imagePath} 
                        alt={skill.name} 
                        width={28} 
                        height={28}
                        unoptimized
                        className={skill.name === 'TypeScript' ? 'typescript-icon' : ''}
                        style={skill.name === 'TypeScript' ? { width: '28px', height: '28px' } : {}}
                      />
                    ) : skill.icon ? (
                      <FontAwesomeIcon icon={skill.icon} aria-hidden="true" />
                    ) : (
                      <span className="skill-placeholder">{skill.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

