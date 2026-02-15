import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-xl font-bold tracking-tight">Traceable Health</span>
          <p className="text-sm text-slate-400 mt-2">Validated EHR Intelligence for the modern era.</p>
          <a href="mailto:traceablehealth@gmail.com" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mt-4 transition-colors">
            <Mail size={16} />
            traceablehealth@gmail.com
          </a>
        </div>
        
        <div className="flex gap-8">
          <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
          <Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
        </div>

        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Traceable Health Inc.
        </div>
      </div>
    </footer>
  );
};