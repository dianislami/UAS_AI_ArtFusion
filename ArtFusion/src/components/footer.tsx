import React, { useRef, useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [visibleFooter, setVisibleFooter] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleFooter(true);
      },
      { threshold: 0.5 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="team mb-8">
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-[#F3E3B2]/5 via-[#AB743C]/80 to-[#F3E3B2]/5 mb-12"></div>
      <div ref={footerRef} className={`max-w-7xl mx-auto px-5 transition-all duration-700 ${visibleFooter ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Desktop: 2 columns, Mobile: center stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-7">
          {/* Logo & Description - Takes full width on mobile, half on desktop */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl mb-3">
              ArtFusion
            </h3>
            <p className="text-sm text-md leading-relaxed mb-5 max-w-md mx-auto lg:mx-0">
              Platform AI yang mengubah foto menjadi karya seni digital dengan berbagai style pelukis terkenal dunia.
              Cocok untuk eksplorasi kreatif, edukasi, dan hiburan visual. Proyek UAS mata kuliah Kecerdasan Artifisial.
            </p>
          </div>

          {/* Fitur Column - Equal size, centered on mobile */}
          <div className="text-sm text-center lg:text-right">
            <h3 className="mb-3 text-lg font-semibold">Fitur</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-[#AB743C] transition-colors duration-300">Convert Style Vincent Van Gogh</a></li>
              <li><a href="#" className="hover:text-[#AB743C] transition-colors duration-300">Convert Style Claude Monet</a></li>
              <li><a href="#" className="hover:text-[#AB743C] transition-colors duration-300">Convert Style Picasso</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-[#F3E3B2]/5 via-[#AB743C]/80 to-[#F3E3B2]/5 mb-4"></div>
        <p className="text-sm text-center">&copy; 2025 ArtFusion - Team 8. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;