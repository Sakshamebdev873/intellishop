// src/components/CraftsmanshipArt.tsx
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// --- Simplified, state-based variants ---

// For staggering the animation of grouped threads
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

// For drawing a single thread (used by both raw and refined)
const threadVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

// For the central refining orb
const orbVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  pulse: {
    scale: [1, 1.15, 1],
    transition: { duration: 0.5, ease: 'circOut' },
  },
};

export const CraftsmanshipArt = () => {
  // --- Step 1: Create separate controls for each animation part ---
  const rawControls = useAnimation();
  const orbControls = useAnimation();
  const refinedControls = useAnimation();

  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false });

  // --- Step 2: Write the animation story using the separate controls ---
  useEffect(() => {
    const sequence = async () => {
      // --- CYCLE START: Reset everything to hidden ---
      // Use Promise.all to reset them simultaneously for a clean start
      await Promise.all([
        rawControls.start('hidden'),
        orbControls.start('hidden'),
        refinedControls.start('hidden'),
      ]);

      // --- Animation Unfolds ---
      // 1. Raw materials draw themselves in from the left
      await rawControls.start('visible', { delay: 0.5 });

      // 2. The orb appears...
      await orbControls.start('visible');
      // ...and pulses, "refining" the materials
      await orbControls.start('pulse');

      // 3. The refined threads now draw themselves in from the right
      // The raw threads REMAIN VISIBLE
      await refinedControls.start('visible');

      // 4. Pause to admire the finished state
      await new Promise(resolve => setTimeout(resolve, 2500));
    };

    if (inView) {
      // Run the sequence() function in a loop
      const interval = setInterval(sequence, 7000); // Total cycle time
      // Clean up the interval when the component is not in view
      return () => clearInterval(interval);
    }
  }, [inView, rawControls, orbControls, refinedControls]);

  return (
    <motion.div
      ref={ref}
      className="w-full h-full flex justify-center items-center"
    >
      <svg viewBox="0 0 500 500" className="w-full max-w-sm overflow-visible">
        {/* Stage 1: Raw Threads (Left) - Connected to rawControls */}
        <motion.g animate={rawControls} variants={containerVariants}>
          <motion.path d="M 0 150 C 100 100, 150 250, 250 250" stroke="#f87171" strokeWidth={2} fill="none" variants={threadVariants} />
          <motion.path d="M 0 250 C 50 300, 150 150, 250 250" stroke="#fcd34d" strokeWidth={2} fill="none" variants={threadVariants} />
          <motion.path d="M 0 350 C 100 400, 100 300, 250 250" stroke="#a855f7" strokeWidth={2} fill="none" variants={threadVariants} />
        </motion.g>

        {/* Stage 2: Refining Orb (Center) - Connected to orbControls */}
        <motion.circle
          cx={250} cy={250} r={30} fill="none" stroke="#6366f1" strokeWidth={3}
          style={{ filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))' }}
          animate={orbControls}
          initial="hidden"
          variants={orbVariants}
        />

        {/* Stage 3: Refined Threads (Right) - Connected to refinedControls */}
        <motion.g animate={refinedControls} variants={containerVariants}>
          <motion.path d="M 250 250 L 500 150" stroke="#6366f1" strokeWidth={2.5} fill="none" variants={threadVariants} />
          <motion.path d="M 250 250 L 500 250" stroke="#6366f1" strokeWidth={2.5} fill="none" variants={threadVariants} />
          <motion.path d="M 250 250 L 500 350" stroke="#6366f1" strokeWidth={2.5} fill="none" variants={threadVariants} />
        </motion.g>
      </svg>
    </motion.div>
  );
};