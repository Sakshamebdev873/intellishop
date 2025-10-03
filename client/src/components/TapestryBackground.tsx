// src/components/TapestryBackground.tsx
import { motion, useScroll, useTransform } from 'framer-motion';

const threads = [
  // Vertical "Warp" Threads
  { d: "M 10 0 L 10 100", delay: 0 },
  { d: "M 30 0 L 30 100", delay: 0.1 },
  { d: "M 50 0 L 50 100", delay: 0.2 },
  { d: "M 70 0 L 70 100", delay: 0.3 },
  { d: "M 90 0 L 90 100", delay: 0.4 },
  // Horizontal "Weft" Threads
  { d: "M 0 10 L 100 10", delay: 0.5 },
  { d: "M 0 30 L 100 30", delay: 0.6 },
  { d: "M 0 50 L 100 50", delay: 0.7 },
  { d: "M 0 70 L 100 70", delay: 0.8 },
  { d: "M 0 90 L 100 90", delay: 0.9 },
];

export const TapestryBackground = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gray-50">
      {/* A soft gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-gray-100/50" />
      
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <g>
          {threads.map((thread, index) => (
            <motion.path
              key={index}
              d={thread.d}
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth={0.5}
              initial={{ pathLength: 0 }}
              style={{ pathLength }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut" },
                // Stagger the animation start based on scroll, not just time
                delay: thread.delay,
              }}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
};