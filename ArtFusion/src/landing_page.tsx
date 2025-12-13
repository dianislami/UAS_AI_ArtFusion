import React, { useEffect } from 'react';
import HeroSection from './components/hero_section';
import AboutSection from './components/about';
import TeamSection from './components/team';
import Footer from './components/footer';
import ConvertPage from './components/convert';

const LandingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="upload">
          <ConvertPage />
        </div>
        <div id="team">
          <TeamSection />
        </div>
        <Footer />
    </div>
  );
};

export default LandingPage;