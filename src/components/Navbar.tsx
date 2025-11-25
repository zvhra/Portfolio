'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY < 100) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide navbar (unless hovered)
        if (!isHovered) {
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHovered]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Show navbar when hovering near the top of the page or over the navbar itself
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsHovered(true);
        setIsVisible(true);
      } else if (navbarRef.current) {
        const navbarRect = navbarRef.current.getBoundingClientRect();
        const isOverNavbar = 
          e.clientX >= navbarRect.left &&
          e.clientX <= navbarRect.right &&
          e.clientY >= navbarRect.top &&
          e.clientY <= navbarRect.bottom;
        
        if (isOverNavbar) {
          setIsHovered(true);
          setIsVisible(true);
        } else {
          setIsHovered(false);
        }
      } else {
        setIsHovered(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      setIsLightMode(false);
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = ['home', 'about-tech', 'projects', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (sections.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !navLinksRef.current || !sliderRef.current) return;

    const activeLink = navLinksRef.current.querySelector(`a[href="#${activeSection}"]`) as HTMLElement;
    if (activeLink) {
      const navLinksRect = navLinksRef.current.getBoundingClientRect();
      const activeLinkRect = activeLink.getBoundingClientRect();
      const left = activeLinkRect.left - navLinksRect.left;
      const width = activeLinkRect.width;

      sliderRef.current.style.transform = `translateX(${left}px)`;
      sliderRef.current.style.width = `${width}px`;
    }
  }, [activeSection, mobileMenuOpen]);

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
    <nav 
      ref={navbarRef}
      className={`navbar ${scrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}
      role="navigation" 
      aria-label="Main navigation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <ul ref={navLinksRef} className={`nav-links ${mobileMenuOpen ? 'show' : ''}`}>
        <div ref={sliderRef} className="nav-slider" />
        <li>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Navigate to Home section"
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
          </a>
        </li>
            <li>
              <a
                href="#about-tech"
                onClick={(e) => handleNavClick(e, '#about-tech')}
                aria-label="Navigate to Tech Stack section"
                className={activeSection === 'about-tech' ? 'active' : ''}
              >
                Stack
              </a>
            </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            aria-label="Navigate to Projects section"
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            aria-label="Navigate to Contact section"
            className={activeSection === 'contact' ? 'active' : ''}
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
              <MoonIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <SunIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}

