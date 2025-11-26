'use client';

import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingDownRef = useRef(false);
  const isThemeTogglingRef = useRef(false);


  // Navbar scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setScrolled(currentScrollY > 50);
      
      // Always show navbar at the top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Determine scroll direction
      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Only react to significant scroll movements (avoid jitter)
      if (scrollDelta < 5) {
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Update scroll direction ref
      isScrollingDownRef.current = scrollingDown;
      
      // Don't hide/show navbar if theme is being toggled
      if (isThemeTogglingRef.current) {
        return;
      }
      
      if (scrollingDown) {
        // Scrolling down - hide navbar immediately
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar immediately
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Initialize scroll position
    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Simple hover to show navbar when hidden (only at top of screen, after scroll stops)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let hoverTimeout: NodeJS.Timeout | null = null;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let lastScrollTime = Date.now();
    let isScrolling = false;

    const handleScroll = () => {
      lastScrollTime = Date.now();
      isScrolling = true;
      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      // Reset scrolling flag after 300ms
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        scrollTimeout = null;
      }, 300);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Don't show navbar on hover while scrolling
      if (isScrolling || isScrollingDownRef.current) return;
      
      // Keep navbar visible when mouse is near the top (navbar area)
      if (e.clientY <= 100 && window.scrollY > 100) {
        const timeSinceScroll = Date.now() - lastScrollTime;
        if (timeSinceScroll > 300) {
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
          }
          hoverTimeout = setTimeout(() => {
            if (!isScrolling && !isScrollingDownRef.current) {
              setIsVisible(true);
            }
            hoverTimeout = null;
          }, 50);
        }
      } else if (e.clientY > 100 && isVisible && window.scrollY > 100) {
        // Only hide if mouse moves away from navbar area and navbar is currently visible
        // Don't hide immediately, wait a bit to avoid flickering
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
        const mouseY = e.clientY;
        hoverTimeout = setTimeout(() => {
          // Check current mouse position to ensure it's still away from navbar
          if (mouseY > 100 && window.scrollY > 100) {
            setIsVisible(false);
          }
          hoverTimeout = null;
        }, 200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
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
    } catch {
      // localStorage may be unavailable (e.g., private browsing mode)
      // Default to dark mode
      setIsLightMode(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set flag to prevent scroll handlers from hiding navbar during theme change
    isThemeTogglingRef.current = true;
    
    // Keep navbar visible when theme changes
    setIsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        // localStorage may be unavailable (e.g., private browsing mode)
        // Silently fail - theme will still be applied to DOM
      }
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {
        // localStorage may be unavailable (e.g., private browsing mode)
        // Silently fail - theme will still be applied to DOM
      }
    }
    
    // Reset flag after theme transition completes
    setTimeout(() => {
      isThemeTogglingRef.current = false;
    }, 500);
  }, [isLightMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Clear active section when on terminal page
    if (pathname === '/terminal') {
      setActiveSection('');
      return;
    }

    // Reset to home if coming from other pages
    if (pathname === '/') {
      setActiveSection('home');
    }

    const sections = ['home', 'projects', 'about-tech', 'contact'];
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
      // Explicitly disconnect the observer to prevent memory leaks
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || !navLinksRef.current || !sliderRef.current) return;

    const updateSliderPosition = () => {
      if (!navLinksRef.current || !sliderRef.current) return;

      // Hide slider on mobile viewports (when menu is open or screen is small)
      const isMobile = window.innerWidth < 768;
      // Hide slider when on terminal page or when no active section
      if (mobileMenuOpen || isMobile || pathname === '/terminal' || !activeSection) {
        sliderRef.current.style.display = 'none';
        return;
      }

      // Show slider for desktop view
      sliderRef.current.style.display = 'block';

      const activeLink = navLinksRef.current.querySelector(`a[href="#${activeSection}"]`) as HTMLElement;
      if (activeLink && sliderRef.current) {
        const navLinksRect = navLinksRef.current.getBoundingClientRect();
        const activeLinkRect = activeLink.getBoundingClientRect();
        const left = activeLinkRect.left - navLinksRect.left;
        const width = activeLinkRect.width;

        sliderRef.current.style.transform = `translateX(${left}px)`;
        sliderRef.current.style.width = `${width}px`;
      } else if (sliderRef.current) {
        // Hide slider if no active link found
        sliderRef.current.style.display = 'none';
      }
    };

    // Initial update
    updateSliderPosition();

    // Handle window resize
    window.addEventListener('resize', updateSliderPosition);

    return () => {
      window.removeEventListener('resize', updateSliderPosition);
    };
  }, [activeSection, mobileMenuOpen, pathname]);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    if (typeof window === 'undefined' || !mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        navbarRef.current &&
        !navbarRef.current.contains(target) &&
        !target.closest('.nav-links') &&
        !target.closest('.menu-toggle')
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Also close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Use capture phase to catch clicks earlier
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    // Set flag to prevent scroll handlers from hiding navbar during theme change
    isThemeTogglingRef.current = true;
    setIsLightMode((prev) => !prev);
    // Keep navbar visible when toggling theme
    setIsVisible(true);
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // Reset flag after a short delay to allow theme transition to complete
    setTimeout(() => {
      isThemeTogglingRef.current = false;
    }, 500);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    
    // If we're on terminal page, navigate to home page with the section hash
    if (pathname === '/terminal') {
      // Convert #home to / (home page), and other hashes to /#section
      if (href === '#home') {
        window.location.href = '/';
      } else {
        window.location.href = `/${href}`;
      }
      return;
    }
    
    // Show navbar when clicking a nav link
    setIsVisible(true);
    
    // Extract ID from href (e.g., "#home" -> "home")
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    
    if (element) {
      // Calculate offset accounting for navbar height and scroll margin
      const navbarHeight = navbarRef.current?.offsetHeight || 80;
      const scrollMargin = parseInt(getComputedStyle(element).scrollMarginTop) || 80;
      const offsetTop = element.offsetTop - Math.max(navbarHeight, scrollMargin);
      
      // Smooth scroll to section
      window.scrollTo({
        top: Math.max(0, offsetTop),
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
    >
      <button
        className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMobileMenuOpen((prev) => !prev);
        }}
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
        type="button"
      >
        <span className="menu-toggle-line"></span>
        <span className="menu-toggle-line"></span>
        <span className="menu-toggle-line"></span>
      </button>
      <div className="navbar-left">
        <Link 
          href="/terminal" 
          className={`terminal-link ${pathname === '/terminal' ? 'active' : ''}`} 
          aria-label="Open terminal page"
        >
          <FontAwesomeIcon icon={faTerminal} />
        </Link>
        <button
          className="light-mode-button mobile-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${isLightMode ? 'dark' : 'light'} mode`}
        >
          {isLightMode ? (
            <SunIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <MoonIcon className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>
      <ul ref={navLinksRef} className={`nav-links ${mobileMenuOpen ? 'show' : ''}`}>
        <div ref={sliderRef} className="nav-slider" />
        <li>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Navigate to Home section"
            className={activeSection === 'home' && pathname !== '/terminal' ? 'active' : ''}
          >
            <span className="menu-item-title">Home</span>
            <span className="menu-item-subtitle">Welcome to my portfolio</span>
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            aria-label="Navigate to Projects section"
            className={activeSection === 'projects' ? 'active' : ''}
          >
            <span className="menu-item-title">Projects</span>
            <span className="menu-item-subtitle">My work & experiences</span>
          </a>
        </li>
        <li>
          <a
            href="#about-tech"
            onClick={(e) => handleNavClick(e, '#about-tech')}
            aria-label="Navigate to Tech Stack section"
            className={activeSection === 'about-tech' ? 'active' : ''}
          >
            <span className="menu-item-title">Stack</span>
            <span className="menu-item-subtitle">Technologies I work with</span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            aria-label="Navigate to Contact section"
            className={activeSection === 'contact' ? 'active' : ''}
          >
            <span className="menu-item-title">Contact</span>
            <span className="menu-item-subtitle">Let&apos;s work together</span>
          </a>
        </li>
        <li className="desktop-toggle">
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

