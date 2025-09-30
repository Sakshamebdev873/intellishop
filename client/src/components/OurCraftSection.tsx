// src/components/OurCraftSection.tsx
import { motion } from 'framer-motion';
import { Feather, ShieldCheck, Recycle } from 'lucide-react';
import { CraftsmanshipArt } from './CraftsmanshipArt';
import AnimatedText from './AnimatedText'; // Assuming you have this component

const features = [
  { icon: <Feather size={24} />, title: "Artisan Quality", description: "Every item is meticulously crafted by skilled artisans." },
  { icon: <ShieldCheck size={24} />, title: "Lasting Durability", description: "We use premium materials designed to endure." },
  { icon: <Recycle size={24} />, title: "Sustainable Sourcing", description: "Committed to ethical and eco-friendly practices." },
];

export const OurCraftSection = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p variants={itemVariants} className="text-indigo-600 font-semibold mb-2">Our Process</motion.p>
            <AnimatedText
              text="From Material to Masterpiece"
              el="h2"
              className="text-4xl font-bold text-gray-800 mb-6"
            />
            <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed mb-8">
              True elegance is born from passion and precision. Our creative process is a journey that transforms the finest raw materials into timeless pieces of art, guided by a commitment to quality and sustainable craftsmanship.
            </motion.p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full p-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: SVG Animation */}
          <div>
            <CraftsmanshipArt />
          </div>
        </div>
      </div>
    </section>
  );
};