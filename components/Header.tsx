import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Improved Scroll Spy Logic
      // Instead of checking if a section fully contains a specific range,
      // we check which section is currently under a "reading line" (approx 30% down the viewport).
      // This prevents "dead zones" between sections where the highlight might reset.
      const sections = ['hero', 'problem', 'solution', 'demo', 'about'];
      const threshold = window.innerHeight * 0.3;
      
      let newActiveSection = activeSection; // Default to keeping current if no match (prevents flickering)
      let foundMatch = false;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the reading line falls within this section
          if (rect.top <= threshold && rect.bottom > threshold) {
            newActiveSection = section;
            foundMatch = true;
            break;
          }
        }
      }

      // Fallback: If at the very top of the page, force hero
      if (window.scrollY < 50) {
        newActiveSection = 'hero';
      } else if (!foundMatch && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        // Fallback: If at very bottom, force last section
        newActiveSection = 'about';
      } else if (foundMatch) {
         // Only update if we found a specific section match to avoid random resets
      }

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const navLinks = [
    { id: 'problem', label: 'The Problem' },
    { id: 'solution', label: 'Our Solution' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'about', label: 'About Us' },
  ];

  const getLinkClasses = (id: string) => {
    const isActive = activeSection === id;
    const baseClasses = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out relative overflow-hidden";
    // Active: Static Blue Background
    const activeClasses = "bg-blue-600 shadow-lg"; 
    const inactiveClasses = "text-slate-600 hover:text-blue-600 hover:bg-blue-50";
    
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  const getLabelClasses = (id: string) => {
     return activeSection === id ? "animate-text-flow font-bold" : "";
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLandingPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (isLandingPage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
        
        {/* Logo Section - Acts as Home Link */}
        <a 
          href="#hero" 
          onClick={scrollToTop}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl transition-all duration-500 group ${activeSection === 'hero' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-50'}`}
        >
          <div className={`p-2 rounded-lg transition-colors duration-500 ${activeSection === 'hero' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white shadow-md shadow-blue-500/40'}`}>
            <FileText size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-all duration-300 ${activeSection === 'hero' ? 'animate-text-flow' : 'text-slate-900 group-hover:text-blue-700'}`}>
            Traceable Health
          </span>
        </a>

        {/* Centered Navigation */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 bg-white/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-200/50 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={getLinkClasses(link.id)}
            >
              <span className={getLabelClasses(link.id)}>
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Right Action Button */}
        <motion.a
          href="mailto:traceablehealth@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-colors shadow-lg shadow-slate-900/20"
        >
          <Mail size={16} />
          <span className="hidden sm:inline">Contact Us</span>
        </motion.a>
      </div>
    </header>
  );
};