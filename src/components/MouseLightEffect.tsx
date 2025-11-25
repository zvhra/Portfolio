'use client';

import { useEffect } from 'react';

export default function MouseLightEffect() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Scroll to the top of the page on load
    window.scrollTo(0, 0);

    // Create the .light div and append it to the body
    const light = document.createElement('div');
    light.classList.add('light');
    document.body.appendChild(light);

    let rafId: number | null = null;
    let mouseX = 0;
    let mouseY = 0;

    // Handle mousemove event to position the .light div
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Use requestAnimationFrame for smooth updates
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          // Center the .light element around the mouse
          const x = mouseX - light.offsetWidth / 2;
          const y = mouseY - light.offsetHeight / 2;
          light.style.transform = `translate(${x}px, ${y}px)`;
          light.style.opacity = '1';
          rafId = null;
        });
      }
    };

    // Add mousemove listener to update the position
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Cleanup the effect when the component is unmounted
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (document.body.contains(light)) {
        document.body.removeChild(light);
      }
    };
  }, []);

  return null;
}

