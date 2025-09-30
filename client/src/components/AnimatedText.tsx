// src/components/AnimatedText.tsx (Can be in its own file or inside Navbar.tsx)

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Define the props for our component for better type safety
type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements; // Ensures 'el' is a valid HTML tag like 'div', 'h1', etc.
  className?: string;
};

// Reusable component for the "weave-in" text animation
const AnimatedText = ({ text, el = 'div', className }: AnimatedTextProps) => {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
    }),
  };

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };

  // The magic fix!
  // We create a capitalized component variable `MotionComponent`.
  // `motion[el]` dynamically selects the correct motion-enabled HTML tag.
  // For example, if el is 'div', MotionComponent becomes motion.div.
// @ts-ignore
  const MotionComponent = motion[el];

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: 'flex', overflow: 'hidden' }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={childVariants}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default AnimatedText;