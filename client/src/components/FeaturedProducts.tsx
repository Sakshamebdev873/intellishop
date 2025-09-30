import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { Variants } from 'framer-motion';
type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
};

const products: Product[] = [
  { id: 1, name: 'Artisan Vase', price: '$75', imageUrl: 'https://via.placeholder.com/400x400.png' },
  { id: 2, name: 'Cashmere Scarf', price: '$120', imageUrl: 'https://via.placeholder.com/400x400.png' },
  { id: 3, name: 'Leather Journal', price: '$45', imageUrl: 'https://via.placeholder.com/400x400.png' },
];

const cardVariants : Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div variants={cardVariants} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-72 w-full overflow-hidden">
        <motion.img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
        <motion.button
          initial={{ y: '100%' }}
          animate={{ y: '100%' }} // Initially hidden
          whileHover={{ y: 0 }}   // Animate in on hover
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white p-3 flex items-center justify-center gap-2 font-semibold"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </motion.button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-lg text-gray-500 mt-2">{product.price}</p>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">New Arrivals</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </motion.div>
      </div>
    </section>
  );
};
export default FeaturedProducts