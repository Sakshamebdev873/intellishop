// src/components/AnimatedLoom.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Configuration for the vertical lines
const NUM_LINES = 15;
const WIDTH = 600;
const HEIGHT = 600;
const LINE_SPACING = WIDTH / NUM_LINES;

// Create an array of x-coordinates for the lines
const lines = Array.from({ length: NUM_LINES }, (_, i) => i * LINE_SPACING);

export const AnimatedLoom = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl w-full h-full aspect-square"
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full">
        <defs>
          {/* Subtle gradient for the lines, making them look illuminated */}
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {lines.map((xCoord, index) => (
          <motion.line
            key={index}
            x1={xCoord}
            y1={0}
            x2={xCoord}
            y2={HEIGHT}
            stroke="url(#threadGradient)"
            strokeWidth={1}
            strokeLinecap="round"
            // The magic: Animate the line's x-position randomly
            animate={{
              x: [0, (Math.random() - 0.5) * 15, 0], // Move +/- 7.5 units, then back
            }}
            transition={{
              repeat: Infinity,
              duration: 20 + Math.random() * 10, // Random duration for non-uniform motion
              ease: "easeInOut",
              delay: Math.random() * 5, // Random start delay for staggered effect
            }}
          />
        ))}
        
        {/* Optional: Add a subtle cross-weave to imply structure */}
        <motion.line 
            x1={0} y1={HEIGHT/2} x2={WIDTH} y2={HEIGHT/2} 
            stroke="#a5b4fc" strokeWidth={0.5} opacity={0.3}
            animate={{ opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};