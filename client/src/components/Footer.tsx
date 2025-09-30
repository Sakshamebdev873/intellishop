import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white"
    >
      <div className="container mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold mb-4">AETHER</h3>
          <p className="text-gray-400">Crafting timeless elegance for the modern world.</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 tracking-wider">Shop</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">New Arrivals</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Best Sellers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">All Products</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 tracking-wider">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Our Story</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 tracking-wider">Follow Us</h4>
          <div className="flex gap-4">{/* Add Social Icons here */}</div>
        </div>
      </div>
      <div className="text-center text-gray-500 py-6 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} AETHER. All Rights Reserved.</p>
      </div>
    </motion.footer>
  );
};
export default Footer