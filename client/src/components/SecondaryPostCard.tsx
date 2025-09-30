// src/components/SecondaryPostCard.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Post = {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
};

export const SecondaryPostCard = ({ post }: { post: Post }) => {
  return (
    <motion.a href="#" className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 rounded-t-xl overflow-hidden">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">{post.category}</p>
        <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
        <div className="flex items-center gap-2 mt-4 font-semibold text-gray-500 text-sm">
          Read Story <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </div>
    </motion.a>
  );
};