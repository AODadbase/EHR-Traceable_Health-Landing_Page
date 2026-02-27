import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { InteractiveDemo } from './components/InteractiveDemo';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { useTheme } from './contexts/ThemeContext';

const LandingPage: React.FC = () => {
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-slate-950 text-slate-100 selection:bg-purple-400 selection:text-purple-900'
        : 'bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900'
    }`}>
      <Header />
      <main>
        <Hero />
        <Features />
        <InteractiveDemo />
        <About />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  );
};

export default App;
