'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    } else {
      setIsLightMode(false);
      document.body.classList.remove('light-mode');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 64;
      // Use smooth scroll with easing
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Fallback for better browser support
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <button
        className="menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
      <div className="navbar-left">
        <Link href="/terminal" className="terminal-link" aria-label="Open terminal page">
          <FontAwesomeIcon icon={faTerminal} />
        </Link>
      </div>
      <ul className={`nav-links ${mobileMenuOpen ? 'show' : ''}`}>
        <li>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Navigate to Home section"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about-tech"
            onClick={(e) => handleNavClick(e, '#about-tech')}
            aria-label="Navigate to About section"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            aria-label="Navigate to Projects section"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            aria-label="Navigate to Contact section"
          >
            Contact
          </a>
        </li>
        <li>
          <button
            className="light-mode-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isLightMode ? 'dark' : 'light'} mode`}
          >
            {isLightMode ? (
              <SunIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}

