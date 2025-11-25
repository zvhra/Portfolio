'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const text = 'Software Developer';
    let index = 0;

    const interval = setInterval(() => {
      setTypedText(text.substring(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    
    const element = document.querySelector('#about-tech');
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    
    const element = document.querySelector('#projects');
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header id="home" role="banner">
      <div className="hero-content">
        <div className="hero-intro">
          <p className="hero-greeting">Hi, I&apos;m</p>
          <h1 className="hero-name">Zahra</h1>
        </div>
        
        <div className="hero-text-container">
          <h2 className="hero-title">
            <span className="dynamic-line developer">{typedText}</span>
            {!isTypingComplete && <span className="typing-cursor">|</span>}
          </h2>
          <p className="hero-description">
            A Computing Graduate passionate about creating innovative solutions 
            and building user-centric applications.
          </p>
        </div>

        <div className="button-group">
          <a
            href="#about-tech"
            className="header-btn primary-btn"
            onClick={handleScrollToAbout}
            aria-label="Learn more about me"
          >
            Learn More
          </a>
          <a
            href="#projects"
            className="header-btn secondary-btn"
            onClick={handleScrollToProjects}
            aria-label="View my projects"
          >
            View Projects
          </a>
        </div>

        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/zfahmed/"
            className="social-link"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit my LinkedIn profile"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href="https://github.com/zvhra"
            className="social-link"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit my GitHub profile"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </header>
  );
}
