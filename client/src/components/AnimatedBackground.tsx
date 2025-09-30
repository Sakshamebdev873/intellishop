// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion';

const colors = ["#d8b4fe", "#a5b4fc", "#818cf8", "#facc15"];

const AnimatedBackground = () => {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#f9fafb', // This MUST match your Hero section bg-gray-50
      }}
    >
      {/* Animated Gradient */}
      <motion.div
        animate={{ backgroundColor: [...colors, colors[0]] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
        style={{
          width: '200%',
          height: '200%',
          filter: 'blur(120px)',
          opacity: 0.6,
          position: 'absolute',
          top: '-50%',
          left: '-50%',
        }}
      />

      {/* Denser & More Visible SVG Threads */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, opacity: 0.4 }} // Increased opacity
      >
        {/* Existing Paths */}
        <motion.path d="M -100 400 Q 300 200 600 400 T 1300 400" stroke="#a5b4fc" fill="none" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }} />
        <motion.path d="M -100 500 Q 300 700 600 500 T 1300 500" stroke="#d8b4fe" fill="none" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5, ease: "easeInOut", delay: 1 }} />
        <motion.path d="M -100 600 Q 400 500 700 650 T 1300 600" stroke="#818cf8" fill="none" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, ease: "easeInOut", delay: 1.5 }} />
        
        {/* New Paths for Density */}
        <motion.path d="M -100 250 Q 250 400 550 250 T 1300 300" stroke="#a5b4fc" fill="none" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, ease: "easeInOut", delay: 2 }} />
        <motion.path d="M -100 350 Q 500 150 800 300 T 1300 200" stroke="#d8b4fe" fill="none" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4.5, ease: "easeInOut", delay: 2.5 }} />
        <motion.path d="M -100 700 Q 300 800 600 650 T 1300 750" stroke="#818cf8" fill="none" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: 3 }} />
      </svg>

      {/* Bottom Blur Effect */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '250px', // The height of the fade
          background: 'linear-gradient(to top, #f9fafb, transparent)',
          zIndex: 2, // Ensures it's above the threads
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;