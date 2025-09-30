// src/components/FeaturedProducts.tsx
import { motion, useMotionValue, useTransform, motionValue } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { Variants } from 'framer-motion';
import React, { useRef } from 'react';
import AnimatedText from './AnimatedText'; // Import our animated text component

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
};

// --- Step 1: Using beautiful, valid images ---
const products: Product[] = [
  { id: 1, name: 'Celeste Vase', category: 'Ceramics', price: '$75', imageUrl: 'https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_IN/v1759215986762/img/202509/09252025-eu-hp/0923_hp_c02_img.jpg' },
  { id: 2, name: 'Alpaca Scarf', category: 'Textiles', price: '$120', imageUrl: 'https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_IN/v1759215986762/img/202509/09252025-eu-hp/0923_hp_c03_img.jpg' },
  { id: 3, name: 'Nomad Journal', category: 'Stationery', price: '$45', imageUrl: 'https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_IN/v1759215986762/img/202509/09252025-eu-hp/0923_hp_c05_img.jpg' },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- Step 2: Creating the magical 3D Product Card ---
const ProductCard = ({ product }: { product: Product }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Create motion values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Create transforms to map mouse position to card rotation
  const rotateX = useTransform(y, [-150, 150], [15, -15]); // Invert for natural feel
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  // Create transforms for the inner image parallax effect
  const imageTranslateX = useTransform(x, [-150, 150], [-10, 10]);
  const imageTranslateY = useTransform(y, [-150, 150], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - left - width / 2;
    const mouseY = event.clientY - top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // Animate back to the resting state
    motionValue(0).set(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      className="group relative bg-white rounded-xl shadow-lg"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d', // Crucial for 3D effect
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div style={{ transformStyle: 'preserve-3d' }} className="relative h-[65vh] w-full overflow-hidden rounded-t-xl">
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          style={{
            transform: 'translateZ(40px)', // Lifts the image forward
            translateX: imageTranslateX,
            translateY: imageTranslateY,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
        <motion.button
          initial={{ y: '110%' }}
          whileHover={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="absolute bottom-0 left-0 right-0 bg-indigo-600/90 backdrop-blur-sm text-white p-4 flex items-center justify-center gap-2 font-semibold"
          style={{ transform: 'translateZ(60px)' }} // Lifts the button even more
        >
          <ShoppingCart size={20} />
          Add to Cart
        </motion.button>
      </div>
      <div className="p-6 text-center" style={{ transform: 'translateZ(20px)' }}>
        <p className="text-indigo-500 font-medium text-sm">{product.category}</p>
        <h3 className="text-xl font-bold text-gray-800 mt-1">{product.name}</h3>
        <p className="text-lg text-gray-500 mt-2">{product.price}</p>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <AnimatedText
          text="New Arrivals"
          el="h2"
          className="text-4xl font-bold text-center text-gray-800 mb-16"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default FeaturedProducts