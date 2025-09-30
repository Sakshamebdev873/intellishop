// src/components/Navbar.tsx
import  { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Shop', href: '#' },
  { name: 'Collections', href: '#' },
  { name: 'About', href: '#' },
];
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 w-full',
          { 'shadow-lg bg-white/80 backdrop-blur-md': isScrolled }
        )}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <AnimatedText text="AETHER" el="div" className="text-2xl font-bold tracking-wider text-gray-900" />

          {/* Desktop Navigation with Thread Underline */}
          <div className="hidden md:flex items-center gap-8 text-lg">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onHoverStart={() => setHoveredLink(link.name)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="underline" // This is the magic! It tells Framer to animate this element between positions.
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-indigo-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <User className="cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors" />
            <ShoppingBag className="cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors" />
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                <Menu className="cursor-pointer text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-0 right-0 h-full w-2/3 max-w-sm bg-white p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                  <X className="cursor-pointer" />
                </button>
              </div>
              <motion.div
                className="flex flex-col gap-6 text-xl"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="text-gray-800 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar