// src/components/JournalSection.tsx
import { motion } from 'framer-motion';
import { FeaturedPostCard } from './FeaturedPostCard';
import { SecondaryPostCard } from './SecondaryPostCard';
import AnimatedText from './AnimatedText';

const posts = [
  { id: 1, category: 'Inspiration', title: 'The Art of Slow Living', imageUrl: 'https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=800' },
  { id: 2, category: 'Process', title: 'A Weaver\'s Tale', imageUrl: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=800' },
  { id: 3, category: 'Style', title: 'Modern Home Aesthetics', imageUrl: 'https://images.unsplash.com/photo-1540998145393-8c436b6c429c?q=80&w=800' },
];

export const JournalSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedText
          text="From the Journal"
          el="h2"
          className="text-4xl font-bold text-center text-gray-800 mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16"
        >
          Stories of craft, inspiration, and the creative journey that defines our collection.
        </motion.p>
        
        {/* --- The Modern Asymmetrical Grid --- */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-8 h-[700px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Featured Post - takes up two rows */}
          <motion.div className="lg:row-span-2" variants={itemVariants} custom={0}>
            <FeaturedPostCard post={posts[0]} />
          </motion.div>

          {/* Secondary Posts */}
          <motion.div variants={itemVariants} custom={1}>
            <SecondaryPostCard post={posts[1]} />
          </motion.div>
          <motion.div variants={itemVariants} custom={2}>
            <SecondaryPostCard post={posts[2]} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};