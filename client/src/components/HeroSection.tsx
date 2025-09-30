// src/components/HeroSection.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground'; // Import the new component
import InteractiveArt from './InteractiveArt'
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 }, // Increased delay to let bg appear first
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-0 overflow-hidden">
      {/* Place the animated background here */}
      <AnimatedBackground />

      {/* Content Layer - must have a higher z-index and be relative */}
      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Elegance in Every <span className="text-indigo-600">Thread</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0"
          >
            Discover our curated collection of timeless pieces, crafted with
            passion and precision for the modern connoisseur.
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 10px 30px rgba(99, 102, 241, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg"
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="hidden md:block"
        >
          {/* Using a semi-transparent card to let the background show through */}
       <InteractiveArt/>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;