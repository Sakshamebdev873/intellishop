// src/Homepage.tsx
import React from 'react';
import  Navbar  from '../components/Navbar';
import HeroSection  from '../components/HeroSection';
import  FeaturedProducts  from '../components/FeaturedProducts';
import  Footer  from '../components/Footer';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { OurCraftSection } from '../components/OurCraftSection';
import { JournalSection } from '../components/JournalSection';

function Homepage() {
  return (
    <div className="antialiased  bg-gray-50 text-gray-800">
      <NoiseOverlay/>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <OurCraftSection/>
        <JournalSection/>
        {/* You can add more sections like About, Testimonials, etc. here */}
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;