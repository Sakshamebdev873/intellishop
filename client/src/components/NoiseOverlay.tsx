// src/components/NoiseOverlay.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const NoiseOverlay = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0.06, // Slightly higher opacity for the animated version
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      <svg width="100%" height="100%">
        <filter id="noise">
          {/* We wrap the turbulence filter in a motion component */}
          <motion.feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            stitchTiles="stitch"
            // Animate the baseFrequency to make the noise shimmer
            animate={{
              baseFrequency: [0.7, 0.8, 0.7],
            }}
            transition={{
              duration: 15, // A long duration for a very slow, subtle effect
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};