import React, { useRef, useEffect, useState } from 'react';
import Navbar from './navbar';
import { VscHome, VscArchive, VscAccount, VscFileMedia } from 'react-icons/vsc';

const HeroSection: React.FC = () => {
  const items = [
    { 
      icon: <VscHome size={18} />, 
      label: 'Home', 
      onClick: () => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
    },
    { 
      icon: <VscArchive size={18} />, 
      label: 'About', 
      onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
    },
    { 
      icon: <VscFileMedia size={18} />, 
      label: 'Upload', 
      onClick: () => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })
    },
    { 
      icon: <VscAccount size={18} />, 
      label: 'Team', 
      onClick: () => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })
    },
  ];

  const heroRef = useRef<HTMLDivElement>(null);
  const [visibleCurtain, setVisibleCurtain] = useState(false);
  const [visibleContent, setVisibleContent] = useState(false);

  useEffect(() => {
    const observerCurtain = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCurtain(true);
      },
      { threshold: 0.5 }
    );
    if (heroRef.current) observerCurtain.observe(heroRef.current);
    return () => observerCurtain.disconnect();
  }, []);

  // Animasi main content (judul dan gambar)
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observerContent = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleContent(true);
      },
      { threshold: 0.5 }
    );
    if (contentRef.current) observerContent.observe(contentRef.current);
    return () => observerContent.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="pb-12 min-h-[95vh]">
      {/* Background image */}
      <div className="absolute inset-0 w-full max-h-[95vh]">
        <img
          src="../images/bg.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#211008] via-[#211008]/80 to-[#211008]/30"></div>
      </div>

      {/* navbar fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

      {/* Main Content */}
      <div ref={contentRef} className={`flex flex-col lg:grid lg:grid-cols-2 mx-auto max-w-7xl w-full transition-all duration-700 ${visibleContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} relative z-10`}>
        {/* Left side - Title */}
        <div className="flex items-center lg:justify-center min-h-[40vh] px-12 lg:px-4 pt-32 sm:pt-36 lg:pt-40">
          <h1 className="mea-culpa-regular text-8xl lg:text-[12rem] text-left lg:text-left lg:pl-30 ">
            Art<br />
            <span className="lg:pl-30 inline-block">Fusion</span>
          </h1>
        </div>

        {/* Right side - Image */}
        <div className="flex items-center justify-center min-h-[30vh] lg:min-h-[40vh] px-4 pb-8 lg:pb-0">
          <img 
            src="../images/header.png" 
            alt="Art Fusion Header" 
            className="w-3/5 sm:w-1/2 md:w-2/5 lg:w-full max-w-[500px] h-auto object-contain" 
          />
        </div>
      </div>

      {/* curtain - Hide left on mobile, show only right */}
      <div className="absolute -top-12 left-0 w-full h-[calc(85vh+2rem)] pointer-events-none z-40">
        {/* Left curtain - Hidden on mobile (md and below) */}
        <img
          src="../images/curtain.png"
          alt="curtain left"
          className={`hidden lg:block absolute left-0 top-0 h-full object-left object-cover scale-x-[-1] transition-all duration-700 ${visibleCurtain ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'}`}
        />
        {/* Right curtain - Always visible */}
        <img
          src="../images/curtain.png"
          alt="curtain right"
          className={`absolute lg:right-0 top-0 lg:h-full object-right object-cover transition-all duration-700 ${visibleCurtain ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'}`}
        />
      </div>
    </div>
  );
};

export default HeroSection;