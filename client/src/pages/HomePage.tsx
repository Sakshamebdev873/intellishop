// src/Homepage.tsx
import React from 'react';
import  Navbar  from '../components/Navbar';
import HeroSection  from '../components/HeroSection';
import  FeaturedProducts  from '../components/FeaturedProducts';
import  Footer  from '../components/Footer';
import { NoiseOverlay } from '../components/NoiseOverlay';

function Homepage() {
  return (
    <div className="antialiased  bg-gray-50 text-gray-800">
      <NoiseOverlay/>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        {/* You can add more sections like About, Testimonials, etc. here */}
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;