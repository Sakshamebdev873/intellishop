// src/components/FeaturedPostCard.tsx
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React, { useRef } from 'react';

type Post = {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
};

export const FeaturedPostCard = ({ post }: { post: Post }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const imageX = useTransform(x, [-200, 200], [-25, 25]);
  const imageY = useTransform(y, [-200, 200], [-25, 25]);

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
      className="group relative w-full h-full rounded-xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute inset-[-40px]" // Image is larger than the card to allow for movement
        style={{ x: imageX, y: imageY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-8 text-white"
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="text-sm font-semibold uppercase tracking-widest">{post.category}</p>
        <h3 className="text-3xl font-bold mt-2">{post.title}</h3>
        <div className="flex items-center gap-2 mt-4 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read Story <ArrowUpRight size={20} />
        </div>
      </motion.div>
    </motion.div>
  );
};