import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'problem', 'solution', 'demo', 'about'];
      const threshold = window.innerHeight * 0.3;

      let newActiveSection = activeSection;
      let foundMatch = false;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            newActiveSection = section;
            foundMatch = true;
            break;
          }
        }
      }

      if (window.scrollY < 50) {
        newActiveSection = 'hero';
      } else if (!foundMatch && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        newActiveSection = 'about';
      }

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
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

    if (isActive) {
      return `${baseClasses} ${isDark ? 'bg-purple-600 shadow-lg shadow-purple-500/30' : 'bg-blue-600 shadow-lg'}`;
    }
    return `${baseClasses} ${isDark ? 'text-slate-300 hover:text-purple-400 hover:bg-slate-700/50' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'}`;
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
        scrolled
          ? isDark
            ? 'bg-slate-900/90 backdrop-blur-md shadow-sm shadow-slate-800/50 py-3'
            : 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">

        {/* Logo Section */}
        <a
          href="#hero"
          onClick={scrollToTop}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl transition-all duration-500 group ${
            activeSection === 'hero'
              ? isDark ? 'bg-purple-900 shadow-md shadow-purple-900/50' : 'bg-blue-600 shadow-md'
              : isDark ? 'hover:bg-slate-800' : 'hover:bg-blue-50'
          }`}
        >
          <div className={`p-2 rounded-lg transition-colors duration-500 ${
            activeSection === 'hero'
              ? isDark ? 'bg-white text-purple-600' : 'bg-white text-blue-600'
              : isDark ? 'bg-purple-600 text-white shadow-md shadow-purple-500/40' : 'bg-blue-600 text-white shadow-md shadow-blue-500/40'
          }`}>
            <FileText size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-all duration-300 ${
            activeSection === 'hero'
              ? 'animate-text-flow'
              : isDark ? 'text-slate-100 group-hover:text-purple-400' : 'text-slate-900 group-hover:text-blue-700'
          }`}>
            Traceable Health
          </span>
        </a>

        {/* Centered Navigation */}
        <nav className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 backdrop-blur-md px-2 py-1.5 rounded-full border shadow-sm ${
          isDark
            ? 'bg-slate-800/60 border-slate-700/50'
            : 'bg-white/60 border-slate-200/50'
        }`}>
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

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Eye Protection Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              isDark
                ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-label={isDark ? 'Disable eye protection mode' : 'Enable eye protection mode'}
          >
            {isDark ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <motion.a
            href="mailto:traceablehealth@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-colors shadow-lg ${
              isDark
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
            }`}
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Contact Us</span>
          </motion.a>
        </div>
      </div>
    </header>
  );
};
