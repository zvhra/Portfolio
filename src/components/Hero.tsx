'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faCode, faLaptopCode, faDatabase } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const text = 'Software Developer | C#, React, SQL';
    let index = 0;

    const interval = setInterval(() => {
      setTypedText(text.substring(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section" role="banner">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-intro">
            <h1 className="hero-name">Zahra Ahmed</h1>
            <h2 className="hero-title">
              <span className="dynamic-line developer">{typedText}</span>
              {!isTypingComplete && <span className="typing-cursor">|</span>}
            </h2>
            <p className="hero-description">
              Computing Graduate specializing in full-stack development, software engineering, 
              and building user-centric applications. Passionate about creating innovative solutions 
              with modern technologies including C#, Python, Java, and web frameworks.
            </p>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>London, UK</span>
          </div>
          <div className="social-contact-group">
            <div className="social-links">
              <a
                href="https://github.com/zvhra"
                className="social-link"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Visit my GitHub profile"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/zfahmed/"
                className="social-link"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Visit my LinkedIn profile"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <a
              href="#contact"
              className="schedule-call-btn"
              aria-label="Contact me"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm.5-9H7v4h4V6.5h-2.5V5z" fill="currentColor"/>
              </svg>
              Contact
            </a>
          </div>
        </div>
      </div>
      
      <div className="hero-features">
        <div className="what-i-do">
          <h3 className="features-title">What I Do</h3>
          <div className="service-cards">
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <div className="service-content">
                <h4 className="service-title">Frontend Development</h4>
                <p className="service-description">Building responsive and interactive user interfaces with React, TypeScript, and modern CSS</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faDatabase} />
              </div>
              <div className="service-content">
                <h4 className="service-title">Backend Development</h4>
                <p className="service-description">Creating robust APIs and server-side solutions using C#, .NET, and SQL databases</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faLaptopCode} />
              </div>
              <div className="service-content">
                <h4 className="service-title">Full Stack Solutions</h4>
                <p className="service-description">End-to-end development from concept to deployment, ensuring seamless integration</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="currently-section">
          <h3 className="features-title">Currently</h3>
          <div className="currently-items">
            <div className="currently-item">
              <span className="currently-label">Working on:</span>
              <span className="currently-value">Building scalable web applications</span>
            </div>
            <div className="currently-item">
              <span className="currently-label">Learning:</span>
              <span className="currently-value">Advanced React patterns & Cloud technologies</span>
            </div>
            <div className="currently-item">
              <span className="currently-label">Available for:</span>
              <span className="currently-value">Freelance projects & collaborations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
