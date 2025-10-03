import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Target, Leaf } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import  Navbar  from '../components/Navbar';
import  Footer  from '../components/Footer';
import { TapestryBackground } from '../components/TapestryBackground';

// --- Background Component ---
// This is now included directly in the page for simplicity
// const TapestryBackground = () => {
//   const { scrollYProgress } = useScroll();
//   // Animate pathLength from 0 to 1 as the user scrolls from the top to 80% of the page height
//   const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

//   const threads = [
//     { d: "M 10 0 L 10 100", delay: 0 }, { d: "M 30 0 L 30 100", delay: 0.1 },
//     { d: "M 50 0 L 50 100", delay: 0.2 }, { d: "M 70 0 L 70 100", delay: 0.3 },
//     { d: "M 90 0 L 90 100", delay: 0.4 }, { d: "M 0 10 L 100 10", delay: 0.5 },
//     { d: "M 0 30 L 100 30", delay: 0.6 }, { d: "M 0 50 L 100 50", delay: 0.7 },
//     { d: "M 0 70 L 100 70", delay: 0.8 }, { d: "M 0 90 L 100 90", delay: 0.9 },
//   ];

//   return (
//     <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-gray-50/50" />
//       <motion.svg
//         className="w-full h-full"
//         viewBox="0 0 100 100"
//         preserveAspectRatio="xMidYMid slice"
//       >
//         <g>
//           {threads.map((thread, index) => (
//             <motion.path
//               key={index}
//               d={thread.d}
//               stroke="rgba(99, 102, 241, 0.2)"
//               strokeWidth={0.5}
//               initial={{ pathLength: 0 }}
//               style={{ pathLength }}
//               // Add a subtle transition for smoothness when scroll direction changes
//               transition={{ duration: 0.1 }}
//             />
//           ))}
//         </g>
//       </motion.svg>
//     </div>
//   );
// };


// // --- Story Art Component ---
const StoryArt = () => (
    <motion.svg viewBox="0 0 500 500" className="w-full h-full">
      <motion.path
        d="M 100 250 C 150 150, 350 150, 400 250"
        stroke="#a855f7" fill="none" strokeWidth={3}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 100 250 C 150 350, 350 350, 400 250 S 350 150, 250 250 S 150 350, 100 250"
        stroke="#6366f1" fill="none" strokeWidth={3}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 1, duration: 3, ease: "circOut" }}
      />
    </motion.svg>
);


// // --- Main Page Component ---
const values = [
  { icon: <Award size={32}/>, title: "Unmatched Craftsmanship", desc: "We honor traditional techniques while embracing modern precision to create products of exceptional quality." },
  { icon: <Leaf size={32}/>, title: "Sustainable Future", desc: "Our commitment to the planet is woven into every product, from ethically sourced materials to eco-friendly packaging." },
  { icon: <Target size={32}/>, title: "Purposeful Design", desc: "We believe in minimalism and function, creating timeless pieces that enrich your life without adding clutter." },
];

export const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="relative">
        <TapestryBackground />
        <main className="relative z-10 bg-transparent">
          {/* Hero Section */}
          <div className="min-h-[70vh] flex items-center justify-center text-center px-6">
            <div>
              <AnimatedText
                text="Where Passion Meets Precision"
                el="h1"
                className="text-5xl md:text-7xl font-extrabold text-gray-900"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto"
              >
                AETHER was born from a simple belief: that the objects we own should be as beautiful and thoughtfully crafted as the lives we aspire to live.
              </motion.p>
            </div>
          </div>

          {/* Our Story Section with semi-transparent background */}
          <div className="bg-white/80 backdrop-blur-md">
            <section className="py-24">
              <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="h-96">
                  <StoryArt />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">The Genesis of an Idea</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our journey began not in a workshop, but with a feeling—a desire for products that carried a story. In a world of mass production, we sought authenticity. We traveled, we learned, and we connected with artisans who shared our vision for quality, sustainability, and timeless design.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    AETHER is the culmination of that journey. It's more than an e-commerce store; it's a curated collection of pieces we love, made by people we admire, for individuals who appreciate the art of making.
                  </p>
                </div>
              </div>
            </section>
          </div>
          
          {/* Our Values Section */}
          <div className="bg-gray-50/80 backdrop-blur-md">
            <section className="py-24">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">The Pillars of Our Brand</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-sm text-center"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <div className="inline-block bg-indigo-100 text-indigo-600 rounded-full p-4 mb-6">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};