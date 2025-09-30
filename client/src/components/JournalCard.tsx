// src/components/JournalCard.tsx
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React, { useRef } from 'react';

type Post = {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
};

export const JournalCard = ({ post }: { post: Post }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to image translation for the magnetic effect
  const imageX = useTransform(x, [-100, 100], [-20, 20]);
  const imageY = useTransform(y, [-100, 100], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - left - width / 2;
    const mouseY = event.clientY - top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative w-full h-96 rounded-xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }} // Enable 3D transformations
    >
      {/* The floating, magnetic image */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: imageX,
          y: imageY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
      </motion.div>

      {/* The content overlay with a glassmorphism effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-md text-white"
        initial={{ y: '100%' }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80">{post.category}</p>
        <h3 className="text-2xl font-bold mt-2">{post.title}</h3>
        <div className="flex items-center gap-2 mt-4 font-semibold">
          Read Story <ArrowUpRight size={20} />
        </div>
      </motion.div>
    </motion.div>
  );
};