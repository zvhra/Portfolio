'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <p>© {currentYear} Zahra. All Rights Reserved.</p>
        <p className="footer-note">
          Built with Next.js, React, and TypeScript
        </p>
      </div>
    </footer>
  );
}

