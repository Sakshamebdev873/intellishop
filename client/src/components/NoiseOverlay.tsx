// src/components/NoiseOverlay.tsx
import React from 'react';

export const NoiseOverlay = () => {
  return (
    <div
      style={{
        position: 'fixed', // Covers the entire viewport
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0.035, // Keep it very subtle
        pointerEvents: 'none', // Allows clicking through it
        zIndex: 100, // Ensures it's on top of other content
      }}
    >
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8" // Controls the grain size
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};