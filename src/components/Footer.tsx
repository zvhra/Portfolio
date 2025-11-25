'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <p>© {currentYear} Zahra. All Rights Reserved.</p>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/zfahmed/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit my LinkedIn profile"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
            <span>LinkedIn</span>
          </a>
          <span className="separator">|</span>
          <a
            href="https://github.com/zvhra"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit my GitHub profile"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>GitHub</span>
          </a>
        </div>
        <p className="footer-note">
          Built with Next.js, React, and TypeScript
        </p>
      </div>
    </footer>
  );
}

