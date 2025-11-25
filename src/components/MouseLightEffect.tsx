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

    // Handle mousemove event to position the .light div
    const handleMouseMove = (e: MouseEvent) => {
      // Ensure opacity is set to 1 for visibility
      light.style.opacity = '1';

      // Center the .light element around the mouse
      light.style.transform = `translate(${e.clientX - light.offsetWidth / 2}px, ${e.clientY - light.offsetHeight / 2}px)`;
    };

    // Add mousemove listener to update the position
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup the effect when the component is unmounted
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (document.body.contains(light)) {
        document.body.removeChild(light);
      }
    };
  }, []);

  return null;
}

